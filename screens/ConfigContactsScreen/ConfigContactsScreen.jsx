import {React, useState, useEffect} from "react";
import { View, Image, Text, SafeAreaView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ConfigContactsScreen.styles';
// import { addDoc, collection, update } from "firebase/firestore";
import { db } from '../../firebaseConfig';


export default function ConfigContactsScreen({navigation, route}) {
    const {uid} = route.params
    const userId = uid

    const [inputNumber, setInputNumber] = useState('');
    // TODO add time stamp
    const handleNumberChange = (value) => {
        // only allow numeric values
        const recommendNumber = value.replace(/[^0-9]/g, '');
        setInputNumber(recommendNumber);
        console.log('=======Number entered:', recommendNumber);
    };

    // Function to dismiss keyboard when input is complete
    const handleSubmitEditing = () => {
        Keyboard.dismiss();
        addNumContactsToFirebase(userId, numContacts)
    };

    async function addNumContactsToFirebase(userId, recommendNumberInput) {
        try {
            const newDocRef = doc(db, "users", emailText)
            await setDoc(newDocRef, {recommendNumber: recommendNumberInput, lastRecommended: new Date()})  
        console.log(`Number of contacts ${numContactInput} added successfully`);
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
                        // nav to home screen
                        navigation.navigate("HomeScreen")
                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};