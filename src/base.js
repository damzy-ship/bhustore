
import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCsOxRj-kM8GBYXjSjNJR0P1Gj65BOMMdw",
  authDomain: "bhustore-49cb1.firebaseapp.com",
  projectId: "bhustore-49cb1",
  storageBucket: "bhustore-49cb1.appspot.com",
  messagingSenderId: "1048629434101",
  appId: "1:1048629434101:web:63b1d34bc29999806757bc",
  measurementId: "G-Z1YEQHGM59"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
