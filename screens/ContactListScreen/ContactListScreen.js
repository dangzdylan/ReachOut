import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ContactListScreen.styles';


export default function App() {
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
     <TouchableOpacity style={styles.backButton}>
       <Ionicons name="arrow-back" size={24} color="gray" />
     </TouchableOpacity>
     <StatusBar style="auto" />
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: 'white',
   paddingHorizontal: 16,
   paddingTop: 40,
 },
 header: {
   fontSize: 24,
   fontWeight: 'bold',
   textAlign: 'left',
   marginBottom: 16,
   textDecorationLine: 'underline',
 },
 list: {
   paddingBottom: 40,
 },
 contactItem: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingVertical: 12,
   borderBottomWidth: 1,
   borderBottomColor: '#ccc',
 },
 circle: {
   width: 24,
   height: 24,
   borderRadius: 12,
   borderWidth: 1,
   borderColor: '#ccc',
   marginRight: 16,
 },
 contactName: {
   flex: 1,
   fontSize: 16,
   color: '#333',
 },
 backButton: {
  position: 'absolute',
  bottom: 16,
  left: 16,
  backgroundColor: 'white', 
  width: 40,
  height: 40,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2, 
  borderColor: 'gray', 
  elevation: 3, 
},
});





