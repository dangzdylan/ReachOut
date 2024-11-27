import React, { useState, useEffect } from 'react';
import styles from './ProfileScreen.styles';
import { Text, View, Image, Button, StyleSheet, TouchableOpacity, TextInput, Modal, Alert} from 'react-native';

const ProfileScreen = ( {navigation} ) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileNotes, setProfileNotes] = useState(''); //LATER FETCH FROM DB
  const [inputText, setInputText] = useState('');

  //These are first without props
  const [uid, setUID] = useState("susanjones@hotmail.com") //this will be passed as props UID later
  const [contactPhone, setContactPhone] = useState("4084084088") //this will be passed as props contactPhoneNumber later

  useEffect(() => {
    async function fetchNotesData() {
      try {
        // Reference to the user's document
        //const userRef = doc(db, "users", uid);   //UNCOMMENT THIS
        console.log("HEYYY")
        /*
        // Reference to the contacts subcollection
        const contactsRef = collection(userRef, "contacts");
    
        // Query to find the contact with the specific phone number
        const q = query(contactsRef, where("phoneNumber", "==", contactPhone));
    
        // Execute the query
        const querySnapshot = await getDocs(q);
    
        // Check if the contact was found
        if (querySnapshot.empty) {
          console.log("Contact not found"); //this can be deleted later
          return;
        }
    
        // Retrieve the notes from the contact document
        // Retrieve the first contact (since there's only one per phone number)
        const contactDoc = querySnapshot.docs[0];
        const contactData = contactDoc.data();
        console.log("Contact found:", contactData); //this can be deleted later
  
        // Reference to the notes subcollection
        const notesRef = collection(contactDoc.ref, "notes");
  
        // Query to get all notes
        const notesSnapshot = await getDocs(notesRef);
  
        // Check if there are any notes
        if (notesSnapshot.empty) {
          console.log("Add your first entry");
          return;
        }
  
        // Log all note entries
        notesSnapshot.forEach((noteDoc) => {
          const noteData = noteDoc.data();
          console.log(`Date: ${noteData.date}, Entry: ${noteData.entry}`);
        });
        */
      } catch (error) {
        console.error("Error getting contact notes:", error);
      }
    }
    fetchNotesData()
  }, [])

  const handleSubmitEditing = () => {

    //SHOULD BE UPDATING DB
    if (inputText) {
      const newNotes = `${profileNotes}\n${selectedDate.toDateString()}: ${inputText}`
      setProfileNotes(newNotes);
      setInputText("");
    }
    //Alert.alert('Notes Saved', `Date: ${selectedDate.toDateString()}\nNotes: ${inputText}`);
    setModalVisible(false); // Close the modal
      
  };

  const handleGoBack = () => {
    navigation.navigate('HomeScreen');
  };

  const handleAddEntry = () => {
    setModalVisible(true);
  };

  const handleReachOut = () => {
    //TODO
  }

  
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://via.placeholder.com/150', // Replace this with the URL of the dog image
        }}
        style={styles.image}
      />
      <Text style={styles.name}>Valerie Eng</Text>
      <TouchableOpacity style={styles.button} onPress={handleReachOut}>
        <Text style={styles.buttonText}>Reach Out!</Text>
      </TouchableOpacity>

      <>
      {/* Clickable Box (Opens Modal) */}
      <Text style={styles.entriesContainer}>
        <Text style={styles.entryText}>
          {profileNotes || 'Add your first entry!'}
        </Text>
      </Text>

       {/* Modal for Typing and Date Selection */}
       <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Notes</Text>
            
            {/* Text Input for Notes */}
            <TextInput
              style={styles.modalInput}
              multiline
              value={inputText}
              returnKeyType="done"
              onChangeText={(text) => setInputText(text)}
            />
            
            <Text style={styles.dateText}>
              {new Date().toDateString()} {/* Display the current date */}
            </Text>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmitEditing}
            >
              <Text style={styles.addButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>

      <View style={styles.footer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={handleGoBack}
        >
          <Text style={styles.backButtonIcon}>←</Text>
        </TouchableOpacity>

        {/* Add Entry Button */}
        <TouchableOpacity
          style={styles.addButtonWrapper}
          onPress={handleAddEntry}
        >
          <Text style={styles.addButtonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default ProfileScreen;