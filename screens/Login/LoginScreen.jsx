import React from "react";
import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Alert, Image} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./LoginScreenStyles";
//import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
//import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";
//import auth from "@react-native-firebase/auth";
/*

GoogleSignin.configure({
 webClientId: "863938449545-aqsvif4186h2e20ci9nod0o4euqg71gd.apps.googleusercontent.com",
});

*/
function LoginScreen({navigation}) {
  const [emailText, setEmailText] = useState("")
  const [passwordText, setPasswordText] = useState("")
  const [nameText, setNameText] = useState("")
  const [onRegister, setOnRegister] = useState(false)
  const [confirmPasswordText, setConfirmPasswordText] = useState("")
  const [alternateText, setAlternateText] = useState("Don't have an account? Create One!")
  const [title, setTitle] = useState("Log in")

  const emailHandler = (input) => {
    setEmailText(input)
  }

  const nameHandler = (input) => {
    setNameText(input)
  }

  const passwordHandler = (input) => {
    setPasswordText(input)
  }

  const confirmPasswordHandler = (input) => {
    setConfirmPasswordText(input)
  }

  const verifyRegistration = () => {
    if (!emailText || !passwordText || !confirmPasswordText || !nameText) {
      Alert.alert("Error", "All fields must be filled out!");
      return false;
    }
    if (passwordText !== confirmPasswordText) {
      Alert.alert("Error", "Passwords do not match!")
      return false;
    }
    if (nameText.includes(" ")) {
      Alert.alert("Error", "First Name must be a single word!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailText)) {
      Alert.alert("Error", "Please enter a valid email address!");
      return false;
    }
    if (passwordText.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long!");
      return false;
    }
    return true
  }

  const verifyLogin = async() => {
    if (!emailText || !passwordText) {
      Alert.alert("Error", "All fields must be filled out!");
      return false;
    }
    //VERIFY EMAIL EXISTS IN DATABASE AND VERIFY THAT THE PASSWORD MATCHES THE EMAIL
    const docRef = doc(db, "users", emailText);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()){
      Alert.alert("Error", "Email does not exist!");
      return false;
    }
    if (docSnap.data().password !== passwordText) {
      setPasswordText("")
      Alert.alert("Error", "Password is incorrect!");
      return false;
    }
    return [docSnap.data().recommendNumber, docSnap.data().name]
  }

  const buttonPressHandler = async() => { //make this async later
    let verified = false
    if (onRegister) {
      verified = verifyRegistration()
      if (verified) {
        const newDocRef = doc(db, "users", emailText)
        await setDoc(newDocRef, {email: emailText, name: nameText, password: passwordText})
        navigation.navigate("ImportContacts", {uid: emailText, name: nameText})
      }
    } else {
      verified = await verifyLogin()
      if (verified) {
        navigation.navigate("HomeScreen", {name: verified[1], email: emailText, recommendNumber: verified[0]}) //const {name, email, recommendNumber} = route.params
      }
    }
  }

  const changeToRegisterOrLogin = () => {
    setEmailText("");
    setPasswordText("");
    setNameText("");
    setConfirmPasswordText("");
    if (!onRegister) {
      setOnRegister(true)
      setAlternateText("Already have an account? Log in!")
      setTitle("Register")
    } else {
      setOnRegister(false)
      setAlternateText("Don't have an account? Create One!")
      setTitle("Log in")
    }
  }

  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.content}>
        <Image source={require('../../assets/ROlogo.png')} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity onPress={() => changeToRegisterOrLogin()} style={styles.createAccount}>
          <Text style={styles.createAccountText}>{alternateText}</Text>
        </TouchableOpacity>
        <TextInput value={emailText} onChangeText={emailHandler} style={styles.input} placeholder="Email" placeholderTextColor="gray"/>
        {onRegister && (
          <TextInput value={nameText} onChangeText={nameHandler} style={styles.input} placeholder="First Name" placeholderTextColor="gray"/>
        )}
        <TextInput value={passwordText} onChangeText={passwordHandler} style={styles.input} placeholder="Password" placeholderTextColor="gray" secureTextEntry={true}/>
        {onRegister && (
          <TextInput value={confirmPasswordText} onChangeText={confirmPasswordHandler} style={styles.input} placeholder="Confirm Password" placeholderTextColor="gray" secureTextEntry={true}/>
        )}
        {!onRegister && (
          <TouchableOpacity onPress={() => {}} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressHandler()}>
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        </View>
     </View>
   </SafeAreaView>
 );
}


export default LoginScreen;