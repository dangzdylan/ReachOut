import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import * as Contacts from 'expo-contacts';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { styles } from './ImportContactsScreenStyles';

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
          phone: contact.phoneNumbers?.[0]?.number || "",
          chosen: false,
          notes: contact.notes || "",
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
      name,
      phone,
      chosen,
      notes: contact.notes || "",
    };

    try {
      await addDoc(collection(db, "users", userId, "contacts"), contactData);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }
}
