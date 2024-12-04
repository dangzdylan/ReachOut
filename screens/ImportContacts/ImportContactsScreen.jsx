import React, { useEffect, useState } from "react"; // Add useState to the import
import { Modal, Button, View, Text, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ImportContactsScreen.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Contacts from 'expo-contacts';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ImportContactsScreen({ navigation, route }) {
  const {uid, name} = route.params
  const userId = uid
  // const userId = "userId1";  // Replace with the actual userId

  async function createNewCollection() {
    try {
      const newCollectionRef = collection(db, "newCollectionName");
      const docRef = await addDoc(newCollectionRef, { field1: "value1", field2: "value2" });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Request permission, fetch contacts
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        // if (data.length > 0) {
        //   const contact = data[0];
        //   console.log(contact);
        // }
        const importedContacts = data.map(contact => ({
          name: contact.name,
          phone: contact.phoneNumbers?.[0]?.number || "", // Assume first phone number
          chosen : false,
          // TODO: notes collection instead of field
          notes: contact.notes || "",  // Notes field (if available)
        }));

        // // DUMMY
        // const importedContacts = [{
        //   name: "Test User",
        //   phone: "1234567890",
        //   notes: "Test note",
        // }];

        console.log("=====Imported Contacts:", importedContacts[0])
        // Call function to add contacts to Firestore
        // 
        await addContactsToFirestore(userId, importedContacts);
      } else {
        console.log("Permission not granted to access contacts.");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Import Contacts</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ConfigContacts", {uid: userId, name: name})}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

async function addContactsToFirestore(userId, importedContacts) {    
  // Iterate over the imported contacts and add them to Firestore
  for (const contact of importedContacts) {
    const { name, phone, chosen } = contact;

    // Prepare the contact data to be added
    const contactData = {
      name: name,     // Name field
      phone: phone,   // Phone field
      chosen: chosen,
      notes: contact.notes || "",  // Notes field, if available
    };

    try {
      // add a new contact
      await addDoc(collection(db, "users", userId, "contacts"), contactData);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }
}