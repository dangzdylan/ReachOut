import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';

import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, addDoc, orderBy} from "firebase/firestore";

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
        lastTimestampDay = userData.lastRecommended.toDate().toDateString()
        //console.log(lastTimestampDay)
        currentTimeStampDay = new Date().toDateString()

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
            if (currentTimeStampDay===lastTimestampDay){
              recommendedContactPhoneList.push(contactData.phone)
              recommendedContactNameList.push(contactData.name)
            } else {
              console.log("false")
              await updateDoc(contactDoc.ref, {
                chosen: false // Use new Date() if you prefer a Date object
              });
            }
          }
          
        });

        //IF IT IS A NEW DAY
        if (currentTimeStampDay!==lastTimestampDay){
          for (let i = 0; i < recommendNumber; i++) {
            // Generate a random number between min and max (inclusive)
            const randomNumber = Math.floor(Math.random() * numberOfContacts);
            recommendedContactPhoneList.push(entireContactPhoneList[randomNumber])
            recommendedContactNameList.push(entireContactNameList[randomNumber])

            phoneQuery = query(contactsRef, where("phone", "==", entireContactPhoneList[randomNumber]))
            querySnapshot = await getDocs(phoneQuery)
            let docWanted = querySnapshot.docs[0]
            await updateDoc(docWanted.ref, {
              chosen: true // Use new Date() if you prefer a Date object
            });
          }
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
    navigation.navigate("Profile", {uid: email, contactPhone: recommendedContactPhones[index], contactName: item})
  }

  const renderChecklistItem = ({ item, index }) => (
    <ChecklistComponent name={item} goToProfile={() => navigateToProfile(index, item)} />
  );

  return (
      <View style={styles.container}>
          <View style={styles.logoContainer}>
              <TouchableOpacity onPress={() => {navigation.navigate('ContactList', {name: name, email: email, recommendNumber: recommendNumber})}}>
                <Text style={styles.logo}>Contacts</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Hi {name.split(" ")[0]}</Text>
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10
  },
  logoContainer: {
    display: "flex"
  },
  logo: {
    fontSize: 15,
    textAlign: "right",
  },
  greetingText: {
    fontSize: 30,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 10,
  },
  underlinedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginVertical: 15,
  },
  checklistContainer: {
    width: '100%',
    gap: 12,
  }
});
