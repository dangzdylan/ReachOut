import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';
import { styles } from './HomeScreen.styles';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, addDoc, orderBy, updateDoc, doc } from "firebase/firestore";
import * as Contacts from 'expo-contacts';

const HomeScreen = ({ navigation, route }) => {

  const [recommendedContactPhones, setRecommendedContactPhones] = useState([])
  const [recommendedContactNames, setRecommendedContactNames] = useState([])

  const [loading, setLoading] = useState(true)

  const {name, email, recommendNumber} = route.params

  const [importingContacts, setImportingContacts] = useState(false);

  useEffect(() => {
    // First import/update contacts
    importContacts();
    
    // Then proceed with existing fetch operations
    async function fetchRecommendedContacts() {
      setLoading(true)
      try {

        // Reference to the user's document
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", email));
        const userQuerySnapshot = await getDocs(userQuery)

        // Get the user document (we assume there is only one user document matching the uid)
        const userDoc = userQuerySnapshot.docs[0];

        userData = userDoc.data();
        //console.log(userData)
        let lastTimeStampDay = userData.lastRecommended.toDate().toDateString() //this is for 24 hr
        //let lastTimestamp = userData.lastRecommended.toDate() //remove this for 24 hr
        //console.log(lastTimestampDay)
        let currentTimeStampDay = new Date().toDateString() //this is for 24 hr
        //let currentTimeStamp = new Date() //remove this for 24 hr
        //let timeDifference = currentTimeStamp - lastTimestamp //remove this for 24 hr

        // Reference to the contacts subcollection
        const contactsRef = collection(userDoc.ref, "contacts");
    
        // Query to get all contacts for that user
        const contactsSnapshot = await getDocs(contactsRef);

        let entireContactPhoneList = []
        let entireContactNameList = []

        let recommendedContactPhoneList = []
        let recommendedContactNameList = []
    
        // Iterate over each contact
        let numberOfContacts = 0
        contactsSnapshot.forEach(async (contactDoc) => {
          numberOfContacts+=1
          const contactData = contactDoc.data();

          entireContactPhoneList.push(contactData.phone)
          entireContactNameList.push(contactData.name)

          if (contactData.chosen) {
            if (currentTimeStampDay===lastTimeStampDay){ //replace this with currentTimeStampDay===lastTimeStampDay for 24 hrs
              recommendedContactPhoneList.push(contactData.phone)
              recommendedContactNameList.push(contactData.name)
            } else {
              await updateDoc(contactDoc.ref, {
                chosen: false // Use new Date() if you prefer a Date object
              });
            }
          }
          
        });

        //IF IT IS A NEW DAY
        if (currentTimeStampDay!==lastTimeStampDay){ //replace conditional with currentTimeStampDay!==lastTimestampDay
          // First, reset all checkmarked fields
          const allContactsSnapshot = await getDocs(contactsRef);
          for (const doc of allContactsSnapshot.docs) {
            const contactData = doc.data();
            if ('checkmarked' in contactData && contactData.checkmarked) {
              await updateDoc(doc.ref, {
                checkmarked: false
              });
            }
          }

          // Then proceed with random selection
          let randomNumberList = []
          let i = 0
          while (i < recommendNumber && i < entireContactPhoneList.length) {
            // Generate a random number between min and max (inclusive)
            let randomNumber = Math.floor(Math.random() * numberOfContacts);
            if (!randomNumberList.includes(randomNumber)) {
              recommendedContactPhoneList.push(entireContactPhoneList[randomNumber])
              recommendedContactNameList.push(entireContactNameList[randomNumber])
              phoneQuery = query(contactsRef, where("phone", "==", entireContactPhoneList[randomNumber]))
              querySnapshot = await getDocs(phoneQuery)
              let docWanted = querySnapshot.docs[0]
              await updateDoc(docWanted.ref, {
                chosen: true
              });
              randomNumberList.push(randomNumber)
              i+=1
            }
          }
          await updateDoc(userDoc.ref, {lastRecommended: new Date()})
        }
        setRecommendedContactPhones(recommendedContactPhoneList)
        setRecommendedContactNames(recommendedContactNameList)
        setLoading(false)
      } catch (error) {
        console.error("Error getting recommended contacts:", error);
        setLoading(false)
      }
    }
    fetchRecommendedContacts()
  }, [])

  const navigateToProfile = (index, item) => {
    navigation.navigate("Profile", {uid: email, contactPhone: recommendedContactPhones[index], contactName: item, name: name, recommendNumber: recommendNumber, lastScreen: "HomeScreen"})
  }

  const renderChecklistItem = ({ item, index }) => (
    <ChecklistComponent 
      name={item} 
      email={email}
      goToProfile={() => navigateToProfile(index, item)}
    />
  );

  const importContacts = async () => {
    setImportingContacts(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        // Get device contacts
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        // Get existing contacts from Firestore
        const userRef = doc(db, "users", email);
        const contactsRef = collection(userRef, "contacts");
        const existingContactsSnap = await getDocs(contactsRef);
        
        // Create a map of phone numbers to existing contact data
        const existingContactsMap = new Map();
        existingContactsSnap.docs.forEach(doc => {
          const contactData = doc.data();
          if (contactData.phone) {
            // Normalize phone number for comparison
            const normalizedPhone = contactData.phone.replace(/\D/g, '');
            existingContactsMap.set(normalizedPhone, {
              id: doc.id,
              ...contactData
            });
          }
        });

        // Process device contacts
        for (const contact of data) {
          if (!contact.phoneNumbers?.[0]?.number) continue;
          
          // Normalize phone number for comparison
          const phoneNumber = contact.phoneNumbers[0].number;
          const normalizedPhone = phoneNumber.replace(/\D/g, '');
          
          if (existingContactsMap.has(normalizedPhone)) {
            // Contact exists - update name if changed
            const existingContact = existingContactsMap.get(normalizedPhone);
            if (existingContact.name !== contact.name) {
              const docRef = doc(contactsRef, existingContact.id);
              await updateDoc(docRef, {
                name: contact.name,
                // Preserve all other fields by not updating them
              });
            }
            // Remove from map to track which contacts to delete later
            existingContactsMap.delete(normalizedPhone);
          } else {
            // New contact - add to Firestore
            await addDoc(contactsRef, {
              name: contact.name,
              phone: phoneNumber,
              chosen: false,
              checkmarked: false,
              // Add any other default fields needed
            });
          }
        }

        // Optional: Remove contacts that no longer exist in device
        // Comment out this section if you want to keep all contacts
        /*
        for (const [_, contact] of existingContactsMap) {
          const docRef = doc(contactsRef, contact.id);
          await deleteDoc(docRef);
        }
        */

        console.log("Contacts updated successfully");
      }
    } catch (error) {
      console.error("Error updating contacts:", error);
    } finally {
      setImportingContacts(false);
    }
  };

  return (
      <View style={styles.container}>
          {/* <Image source={require('./assets/ROlogo.png')} /> */}
          {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
            <>
              <View style={styles.headerContainer}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.subtitle}>Hi {name.split(" ")[0]}!</Text>
                </View>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => {navigation.navigate('ContactList', {name: name, email: email, recommendNumber: recommendNumber})}}>
                      <Text style={styles.icon}>
                    <Ionicons name="people-outline" size={30} />
                  </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={styles.titleContainer}>
                  <Text style={styles.title}>Today's Talks</Text>
              </View>
              <View style={styles.checklistContainer}>
                  <FlatList
                    data={recommendedContactNames}
                    renderItem={renderChecklistItem}
                    keyExtractor={(item, index) => index.toString()} // Use index as key since names could repeat
                  />
              </View>
              <View style={styles.logoContainer}>
                  <TouchableOpacity onPress={() => {navigation.navigate('Settings', {name: name, email: email, recommendNumber: recommendNumber})}}>
                    <Text style={styles.icon}>
                  <Ionicons name="settings-outline" size={30} />
                </Text>
                  </TouchableOpacity>
              </View>
            </>
          }
      </View>
  );
};

export default HomeScreen;