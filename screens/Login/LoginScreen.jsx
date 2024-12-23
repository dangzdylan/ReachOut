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

  const emailHandler = (input) => {
    setEmailText(input)
  }

  const nameHandler = (input) => {
    setNameText(input)
  }

  const passwordHandler = (input) => {
    setPasswordText(input)
  }

  const buttonPressHandler = async() => {
    const docRef = doc(db, "users", emailText);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().password===passwordText) {
        navigation.navigate("HomeScreen", {name: docSnap.data().name, email: emailText, recommendNumber: docSnap.data().recommendNumber}) //const {name, email, recommendNumber} = route.params
      } else {
        Alert.alert("Error", "Password is incorrect!")
        setPasswordText("")
      }
    } else {
      const newDocRef = doc(db, "users", emailText)
      await setDoc(newDocRef, {email: emailText, name: nameText, password: passwordText})
      navigation.navigate("ImportContacts", {uid: emailText, name: nameText})
    }

  }

  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.content}>
     <Image source={require('../../assets/ROlogo.png')} style={styles.image} />
       <Text style={styles.titleText}>Login/Register</Text>
       <TextInput value={emailText} onChangeText={emailHandler} style={styles.input} placeholder="Email" placeholderTextColor="gray"/>
       <TextInput value={nameText} onChangeText={nameHandler} style={styles.input} placeholder="Name" placeholderTextColor="gray"/>
       <TextInput value={passwordText} onChangeText={passwordHandler} style={styles.input} placeholder="Password" placeholderTextColor="gray" secureTextEntry={true}/>
       <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={() => buttonPressHandler()}>
           <Text style={styles.buttonText}>Log in/Register</Text>
         </TouchableOpacity>
       </View>
     </View>
   </SafeAreaView>
 );
}


export default LoginScreen;