// // import {React, useState, useEffect} from "react";
// // import { View, Image, Text, SafeAreaView, TextInput, Keyboard } from "react-native";
// // import { TouchableOpacity } from "react-native-gesture-handler";
// // import { styles } from './SettingsScreen.styles';
// // import { doc, updateDoc } from "firebase/firestore";
// // import { db } from '../../firebaseConfig';
// // import { Ionicons } from '@expo/vector-icons';

// // export default function SettingsScreen({navigation, route}) {
// //     const { name, email, recommendNumber } = route.params;
// //     const userId = email;

// //     return (
// //         <SafeAreaView style={styles.container}>
// //             <View style={styles.content}>
// //             <Text style={styles.header}>Settings</Text>
// //                 <View style={styles.textContainer}>
// //                     <Text style={styles.title}>
// //                         Change # of contact recommendations:
// //                     </Text>
// //                 </View>

// //                 {/* Back Button */}
// //                 <TouchableOpacity style={styles.backButton} onPress={() => {
// //                     navigation.navigate("HomeScreen", { name: name, email: email, recommendNumber: inputNumber });
// //                 }}>
// //                     <Ionicons name="arrow-back" size={24} color="gray" />
// //                 </TouchableOpacity>
// //             </View>
// //         </SafeAreaView>
// //     );
// // };

// import React from "react";
// import { View, Text, SafeAreaView } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { styles } from './SettingsScreen.styles';
// import { Ionicons } from '@expo/vector-icons';

// export default function SettingsScreen({navigation, route}) {
//     const { name, email, recommendNumber } = route.params;
    
//     const settingsOptions = [
//         {
//             title: "Edit Number of Reach Outs",
//             onPress: () => navigation.navigate("ChangeContactNumber", {name: name, email: email, recommendNumber: recommendNumber}),
//             icon: "call-outline"
//         },
//         {
//             title: "Edit Name",
//             onPress: () => navigation.navigate("ChangeNameScreen", { name, email, recommendNumber }),
//             icon: "person-outline"
//         },
//         {
//             title: "Change Password",
//             onPress: () => navigation.navigate("ChangePasswordScreen", { name, email, recommendNumber }),
//             icon: "lock-closed-outline"
//         },
//         {
//             title: "Show Blocked Contacts",
//             onPress: () => navigation.navigate("BlockedContactsScreen", { name, email, recommendNumber }),
//             icon: "ban-outline"
//         },
//         {
//             title: "Import More Contacts",
//             onPress: () => navigation.navigate("ImportContactsScreen", { name, email, recommendNumber }),
//             icon: "people-outline"
//         }
//     ];

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.content}>
//                 <Text style={styles.header}>Settings</Text>
                
//                 {/* Settings Options */}
//                 <View style={styles.optionsContainer}>
//                     {settingsOptions.map((option, index) => (
//                         <TouchableOpacity 
//                             key={index} 
//                             style={styles.optionButton}
//                             onPress={option.onPress}
//                         >
//                             <View style={styles.optionContent}>
//                                 <Ionicons name={option.icon} size={24} color="#555" />
//                                 <Text style={styles.optionText}>{option.title}</Text>
//                             </View>
//                             <Ionicons name="chevron-forward" size={24} color="#999" />
//                         </TouchableOpacity>
//                     ))}
//                 </View>

//                 {/* Back Button */}
//                 <TouchableOpacity 
//                     style={styles.backButton} 
//                     // onPress={() => navigation.navigate("HomeScreen", { 
//                     //     name: name, 
//                     //     email: email, 
//                     //     recommendNumber: recommendNumber 
//                     // })}
//                     onPress={() => navigation.goBack()}
//                     >
//                     <Ionicons name="arrow-back" size={24} color="gray" />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }

import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './SettingsScreen.styles';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({navigation, route}) {
    const { name, email, recommendNumber } = route.params;
    
    const settingsOptions = [
        {
            title: "Change Name",
            onPress: () => navigation.navigate("ChangeNameScreen", { name, email, recommendNumber }),
            icon: "person-outline"
        },
        {
            title: "Change Password",
            onPress: () => navigation.navigate("ChangePasswordScreen", { name, email, recommendNumber }),
            icon: "lock-closed-outline"
        },
        {
            title: "Change Reach Out Number",
            onPress: () => navigation.navigate("ChangeContactNumber", { name, email, recommendNumber }),
            icon: "people-circle-outline"
        },
        {
            title: "Show Blocked Contacts",
            onPress: () => navigation.navigate("BlockedContactsScreen", { name, email, recommendNumber }),
            icon: "ban-outline"
        },
        {
            title: "Import More Contacts",
            onPress: () => navigation.navigate("ImportContactsScreen", { name, email, recommendNumber }),
            icon: "people-outline"
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