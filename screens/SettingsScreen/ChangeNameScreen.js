import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SettingsScreen.styles';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';

export default function ChangeNameScreen({ navigation, route }) {
    const { name, email, recommendNumber } = route.params;

    const [nameText, setNameText] = useState(name);

    const nameHandler = (text) => {
        setNameText(text);
    }

    const buttonPressHandler = () => {
        const userRef = doc(db, "users", email);
        updateDoc(userRef, {
            name: nameText
        });
        navigation.navigate("HomeScreen", { name: nameText, email: email, recommendNumber: recommendNumber });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonSafe}>
                        <Ionicons name="arrow-back" size={24} color="gray" />
                    </TouchableOpacity>
                    <Text style={styles.headerWithBack}>Contact Settings</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Change Name:
                    </Text>
                    <TextInput value={nameText} onChangeText={nameHandler} style={styles.input} placeholder="New Name" placeholderTextColor="gray"/>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={buttonPressHandler}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
