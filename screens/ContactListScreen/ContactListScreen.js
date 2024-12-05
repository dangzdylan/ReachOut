import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ContactListScreen({ navigation, route }) {
  const { name, email, recommendNumber } = route.params;

  const [contactList, setContactList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // State for the search query
  const userId = email;

  const [loading, setLoading] = useState(true)

  // Function to filter contacts based on search query (prefix match)
  const filteredContacts = contactList.filter(contact =>
    contact[1].name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
    contact[1].phone.includes(searchQuery)
  );


  // Grab contacts of current user
  useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const ref = doc(db, "users", userId);
      const uid = (await getDoc(ref)).data()["email"];
      const colSnap = await getDocs(collection(ref, "contacts"));
      let newContacts = [];
      colSnap.forEach((doc) => {
        newContacts.push([doc.id, doc.data(), uid]);
      });

      setContactList(newContacts);
      setLoading(false)
    };

    getData();
  }, [userId]);

  // Subcomponent for each contact
  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Ionicons name="person-circle-outline" size={30} />
      <Text style={styles.contactName}>{"  " + item[1].name}</Text>
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

  // Display contacts
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

