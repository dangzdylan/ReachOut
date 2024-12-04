// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from "firebase/auth"

//Import firebase
import { getFirestore } from "firebase/firestore";


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
const auth = getAuth(app)
const db = getFirestore(app);
const analytics = getAnalytics(app);


export { auth, db };

 /*

 FOR ADDING
be sure to include
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

then you can:
    
  useEffect(async() => {
    const docRef = await addDoc(collection(db, "usersandcontacts"), {
      username: "teeeeeheeee", // The string field "username"
    });
  }, [])

  */