import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation, route }) => {
  const [recommendedContactPhones, setRecommendedContactPhones] = useState([]);
  const [recommendedContactNames, setRecommendedContactNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const { name, email, recommendNumber } = route.params;

  useEffect(() => {
    fetchRecommendedContacts();
  }, []);

  async function fetchRecommendedContacts() {
    setLoading(true);
    try {
      const userRef = collection(db, 'users');
      const userQuery = query(userRef, where('email', '==', email));
      const userQuerySnapshot = await getDocs(userQuery);
      const userDoc = userQuerySnapshot.docs[0];

      const contactsRef = collection(userDoc.ref, 'contacts');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4FF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  contactListButton: {
    backgroundColor: '#1A73E8',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A73E8',
  },
  checklistContainer: {
    flex: 1,
    marginTop: 10,
  },
});

export default HomeScreen;
