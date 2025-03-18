import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, TextInput} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './SettingsScreen.styles';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import SHA256 from 'crypto-js/sha256';


export default function ChangePasswordScreen({navigation, route}) {
    const { name, email, recommendNumber } = route.params;
    const userId = email
    const [passwordText, setPasswordText] = useState("")
    const [confirmPasswordText, setConfirmPasswordText] = useState("")
    
    const passwordHandler = (input) => {
        setPasswordText(input)
    }

    const confirmPasswordHandler = (input) => {
        setConfirmPasswordText(input)
    }

    const encryptPassword = (password) => {
        return SHA256(password).toString();
    }

    const buttonPressHandler = async() => {
        verified = await verifyLogin()
        if (verified) {
            try {
                const encryptedPassword = encryptPassword(passwordText);
                const docRef = doc(db, "users", userId);
                await updateDoc(docRef, {
                    password: encryptedPassword
                });
                Alert.alert('Password Saved!')
                console.log('password saved')
            } catch (error) {
                console.error('Error changing password: ', error);
            }
            }
        setPasswordText('')
        setConfirmPasswordText('')
        }

    const verifyLogin = async() => {
        if (!passwordText || !confirmPasswordText) {
            Alert.alert("Error", "All fields must be filled out!");
            return false;
        }
        if (passwordText !== confirmPasswordText) {
            Alert.alert("Error", "Passwords do not match!")
            return false;
        }
        if (passwordText.length < 8) {
            Alert.alert("Error", "Password must be at least 8 characters long!");
            return false;
        }
        return true;
    }

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
                    <Text style={styles.headerWithBack}>Contact Settings</Text>
                </View>
                
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Change password:
                    </Text>
                    <TextInput value={passwordText} onChangeText={passwordHandler} style={styles.input} placeholder="New Password" placeholderTextColor="gray" secureTextEntry={true}/>
                    <TextInput value={confirmPasswordText} onChangeText={confirmPasswordHandler} style={styles.input} placeholder="Confirm New Password" placeholderTextColor="gray" secureTextEntry={true}/>
                </View>

                {/* Confirm button */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        console.log('New PW: ' + passwordText)
                        console.log('New PW 2: ' + confirmPasswordText)
                        buttonPressHandler();
                    }}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
