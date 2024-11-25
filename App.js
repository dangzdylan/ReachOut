import { NavigationContainer } from '@react-navigation/native';
import { AppState } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbJ5ulaxNBPnaorIlxvhkuNqVnlZfSw50",
  authDomain: "reachout-c67a2.firebaseapp.com",
  projectId: "reachout-c67a2",
  storageBucket: "reachout-c67a2.firebasestorage.app",
  messagingSenderId: "863938449545",
  appId: "1:863938449545:web:27b4f24469a86fb8c1f658",
  measurementId: "G-6L0E4JLLV1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator/>
    </GestureHandlerRootView>
  );
}