
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

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
