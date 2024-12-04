import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';
import { styles } from './HomeScreen.styles';


import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, addDoc, orderBy, updateDoc} from "firebase/firestore";

const HomeScreen = ({ navigation, route }) => {

  const [recommendedContactPhones, setRecommendedContactPhones] = useState([])
  const [recommendedContactNames, setRecommendedContactNames] = useState([])

  const {name, email, recommendNumber} = route.params

  useEffect(() => {
    async function fetchRecommendedContacts() {
      try {

        // Reference to the user's document
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", email));
        const userQuerySnapshot = await getDocs(userQuery)

        // Get the user document (we assume there is only one user document matching the uid)
        const userDoc = userQuerySnapshot.docs[0];

        userData = userDoc.data();
        //console.log(userData)
        //let lastTimestampDay = userData.lastRecommended.toDate().toDateString() //this is for 24 hr
        let lastTimestamp = userData.lastRecommended.toDate() //remove this for 24 hr
        //console.log(lastTimestampDay)
        //let currentTimeStampDay = new Date().toDateString() //this is for 24 hr
        let currentTimeStamp = new Date() //remove this for 24 hr
        let timeDifference = currentTimeStamp - lastTimestamp //remove this for 24 hr

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
            if (timeDifference < 60000){ //replace this with currentTimeStampDay===lastTimeStampDay for 24 hrs
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
        if (currentTimeStampDay!==lastTimestampDay){
          console.log("# of recommended:",recommendNumber)
          for (let i = 0; i < recommendNumber; i++) {
            // Generate a random number between min and max (inclusive)
            let randomNumber = Math.floor(Math.random() * numberOfContacts);
            recommendedContactPhoneList.push(entireContactPhoneList[randomNumber])
            recommendedContactNameList.push(entireContactNameList[randomNumber])
            phoneQuery = query(contactsRef, where("phone", "==", entireContactPhoneList[randomNumber]))
            querySnapshot = await getDocs(phoneQuery)
            let docWanted = querySnapshot.docs[0]
            await updateDoc(docWanted.ref, {
              chosen: true // Use new Date() if you prefer a Date object
            });
          }
          await updateDoc(userDoc.ref, {lastRecommended: new Date()})
        }
        setRecommendedContactPhones(recommendedContactPhoneList)
        setRecommendedContactNames(recommendedContactNameList)
      } catch (error) {
        console.error("Error getting recommended contacts:", error);
      }
    }
    fetchRecommendedContacts()
  }, [])

  const navigateToProfile = (index, item) => {
    navigation.navigate("Profile", {uid: email, contactPhone: recommendedContactPhones[index], contactName: item, name: name, recommendNumber: recommendNumber, lastScreen: "HomeScreen"})
  }

  const renderChecklistItem = ({ item, index }) => (
    <ChecklistComponent name={item} goToProfile={() => navigateToProfile(index, item)} />
  );

  return (
      <View style={styles.container}>
          {/* <Image source={require('./assets/ROlogo.png')} /> */}

          <View style={styles.logoContainer}>
              <TouchableOpacity onPress={() => {navigation.navigate('ContactList', {name: name, email: email, recommendNumber: recommendNumber})}}>
                <Text style={styles.icon}>👥</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.greetingContainer}>
              <Text style={styles.subtitle}>Hi {name.split(" ")[0]},</Text>
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
      </View>
  );
};

export default HomeScreen;