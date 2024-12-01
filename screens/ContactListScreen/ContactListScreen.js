import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';
import { collection, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ContactListScreen({ navigation, ...props}) {
  /*
  ASSUMING props.userId will give me the user's ID
  */
  const [contactList, setContactList] = useState([]);
  const userId = props.userId || "userId1";

  //Grab contacts of current user
  useEffect(() => {
    const getData = async () => {
      const colRef = collection(db, "users", userId, "contacts");
      const colSnap = await getDocs(colRef);
      let newContacts = [];
      colSnap.forEach((doc) => {
        newContacts.push([doc.id, doc.data()]);
      });

      setContactList(newContacts);
    };

    getData();
  }, [userId])

  //Subcomponent for each contact
  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <Ionicons name="person-circle-outline" size={30} />
      <Text style={styles.contactName}>{"  " + item[1].name}</Text>
      <TouchableOpacity onPress={() => { navigation.navigate('Profile', { userId: userId, contactId: item[0] }) }}>
        <Ionicons name="information-circle-outline" size={30} />
      </TouchableOpacity>
    </View>
  );

  //Display contacts
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contacts</Text>
      <FlatList
        data={contactList}
        keyExtractor={(item) => item[0]}
        renderItem={renderContact}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.navigate("HomeScreen")}}>
        <Ionicons name="arrow-back" size={24} color="gray" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}






