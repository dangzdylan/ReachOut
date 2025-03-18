import React from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './SettingsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { cancelSession } from "../Login/AuthService";

export default function SettingsScreen({navigation, route}) {
    const { name, email, recommendNumber } = route.params;

    const confirmLogout = async () => {
        const confirm = await new Promise((resolve) => {
            Alert.alert(
                "Confirm Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "Cancel",
                        onPress: () => resolve(false),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => resolve(true)
                    }
                ]
            );
        });

        if (confirm) {
            await cancelSession();
            navigation.navigate("Login"); // Navigate to the login screen after logout
        }
    };
    
    const settingsOptions = [
        {
            title: "Change Name",
            onPress: () => navigation.navigate("ChangeNameScreen", { name, email, recommendNumber }),
            icon: "person-outline"
        },
        {
            title: "Change Password",
            onPress: () => navigation.navigate("ChangePassword", { name, email, recommendNumber }),
            icon: "lock-closed-outline"
        },
        {
            title: "Change Reach Out Number",
            onPress: () => navigation.navigate("ChangeContactNumber", { name, email, recommendNumber }),
            icon: "people-circle-outline"
        },
        {
            title: "Show Blocked Contacts",
            onPress: () => navigation.navigate("BlockedContacts", { name, email, recommendNumber }),
            icon: "ban-outline"
        },
        {
            title: "Import More Contacts",
            onPress: () => navigation.navigate("ImportContactsScreen", { name, email, recommendNumber }),
            icon: "people-outline"
        },
        {
            title: "Logout",
            onPress: () => confirmLogout(),
            icon: "log-out-outline"
        }
    ];

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
                    <Text style={styles.headerWithBack}>Settings</Text>
                </View>
                
                {/* Settings Options */}
                <View style={styles.optionsContainer}>
                    {settingsOptions.map((option, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.optionButton}
                            onPress={option.onPress}
                        >
                            <View style={styles.optionContent}>
                                <Ionicons name={option.icon} size={24} color="#555" />
                                <Text style={styles.optionText}>{option.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="#999" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}