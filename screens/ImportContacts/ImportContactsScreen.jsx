import React, { useEffect, useState } from "react"; // Add useState to the import
import { Modal, Button, View, Text, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ImportContactsScreenStyles';
import * as Contacts from 'expo-contacts';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ImportContactsScreen({ navigation, route }) {
  const { uid, name } = route.params;
  const userId = uid;

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });

        const importedContacts = data.map(contact => ({
          name: contact.name,
          phone: contact.phoneNumbers?.[0]?.number || "", // Assume first phone number
          chosen : false,
          //recommendedAlready: false
        }));

        console.log("=====Imported Contacts:", importedContacts[0]);
        await addContactsToFirestore(userId, importedContacts);
      } else {
        console.log("Permission not granted to access contacts.");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Import Contacts</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ConfigContacts", { uid: userId, name: name })}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

async function addContactsToFirestore(userId, importedContacts) {
  for (const contact of importedContacts) {
    const { name, phone, chosen } = contact;

    const contactData = {
      name: name,     // Name field
      phone: phone,   // Phone field
      chosen: chosen,
      recommendedAlready: false
    };

    try {
      await addDoc(collection(db, "users", userId, "contacts"), contactData);
    } catch (error) {
      // console.error("Error adding contact:", error);
    }
  }
}
