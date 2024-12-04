import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';
import { collection, doc, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ContactListScreen({ navigation, route}) {
  const {name, email, recommendNumber} = route.params

  /*
  ASSUMING props.userId will give me the user's ID
  */
  const [contactList, setContactList] = useState([]);
  const userId = props.userId || "userId1";

  //Grab contacts of current user
  useEffect(() => {
    const getData = async () => {
      const ref = doc(db, "users", userId);
      const uid = (await getDoc(ref)).data()["email"];
      const colSnap = await getDocs(collection(ref, "contacts"));
      let newContacts = [];
      colSnap.forEach((doc) => {
        newContacts.push([doc.id, doc.data(), uid]);
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
      <TouchableOpacity onPress={() => { 
        navigation.navigate('Profile', { uid: item[2], contactPhone: item[1]["phone"], contactName: item[1]["name"] }); 
        }}>
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
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.navigate("HomeScreen", (name, email, recommendNumber))}}>
        <Ionicons name="arrow-back" size={24} color="gray" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}






