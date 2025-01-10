import React, { useState, useEffect } from 'react';
import styles from './ProfileScreen.styles';
import { Text, View, Image, TouchableOpacity, TextInput, Modal, ScrollView, Linking, ActivityIndicator, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, where, addDoc, orderBy} from "firebase/firestore";

const ProfileScreen = ( {navigation, route} ) => {
  
  const {uid, contactPhone, contactName, name, recommendNumber, lastScreen} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  //const [profileNotes, setProfileNotes] = useState()
  const [dateNotes, setDateNotes] = useState([])
  const [entryNotes, setEntryNotes] = useState([])
  const [inputText, setInputText] = useState('');
  const [noteAdded, setNoteAdded] = useState(0);

  const [loading, setLoading] = useState(true)

  //These are first without props
  //const [uid, setUID] = useState("susanjones@hotmail.com") //this will be passed as props UID later
  //const [contactPhone, setContactPhone] = useState("4084084088") //this will be passed as props contactPhoneNumber later
  //const [contactName, setContactName] = useState("Bob") //this will be passed as props contactName later
  //deal with pfp later

  useEffect(() => {
    async function fetchNotesData() {
      setLoading(true)
      try {
        // Reference to the user's document
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", uid));
        const userQuerySnapshot = await getDocs(userQuery)

        // Get the user document (we assume there is only one user document matching the uid)
        const userDoc = userQuerySnapshot.docs[0];
        const userData = userDoc.data();

        // Reference to the contacts subcollection
        const contactsRef = collection(userDoc.ref, "contacts");
    
        // Query to get all contacts for that user
        const contactsSnapshot = await getDocs(contactsRef);
    
        // Iterate over each contact
        contactsSnapshot.forEach(async (contactDoc) => {
          const contactData = contactDoc.data();

          if (contactData.phone==contactPhone){
            // Reference to the notes subcollection for each contact
            const notesRef = collection(contactDoc.ref, "notes");

            const notesQuery = query(notesRef, orderBy("date", "desc"));
      
            // Query to get all notes for this contact
            const notesSnapshot = await getDocs(notesQuery);
            
            /*
            // Check if there are any notes
            if (notesSnapshot.empty) {
              console.log("Add your first entry");
              
              return;
            }
            */
            let dateNotesArray = [];
            let entryNotesArray = [];
            // Log all note entries for each contact
            notesSnapshot.forEach((noteDoc) => {
              const noteData = noteDoc.data();

              // Convert Firestore Timestamp to a readable date format
              const date = noteData.date.toDate(); // Convert to JavaScript Date object
              const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
              dateNotesArray.push(formattedDate)
              entryNotesArray.push(noteData.entry)
              //console.log(`Contact ${contactData.name} - Date: ${formattedDate}, Entry: ${noteData.entry}`);
            });
            setDateNotes(dateNotesArray)
            setEntryNotes(entryNotesArray)
          }

        });
        setLoading(false)
      } catch (error) {
        console.error("Error getting contact notes:", error);
        setLoading(false)
      }
    }
    fetchNotesData()
  }, [noteAdded])

  const addToFirebase = async() => {
    setLoading(true)
    try {
      // Reference to the users collection
      const usersRef = collection(db, "users");
  
      // Query to find the user document by email (uid)
      const userQuery = query(usersRef, where("email", "==", uid));
      const userQuerySnapshot = await getDocs(userQuery);
  
      // Get the user document (we expect only one result since email should be unique)
      const userDoc = userQuerySnapshot.docs[0];
      const userRef = userDoc.ref;
  
      // Reference to the contacts subcollection of the user document
      const contactsRef = collection(userRef, "contacts");
  
      // Query to find the contact document by phone number
      const contactQuery = query(contactsRef, where("phone", "==", contactPhone));
      const contactQuerySnapshot = await getDocs(contactQuery);
  
      // Get the first contact document (since phone number is unique for each contact)
      const contactDoc = contactQuerySnapshot.docs[0];
  
      // Reference to the notes subcollection inside the contact document
      const notesRef = collection(contactDoc.ref, "notes");
  
      // Add the new note to the notes subcollection
      const newNoteRef = await addDoc(notesRef, {date: new Date(), entry: inputText});
      setLoading(false)
    } catch (error) {
      console.error("Error adding note:", error);
      setLoading(false)
    }
  }

  const handleSubmitEditing = async() => {

    //SHOULD BE UPDATING DB
    if (inputText) {
      //const newNotes = `${profileNotes}\n${selectedDate.toDateString()}: ${inputText}`

      await addToFirebase()
      
      //setProfileNotes(newNotes);
      setInputText("");

      //want to reshow list
      let newVal = 1 - noteAdded
      setNoteAdded(newVal)
    }
    //Alert.alert('Notes Saved', `Date: ${selectedDate.toDateString()}\nNotes: ${inputText}`);
    setModalVisible(false); // Close the modal
      
  };

  const handleGoBack = () => {
    navigation.navigate(lastScreen, {name: name, email: uid, recommendNumber: recommendNumber});
  };

  const handleAddEntry = () => {
    setModalVisible(true);
  };

  const handleReachOut = () => {
    const url = `sms:${contactPhone}`; // url to sms (imsg or message for android)

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Unable to open SMS');
        }
      })
      .catch((err) => console.error('Error opening SMS:', err));
  }

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <>
          {/*
          <Image
            source={{
              uri: 'https://via.placeholder.com/150', // Replace this with the URL of the dog image
            }}
            style={styles.image}
          />
          */
          }
          <Ionicons name="person-circle-outline" size={130} />
          <Text style={styles.name}>{contactName}</Text>
          <TouchableOpacity style={styles.button} onPress={handleReachOut}>
            <Text style={styles.buttonText}>Reach Out!</Text>
          </TouchableOpacity>

          <>
          {/* Notes box */}
          {/*
            <View style={styles.entriesContainer}>
            <Text style={styles.entryText}>
              {profileNotes || 'Add your first entry!'}
            </Text>
            </View>
          */}
          <ScrollView style={styles.entriesContainer} showsVerticalScrollIndicator={true} scrollIndicatorInsets={{ top: 10, bottom: 10 }}>
            {dateNotes.length==0 ? <Text style={styles.entryText}>Your entries are displayed here!</Text> :
            dateNotes.map((item1, index) => (
              <View key={index}>
                <Text style={{ ...styles.entryText, fontWeight: 'bold' }}>{item1}:</Text>
                <Text style={styles.entryText}>{entryNotes[index]}</Text>
                <Text></Text>
              </View>
            ))}
          </ScrollView>

          {/* Modal for Typing and Date Selection */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Notes</Text>
                
                {/* Text Input for Notes */}
                <TextInput
                  style={styles.modalInput}
                  value={inputText}
                  returnKeyType="done"
                  multiline
                  onChangeText={(text) => setInputText(text)}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
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
        </>
      }
    </View>
  );
};


export default ProfileScreen;