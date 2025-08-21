// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getReactNativePersistence } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
// Mrimmoyee
// const firebaseConfig = {
//   apiKey: "AIzaSyCetUl_q_WRAFhrYvIganiki6PDwRFk_TE",
//   authDomain: "growth-assist-25331.firebaseapp.com",
//   projectId: "growth-assist-25331",
//   storageBucket: "growth-assist-25331.firebasestorage.app",
//   messagingSenderId: "966823777412",
//   appId: "1:966823777412:web:bb2975a9ba3db327879ed1"
// };

//Bieva
// const firebaseConfig = {
//   apiKey: "AIzaSyD9kzNAWHBPXnpvdJqc3_XpP7qaI5W4HUw",
//   authDomain: "madproject-4c5b6.firebaseapp.com",
//   projectId: "madproject-4c5b6",
//   storageBucket: "madproject-4c5b6.firebasestorage.app",
//   messagingSenderId: "600270221715",
//   appId: "1:600270221715:web:3b3527ed4844e6a6ecf866"
// };
// Sadia
const firebaseConfig = {
  apiKey: "AIzaSyCPH0k4O-vdSMFy3-1t2JEmMR0dJ2U0L8g",
  authDomain: "growth-assist-67ce3.firebaseapp.com",
  projectId: "growth-assist-67ce3",
  storageBucket: "growth-assist-67ce3.firebasestorage.app",
  messagingSenderId: "179722295871",
  appId: "1:179722295871:web:d3de2838b38980fd8eb68a"
};
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  
});

export const db = getFirestore(app);
export const usersRef = collection(db, 'users'); 
export const roomRef = collection(db, 'rooms');