import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';
import { styles } from './HomeScreen.styles';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, addDoc, orderBy, updateDoc, deleteDoc} from "firebase/firestore";

const HomeScreen = ({ navigation, route }) => {

  const [recommendedContactPhones, setRecommendedContactPhones] = useState([])
  const [recommendedContactNames, setRecommendedContactNames] = useState([])

  const [loading, setLoading] = useState(true)

  const {name, email, recommendNumber} = route.params

  useEffect(() => {
    async function fetchRecommendedContacts() {
      setLoading(true)
      try {

        // Reference to the user's document
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", email));
        const userQuerySnapshot = await getDocs(userQuery)

        // Get the user document (we assume there is only one user document matching the uid)
        const userDoc = userQuerySnapshot.docs[0];

        const userData = userDoc.data();
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

  const handleDelete = async (index, action) => {
    try {
      const contactPhone = recommendedContactPhones[index];
      const contactName = recommendedContactNames[index];
      const newNames = [...recommendedContactNames];
      const newPhones = [...recommendedContactPhones];
      newNames.splice(index, 1);
      newPhones.splice(index, 1);
      const contactsRef = collection(db, 'users', email, 'contacts');
      const contactQuery = query(contactsRef, where('phone', '==', contactPhone));
      const contactSnapshot = await getDocs(contactQuery);
      if (!contactSnapshot.empty) {
        const contactDoc = contactSnapshot.docs[0];
        if (action === "block") {
          // Move to blockedContacts before deleting
          const blockedContactsRef = collection(db, 'users', email, 'blockedContacts');
          await addDoc(blockedContactsRef, contactDoc.data());
        }
        await deleteDoc(contactDoc.ref); // Remove from contacts
      }
      setRecommendedContactNames(newNames);
      setRecommendedContactPhones(newPhones);
      // Fetch a new replacement contact
      await fetchReplacementContact(newNames, newPhones);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };
  async function fetchReplacementContact(currentNames, currentPhones) {
    try {
      const contactsRef = collection(db, 'users', email, 'contacts');
      const contactsSnapshot = await getDocs(contactsRef);
      const availableContacts = contactsSnapshot.docs
        .map((doc) => ({ id: doc.id, ref: doc.ref, ...doc.data() }))
        .filter((contact) => !currentPhones.includes(contact.phone));
      if (availableContacts.length > 0) {
        const randomContact =
          availableContacts[Math.floor(Math.random() * availableContacts.length)];
        setRecommendedContactNames([...currentNames, randomContact.name]);
        setRecommendedContactPhones([...currentPhones, randomContact.phone]);
        await updateDoc(randomContact.ref, { chosen: true });
      }
    } catch (error) {
      console.error('Error fetching replacement contact:', error);
    }
  }

  const navigateToProfile = (index, item) => {
    navigation.navigate("Profile", {uid: email, contactPhone: recommendedContactPhones[index], contactName: item, name: name, recommendNumber: recommendNumber, lastScreen: "HomeScreen"})
  }

  const renderChecklistItem = ({ item, index }) => (
    <ChecklistComponent 
      name={item} 
      email={email}
      goToProfile={() => navigateToProfile(index, item)}
      onDelete={() => 
        Alert.alert("Delete Contact", "Do you want to delete this contact just for today or send it to the blocked list?", [
          { text: "Cancel", style: "cancel" },
          { text: "Just for today", onPress: () => handleDelete(index, "temporary") },
          { text: "Send to blocked list", onPress: () => handleDelete(index, "block") }
        ])
      }
    />
  );

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