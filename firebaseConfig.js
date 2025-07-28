// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getReactNativePersistence } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCetUl_q_WRAFhrYvIganiki6PDwRFk_TE",
//   authDomain: "growth-assist-25331.firebaseapp.com",
//   projectId: "growth-assist-25331",
//   storageBucket: "growth-assist-25331.firebasestorage.app",
//   messagingSenderId: "966823777412",
//   appId: "1:966823777412:web:bb2975a9ba3db327879ed1"
// };
const firebaseConfig = {
  apiKey: "AIzaSyD9kzNAWHBPXnpvdJqc3_XpP7qaI5W4HUw",
  authDomain: "madproject-4c5b6.firebaseapp.com",
  projectId: "madproject-4c5b6",
  storageBucket: "madproject-4c5b6.firebasestorage.app",
  messagingSenderId: "600270221715",
  appId: "1:600270221715:web:3b3527ed4844e6a6ecf866"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  //persistence: getReactNativePersistence(AsyncStorage), // Use the appropriate persistence for your app
});

export const db = getFirestore(app);
export const usersRef = collection(db, 'users'); // Collection reference for users
export const roomRef = collection(db, 'rooms');