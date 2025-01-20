import {React, useState, useEffect} from "react";
import { View, Image, Text, SafeAreaView, TextInput, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './SettingsScreen.styles';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({navigation, route}) {
    const { name, email, recommendNumber } = route.params;
    const userId = email;

    const [inputNumber, setInputNumber] = useState('');
    const handleNumberChange = (value) => {
        // only allow numeric values
        const recommendNumber = value.replace(/[^0-9]/g, '');
        setInputNumber(recommendNumber);
        console.log('=======Number entered:', inputNumber);
    };

    async function addNumContactsToFirebase() {
        try {
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, {
            recommendNumber: inputNumber,});  
        console.log(`Number of contacts ${inputNumber} added successfully`);
        } catch (error) {
            console.error('Error adding field: ', error);
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.header}>Settings</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Change # of contact recommendations:
                    </Text>
                    <TextInput
                        value={inputNumber}
                        style={styles.input}
                        onChangeText={handleNumberChange}
                        placeholder="Enter number"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
                        maxLength={5} // Limit input length
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss()}
                    />
                </View>

                {/* Optional: Add a button to confirm the number */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        console.log('Confirmed number:', inputNumber);
                        addNumContactsToFirebase()
                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => {
                    navigation.navigate("HomeScreen", { name: name, email: email, recommendNumber: inputNumber });
                }}>
                    <Ionicons name="arrow-back" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};