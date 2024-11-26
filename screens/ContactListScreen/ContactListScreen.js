import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';


export default function ContactListScreen({ navigation }) {
 const contacts = [
   { id: '1', name: 'Valerie Eng' },
   { id: '2', name: 'Dylan Smith' },
   { id: '3', name: 'Arnav Johnson' },
   { id: '4', name: 'Renata Camargo' },
   { id: '5', name: 'Emily Martinez' },
   { id: '6', name: 'Selena Gomez' },
   { id: '7', name: 'Jessica Garcia' },
 ];


 const renderContact = ({ item }) => (
   <View style={styles.contactItem}>
     <View style={styles.circle} />
     <Text style={styles.contactName}>{item.name}</Text>
     <Ionicons name="checkmark-circle-outline" size={24} color="black" />
   </View>
 );


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Contacts</Text>
     <FlatList
       data={contacts}
       keyExtractor={(item) => item.id}
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






