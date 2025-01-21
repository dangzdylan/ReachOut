import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ChecklistComponent from './ChecklistComponent';
import { Ionicons } from '@expo/vector-icons';

import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

const HomeScreen = ({ navigation, route }) => {
  const [recommendedContactPhones, setRecommendedContactPhones] = useState([]);
  const [recommendedContactNames, setRecommendedContactNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const { name, email, recommendNumber } = route.params;

  useEffect(() => {
    async function fetchRecommendedContacts() {
      setLoading(true);
      try {
        const userRef = collection(db, 'users');
        const userQuery = query(userRef, where('email', '==', email));
        const userQuerySnapshot = await getDocs(userQuery);
        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();

        const lastRecommended = userData.lastRecommended.toDate();
        const now = new Date();
        const isNewDay = lastRecommended.toDateString() !== now.toDateString();

        const contactsRef = collection(userDoc.ref, 'contacts');
        const contactsSnapshot = await getDocs(contactsRef);

        let recommendedContacts = [];
        let allContacts = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        }));

        if (isNewDay) {
          for (const contact of allContacts) {
            await updateDoc(contact.ref, { chosen: false });
          }

          const newRecommended = [];
          while (newRecommended.length < recommendNumber && allContacts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allContacts.length);
            const [selectedContact] = allContacts.splice(randomIndex, 1);

            newRecommended.push(selectedContact);
            await updateDoc(selectedContact.ref, { chosen: true });
          }

          recommendedContacts = newRecommended;
          await updateDoc(userDoc.ref, { lastRecommended: now });
        } else {
          recommendedContacts = allContacts.filter((contact) => contact.chosen);
        }

        setRecommendedContactNames(recommendedContacts.map((contact) => contact.name));
        setRecommendedContactPhones(recommendedContacts.map((contact) => contact.phone));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended contacts:', error);
        setLoading(false);
      }
    }
    fetchRecommendedContacts();
  }, []);

  const handleDelete = async (index, isPermanent) => {
    try {
      const contactPhone = recommendedContactPhones[index];

      const newNames = [...recommendedContactNames];
      const newPhones = [...recommendedContactPhones];
      newNames.splice(index, 1);
      newPhones.splice(index, 1);

      if (!isPermanent) {
        const userRef = collection(db, 'users');
        const contactsRef = collection(db, 'users', email, 'contacts');
        const contactsSnapshot = await getDocs(contactsRef);

        const availableContacts = contactsSnapshot.docs.filter(
          (doc) => !newPhones.includes(doc.data().phone)
        );

        if (availableContacts.length > 0) {
          const randomContact =
            availableContacts[Math.floor(Math.random() * availableContacts.length)];
          newNames.push(randomContact.data().name);
          newPhones.push(randomContact.data().phone);

          await updateDoc(randomContact.ref, { chosen: true });
        }
      } else {
        const contactsRef = collection(db, 'users', email, 'contacts');
        const contactQuery = query(contactsRef, where('phone', '==', contactPhone));
        const contactSnapshot = await getDocs(contactQuery);

        if (!contactSnapshot.empty) {
          const contactDoc = contactSnapshot.docs[0];
          await deleteDoc(contactDoc.ref);
        }
      }

      setRecommendedContactNames(newNames);
      setRecommendedContactPhones(newPhones);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const renderChecklistItem = ({ item, index }) => (
    <ChecklistComponent
      name={item}
      goToProfile={() =>
        navigation.navigate('Profile', {
          uid: email,
          contactPhone: recommendedContactPhones[index],
          contactName: item,
          name,
          recommendNumber,
          lastScreen: 'HomeScreen',
        })
      }
      onDelete={() =>
        Alert.alert(
          'Delete Contact',
          'Do you want to delete this contact permanently or just for today?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Just for Today', onPress: () => handleDelete(index, false) },
            { text: 'Permanently', onPress: () => handleDelete(index, true) },
          ]
        )
      }
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.subtitle}>Hi {name.split(' ')[0]}!</Text>
            <TouchableOpacity
              style={styles.contactListButton}
              onPress={() => navigation.navigate('ContactList', { name, email, recommendNumber })}
            >
              <Ionicons name="people-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Today's Talks</Text>
          </View>
          <View style={styles.checklistContainer}>
            <FlatList
              data={recommendedContactNames}
              renderItem={renderChecklistItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      )}
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
