import React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './LoginScreen.styles';

export default function LoginScreen({navigation}) {

  const handleGoogleSignUp = () => {
      console.log('=====Sign up pressed');
      navigation.navigate('ImportContacts');

    };

    const handleGoogleLogin = () => {
      console.log('=====Log in pressed');
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoogleSignUp}
          >
            <Text style={styles.buttonText}>Sign up with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.buttonText}>Log in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};