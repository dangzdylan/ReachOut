import { React, useEffect } from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './WelcomeScreen.styles';


export default function WelcomeScreen(props) {
  const navigation = props.navigation;
  useEffect(() => {
      // Set timer to navigate to LoginScreen after 5 seconds
      const timer = setTimeout(() => {
          console.log('=======Navigating to Login Screen');
          navigation.replace('Login'); // Using replace instead of navigate to prevent going back
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>Hello!</Text>
            <Text style={styles.subtitle}>Let's reach out!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// export default WelcomeScreen;
