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

      let allContacts = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ref: doc.ref,
        ...doc.data(),
      }));

      let recommendedContacts = allContacts.filter((contact) => contact.chosen);

      if (recommendedContacts.length < recommendNumber) {
        while (recommendedContacts.length < recommendNumber && allContacts.length > 0) {
          const randomIndex = Math.floor(Math.random() * allContacts.length);
          const [selectedContact] = allContacts.splice(randomIndex, 1);

          recommendedContacts.push(selectedContact);
          await updateDoc(selectedContact.ref, { chosen: true });
        }
      }

      setRecommendedContactNames(recommendedContacts.map((contact) => contact.name));
      setRecommendedContactPhones(recommendedContacts.map((contact) => contact.phone));
    } catch (error) {
      console.error('Error fetching recommended contacts:', error);
    } finally {
      setLoading(false);
    }
  }

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
          'Do you want to delete this contact just for today or send it to the block list?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Just for Today', onPress: () => handleDelete(index, "temporary") },
            { text: 'Send to Block List', onPress: () => handleDelete(index, "block") },
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
