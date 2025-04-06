import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './SettingsScreen.styles';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { deleteDoc, doc } from "firebase/firestore";
import { getDoc, setDoc } from "firebase/firestore";



export default function BlockedContactsScreen({navigation, route}) {
    const { name, email, recommendNumber } = route.params;
    const userId = email;
    const [blockedContacts, setBlockedContacts] = useState([]);

    useEffect(() => {
        // Fetch blocked contacts when component mounts
        const fetchBlockedContacts = async () => {
            try {
                const blockedSnapshot = await getDocs(collection(db, "users", userId, "blockedContacts"));
                if (blockedSnapshot.empty) {
                    console.log("No blocked contacts found.");
                    setBlockedContacts([]);
                } else {
                    // Extract and set the blocked contacts
                    const contacts = blockedSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    
                    console.log("Blocked Contacts:", contacts);
                    setBlockedContacts(contacts);
                }
            } catch (error) {
                console.error("Error getting blocked contacts:", error);
                setBlockedContacts([]);
            }
        };
        
        fetchBlockedContacts();
    }, [userId]);

    const handleUnblockContact = async (contactId) => {
        try {
            // Find the contact data before deleting
            const contactDocRef = doc(db, "users", userId, "blockedContacts", contactId);
            const contactSnap = await getDoc(contactDocRef);
            
            if (contactSnap.exists()) {
                const contactData = contactSnap.data();
    
                // Add back to regular contacts
                await setDoc(doc(db, "users", userId, "contacts", contactId), contactData);
    
                // Remove from blocked contacts
                await deleteDoc(contactDocRef);
    
                // Update state to remove from blocked list
                setBlockedContacts(prev => prev.filter(contact => contact.id !== contactId));
    
                console.log(`Contact ${contactId} unblocked and added back to contacts.`);
            } else {
                console.log("Contact not found in blocked list.");
            }
        } catch (error) {
            console.error("Error unblocking contact:", error);
        }
    };
    
    

    // Subcomponent for each blocked contact
    const renderBlockedContact = ({ item }) => (
        <View style={styles.contactItem}>
            <Ionicons name="person-circle-outline" size={30} />
            <Text style={styles.contactName}>{"  " + item.name}</Text>
            <TouchableOpacity onPress={() => handleUnblockContact(item.id)}>
    <Ionicons name="remove-circle-outline" size={40} color="red" />
</TouchableOpacity>

        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header with back button section */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                        style={styles.backButtonSafe}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="gray" />
                    </TouchableOpacity>
                    <Text style={styles.headerWithBack}>Blocked Contacts</Text>
                </View>
                
                {/* Loading indicator or content */}
                <View style={styles.listContainer}>
                    {blockedContacts.length === 0 ? (
                        <Text style={styles.noContactsText}>No blocked contacts found.</Text>
                    ) : (
                        <FlatList
                            data={blockedContacts}
                            keyExtractor={(item) => item.id}
                            renderItem={renderBlockedContact}
                            contentContainerStyle={styles.list}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}