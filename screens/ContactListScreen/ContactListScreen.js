import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';
import { collection, doc, getDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ContactListScreen({ navigation, route }) {
  const { name, email, recommendNumber } = route.params;
  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const userId = email;

  const filteredContacts = contactList.filter(contact =>
    contact[1].name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    contact[1].phone.includes(searchQuery)
  );

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const ref = doc(db, "users", userId);
      const uid = (await getDoc(ref)).data()["email"];
      const colSnap = await getDocs(collection(ref, "contacts"));
      let newContacts = [];
      colSnap.forEach((doc) => {
        newContacts.push([doc.id, doc.data(), uid]);
      });

      setContactList(newContacts);
      setLoading(false);
    };

    getData();
  }, [userId]);

  // Function to delete a contact or move it to blocked list
  const deleteContact = async (contactId) => {
    try {
      const userRef = doc(db, "users", userId);
      const contactRef = doc(userRef, "contacts", contactId);
      const contactSnap = await getDoc(contactRef);

      if (!contactSnap.exists()) {
        Alert.alert("Error", "Contact not found.");
        return;
      }

      const contactData = contactSnap.data();

      // Ask user if they want to block the contact instead of deleting
      Alert.alert(
        "Permanently Delete?",
        "Would you like to block this contact or permanetly delete?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Block",
            onPress: async () => {
              await addDoc(collection(userRef, "blockedContacts"), contactData);
              await deleteDoc(contactRef); // Remove from contacts after blocking
              setContactList(prevContacts => prevContacts.filter(contact => contact[0] !== contactId));
              Alert.alert('Success', 'Contact moved to blocked list.');
            },
            style: "destructive",
          },
          {
            text: "Permenantely Delete",
            onPress: async () => {
              await deleteDoc(contactRef); // Only remove contact, don’t block
              setContactList(prevContacts => prevContacts.filter(contact => contact[0] !== contactId));
              Alert.alert('Success', 'Contact deleted.');
            },
            style: "default",
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to delete the contact.');
      console.error("Error deleting contact: ", error);
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Ionicons name="person-circle-outline" size={30} />
      <Text style={styles.contactName}>{"  " + item[1].name}</Text>

      {/* Delete Button */}
      <TouchableOpacity onPress={() => deleteContact(item[0])}>
        <Ionicons name="trash-outline" size={30} color="red" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Profile', {
          uid: item[2],
          contactPhone: item[1]["phone"],
          contactName: item[1]["name"],
          name: name,
          recommendNumber: recommendNumber,
          lastScreen: "ContactList"
        });
      }}>
        <Ionicons name="information-circle-outline" size={40} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <>
          <Text style={styles.header}>Contacts</Text>

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search contacts"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* List of contacts */}
          <FlatList
            data={filteredContacts}
            keyExtractor={(item) => item[0]}
            renderItem={renderContact}
            contentContainerStyle={styles.list}
          />

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => {
            navigation.navigate("HomeScreen", { name: name, email: email, recommendNumber: recommendNumber });
          }}>
            <Ionicons name="arrow-back" size={24} color="gray" />
          </TouchableOpacity>

          <StatusBar style="auto" />
        </>
      }
    </View>
  );
}
