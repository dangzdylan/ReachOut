import React from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./LoginScreenStyles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";


GoogleSignin.configure({
 webClientId: "863938449545-aqsvif4186h2e20ci9nod0o4euqg71gd.apps.googleusercontent.com",
});


function LoginScreen() {
 const navigation = useNavigation();


 const handleGoogleSignUp = async () => {
   try {
     console.log("=====Sign up pressed");


     // Initiate Google Sign-In
     const { idToken } = await GoogleSignin.signIn();


     // Create a Google credential with the token
     const googleCredential = auth.GoogleAuthProvider.credential(idToken);


     // Sign in the user with the credential
     await auth().signInWithCredential(googleCredential);


     console.log("User signed up successfully!");
     navigation.navigate("Play");
   } catch (error) {
     console.error("Google Sign-Up Error:", error);
     Alert.alert("Error", "Something went wrong during sign-up. Please try again.");
   }
 };


 const handleGoogleLogin = async () => {
   try {
     console.log("=====Log in pressed");


     // Check if the user is already signed in
     const isSignedIn = await GoogleSignin.isSignedIn();


     if (!isSignedIn) {
       // Initiate Google Sign-In if not signed in
       const { idToken } = await GoogleSignin.signIn();


       // Create a Google credential with the token
       const googleCredential = auth.GoogleAuthProvider.credential(idToken);


       // Sign in the user with the credential
       await auth().signInWithCredential(googleCredential);
     }


     console.log("User logged in successfully!");
     navigation.navigate("Play");
   } catch (error) {
     console.error("Google Login Error:", error);
     Alert.alert("Error", "Something went wrong during login. Please try again.");
   }
 };


 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.content}>
       <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
           <Text style={styles.buttonText}>Sign up with Google</Text>
         </TouchableOpacity>


         <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
           <Text style={styles.buttonText}>Log in with Google</Text>
         </TouchableOpacity>
       </View>
     </View>
   </SafeAreaView>
 );
}


export default LoginScreen;