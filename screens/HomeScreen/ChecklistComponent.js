import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const ChecklistComponent = (props) => {
  const [checkmarkColor, setCheckMarkColor] = useState("#FFFFFF");

    useEffect(() => {
        const fetchInitialState = async () => {
            try {
                const userRef = collection(db, "users");
                const userQuery = query(userRef, where("email", "==", props.email));
                const userQuerySnapshot = await getDocs(userQuery);
                
                if (!userQuerySnapshot.empty) {
                    const userDoc = userQuerySnapshot.docs[0];
                    const contactsRef = collection(userDoc.ref, "contacts");
                    const q = query(contactsRef, where("name", "==", props.name));
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        const contactDoc = querySnapshot.docs[0];
                        const contactData = contactDoc.data();
                        
                        // Check if checkmarked field exists
                        if (!('checkmarked' in contactData)) {
                            // Initialize the field if it doesn't exist
                            await updateDoc(contactDoc.ref, {
                                checkmarked: false
                            });
                            setCheckMarkColor("#FFFFFF");
                        } else {
                            setCheckMarkColor(contactData.checkmarked ? "#AEBAEB" : "#FFFFFF");
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching initial state:", error);
            }
        };

        fetchInitialState();
    }, [props.email, props.name]);

    const setAColor = async () => {
      const newColor = checkmarkColor === "#FFFFFF" ? "#AEBAEB" : "#FFFFFF";
      setCheckMarkColor(newColor);
      
      try {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("email", "==", props.email));
        const userQuerySnapshot = await getDocs(userQuery);
        
        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          const contactsRef = collection(userDoc.ref, "contacts");
          const q = query(contactsRef, where("name", "==", props.name));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const contactDoc = querySnapshot.docs[0];
            await updateDoc(contactDoc.ref, {
              checkmarked: newColor === "#AEBAEB"
            });
            console.log("Successfully updated checkmarked status for", props.name);
          } else {
            console.error("Contact not found:", props.name);
            setCheckMarkColor(checkmarkColor); // Revert on failure
          }
        }
      } catch (error) {
        console.error("Error updating checkmarked status:", error);
        setCheckMarkColor(checkmarkColor); // Revert on failure
      }
    }


  return (
    <TouchableOpacity style={styles.container} onPress={props.goToProfile}>
      <View style={styles.pictureContainer}>
        <Ionicons name="person-circle-outline" size={50} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <TouchableOpacity
        style={[styles.checkmarkContainer, { backgroundColor: checkmarkColor }]}
        onPress={setAColor}
      >
        <Text style={styles.checkmarkText}>✓</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={props.onDelete}>
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChecklistComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFDFFF',
    padding: 16,
    borderRadius: 20,
    marginTop: 10,
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },
  pictureContainer: {
    width: 60,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    color: '#000',
  },
  checkmarkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    marginLeft: 15,
  },
  checkmarkText: {
    color: '#000',
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 15,
    padding: 8,
  },
});
