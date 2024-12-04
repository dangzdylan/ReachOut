import {React, useState, useEffect} from "react";
import { View, Image, Text, SafeAreaView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './ConfigContactsScreen.styles';

export default function ConfigContactsScreen({navigation, route}) {
    const {uid} = route.params
    const userId = uid

    const [inputNumber, setInputNumber] = useState('');
    // TODO add time stamp
    const handleNumberChange = (value) => {
        // only allow numeric values
        const numericValue = value.replace(/[^0-9]/g, '');
        setInputNumber(numericValue);
        console.log('=======Number entered:', numericValue);
    };

    // Function to dismiss keyboard when input is complete
    const handleSubmitEditing = () => {
        Keyboard.dismiss();
    };

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