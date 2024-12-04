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
  const {uid} = route.params
  const userId = uid
  // const userId = "userId1";  // Replace with the actual userId
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
          onPress={() => navigation.navigate("ConfigContacts")}
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
      Name: name,     // Name field
      Phone: phone,   // Phone field
      Chosen: chosen,
      Notes: contact.notes || "",  // Notes field, if available
    };

    try {
      // add a new contact
      console.log("Firestore Path:", `users/${userId}/contacts`);
      await addDoc(collection(db, "users", userId, "contacts"), contactData);
      console.log(`Contact ${name} added successfully`);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }
}