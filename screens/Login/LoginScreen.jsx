import React from "react";
import { useEffect } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./LoginScreenStyles";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";
//import auth from "@react-native-firebase/auth";
/*

GoogleSignin.configure({
 webClientId: "863938449545-aqsvif4186h2e20ci9nod0o4euqg71gd.apps.googleusercontent.com",
});

*/
function LoginScreen({navigation}) {

 // Set up the Google OAuth request
 const [request, response, promptAsync] = useAuthRequest({
  clientId: "863938449545-aqsvif4186h2e20ci9nod0o4euqg71gd.apps.googleusercontent.com", // Your Google OAuth client ID
  redirectUri: makeRedirectUri({ useProxy: true }), // Expo proxy for redirects
  scopes: ["openid", "profile", "email"]
 });

 // Handle authentication response
 useEffect(() => {
  console.log("HIIIIIIELO")
  if (response?.type === "success" && response.authentication) {
    const { idToken, accessToken } = response.authentication;

    // Create a Google credential with the tokens
    const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);

    // Sign in with Firebase Auth using the Google credential
    signInWithCredential(auth, googleCredential)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const { uid, email, displayName } = user;

        // Firestore reference for the user document
        const userDocRef = doc(db, "users", uid);

        // Check if the user's document already exists
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // Create a document for first-time users
          const initialData = {
            email: email,
            name: displayName
          };
          await setDoc(userDocRef, initialData);
          console.log("New user document created:", initialData);
          navigation.navigate("ImportContacts", {uid: uid})
        } else {
          console.log("User already exists in Firestore.");
          // If the document exists, retrieve the existing data
          const userData = userDoc.data(); // Get all fields in the document
          const userEmail = userData.email;
          const userName = userData.name;
          const recommendNumber = userData.recommend_number;
          navigation.navigate("Home", {name: userName, email: userEmail, recommendNumber: recommendNumber})
        }

        // Navigate to the "Play" screen
        console.log("User logged in successfully!");
        navigation.navigate("Play");
      })
      .catch((error) => {
        console.error("Firebase sign-in error:", error);
        Alert.alert("Error", "Failed to log in with Google. Please try again.");
      });
  }
 }, [response]);

 const handleGoogleSignIn = async () => {
  try {
    if (!request) {
      console.error("OAuth request is not ready yet.");
      Alert.alert("Error", "OAuth request is still loading. Please try again in a moment.");
      return;
    }
    console.log("=====Log in with Google pressed");
    const result = await promptAsync(); // Trigger OAuth flow
    console.log("PromptAsync result:", result);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    Alert.alert("Error", "Something went wrong during login. Please try again.");
  }
 };

/*
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

*/
 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.content}>
       <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
           <Text style={styles.buttonText}>Log in with Google</Text>
         </TouchableOpacity>
       </View>
     </View>
   </SafeAreaView>
 );
}


export default LoginScreen;