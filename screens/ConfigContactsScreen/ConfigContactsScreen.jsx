import {React, useState, useEffect} from "react";
import { View, Image, Text, SafeAreaView, TextInput, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ConfigContactsScreen.styles';
import { setDoc, addDoc, doc } from "firebase/firestore";
import { db } from '../../firebaseConfig';


export default function ConfigContactsScreen({navigation, route}) {
    const {uid, name} = route.params
    const userId = uid

    const [inputNumber, setInputNumber] = useState('');
    // TODO add time stamp
    const handleNumberChange = (value) => {
        // only allow numeric values
        const recommendNumber = value.replace(/[^0-9]/g, '');
        setInputNumber(recommendNumber);
        console.log('=======Number entered:', inputNumber);
    };

    // Function to dismiss keyboard when input is complete
    const handleSubmitEditing = () => {
        Keyboard.dismiss();
    };

    async function addNumContactsToFirebase() {
        try {
            const newDocRef = doc(db, "users", userId)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            await setDoc(newDocRef, {recommendNumber: inputNumber, lastRecommended: yesterday}, { merge: true })  
        console.log(`Number of contacts ${inputNumber} added successfully`);
        } catch (error) {
            console.error('Error adding field: ', error);
        }
      }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        How many contacts would you like to reach out to?
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
                        onSubmitEditing={handleSubmitEditing}
                    />
                </View>

                {/* Optional: Add a button to confirm the number */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        console.log('Confirmed number:', inputNumber);
                        addNumContactsToFirebase()
                        // nav to home screen
                        navigation.navigate("HomeScreen", {name: name, email: userId, recommendNumber: inputNumber})
                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};