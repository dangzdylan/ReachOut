import React from "react";
import { useState } from "react";
import { View, Text, SafeAreaView, Alert, Image, Linking} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./LoginScreenStyles";
//import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
//import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
//import { GoogleSignin } from "@react-native-google-signin/google-signin";
//import auth from "@react-native-firebase/auth";
import SHA256 from 'crypto-js/sha256';
import email from "react-native-email";
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
  const [forgotPassword, setForgotPassword] = useState(false)
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


  const encryptPassword = (password) => {
    return SHA256(password).toString();
  }

  const doesUserExist = async() => {
    const docRef = doc(db, "users", emailText);
    const docSnap = await getDoc(docRef);
    return [docSnap.exists(), docSnap.data()];
  }


  const verifyRegistration = async() => {
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
    //check if email is already in database
    const [exists, data] = await doesUserExist()
    if (exists) {
      Alert.alert("Error", "Email already exists!");
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
    const [exists, data] = await doesUserExist()
    if (!exists){
      Alert.alert("Error", "Email does not exist!");
      return false;
    }
    const encryptedPassword = encryptPassword(passwordText);
    if (data.password !== encryptedPassword) {
      setPasswordText("")
      Alert.alert("Error", "Password is incorrect!");
      return false;
    }
    return [data.recommendNumber, data.name]
  }
  /*
  const verificationCode = () => {
    // Generate a random 5-character verification code
    const generateRandomCode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
    
    // Generate and encrypt the verification code
    const code = generateRandomCode();
    const encryptedCode = encryptPassword(code);

    const getRandomSubset = (length, count) => {
        const indices = new Set();
        while (indices.size < count) {
            indices.add(Math.floor(Math.random() * length));
        }
        return Array.from(indices).map(index => encryptedCode[index]);
    };

    const randomSubset = getRandomSubset(encryptedCode.length, 5);
    return randomSubset.join('');
  } */


  const buttonPressHandler = async() => {
    if (forgotPassword) {
      if (!emailText) {
        Alert.alert("Error", "Email is not set!");
        return;
      }
      
      const [exists, data] = await doesUserExist()
      if (!exists) {
        Alert.alert("Error", "Email does not exist!");
        return;
      }
      Alert.alert("Next Steps", "Please email reachoutadrv@gmail.com with THIS email address and inform us that you have forgotten your password. We will provide you with next steps.")
      return;
      /*
      const code = verificationCode();
      console.log("VERIFICATION CODE: ", code);
      const newDocRef = doc(db, "users", emailText)
      updateDoc(newDocRef, {
        code: code,
        codeExpiration: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
      })
      Linking.openURL(`mailto:${emailText}?subject=Reset Password&body=Your verification code is: ${code}`).catch(err => console.error('Failed to open email', err));
      /*
      const to = ['example@example.com']; // List of recipients
      email(to, {
        subject: 'Hello from React Native',
        body: 'This is a test email.',
      }).catch(console.error);
      */
    } else {
      let verified = false
      if (onRegister) {
        verified = await verifyRegistration()
        if (verified) {
          const encryptedPassword = encryptPassword(passwordText);
          const newDocRef = doc(db, "users", emailText)
          await setDoc(newDocRef, {
            email: emailText,
            name: nameText,
            password: encryptedPassword
          })
          navigation.navigate("ImportContacts", {uid: emailText, name: nameText})
        }
      } else {
        verified = await verifyLogin()
        if (verified) {
          navigation.navigate("HomeScreen", {name: verified[1], email: emailText, recommendNumber: verified[0]}) //const {name, email, recommendNumber} = route.params
        }
      }
    }
  }


  const changeToRegisterOrLogin = () => {
    let hadForgottenPassword = false;
    if (forgotPassword) {
      hadForgottenPassword = true;
      setForgotPassword(false);
    }
    setEmailText("");
    setPasswordText("");
    setNameText("");
    setConfirmPasswordText("");
    if (!onRegister && !hadForgottenPassword) {
      setOnRegister(true)
      setAlternateText("Already have an account? Log in!")
      setTitle("Register")
    } else {
      setOnRegister(false)
      setAlternateText("Don't have an account? Create One!")
      setTitle("Log in")
    }
  }

  const forgotPasswordHandler = () => {
    setForgotPassword(true);
    setEmailText("");
    setPasswordText("");
    setNameText("");
    setConfirmPasswordText("");
    setOnRegister(false);
    setAlternateText("Remembered password? Log in!");
    setTitle("Forgot Password");
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
        {!forgotPassword && (<TextInput value={passwordText} onChangeText={passwordHandler} style={styles.input} placeholder="Password" placeholderTextColor="gray" secureTextEntry={true}/>)}
        {onRegister && (
          <TextInput value={confirmPasswordText} onChangeText={confirmPasswordHandler} style={styles.input} placeholder="Confirm Password" placeholderTextColor="gray" secureTextEntry={true}/>
        )}
        {!onRegister && !forgotPassword && (
          <TouchableOpacity onPress={forgotPasswordHandler} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressHandler()}>
            <Text style={styles.buttonText}>{!forgotPassword ? title : "Reset Password"}</Text>
          </TouchableOpacity>
        </View>
     </View>
   </SafeAreaView>
 );
}

export default LoginScreen;
