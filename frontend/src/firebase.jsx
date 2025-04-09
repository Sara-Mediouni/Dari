// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJvcibpnTZ0iQ0ZWDd975bzI_9T0N-DUM",
  authDomain: "dari-28cfd.firebaseapp.com",
  projectId: "dari-28cfd",
  storageBucket: "dari-28cfd.firebasestorage.app",
  messagingSenderId: "328283342635",
  appId: "1:328283342635:web:821b44877c55ffc73de76e",
  measurementId: "G-8CS7M1RS9W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialiser Firestore et Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Fonction d'inscription
// Fonction d'inscription

  
  
  export { auth,db };