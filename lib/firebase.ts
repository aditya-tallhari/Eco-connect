// firebase.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Define the Firebase config type (optional but good practice)
const firebaseConfig = {
  apiKey: "AIzaSyAwBhxewHPmypwELNXe__S8xRnf8nQEz58",
  authDomain: "ecoconnect-dc3bd.firebaseapp.com",
  databaseURL: "https://ecoconnect-dc3bd-default-rtdb.firebaseio.com",
  projectId: "ecoconnect-dc3bd",
  storageBucket: "ecoconnect-dc3bd.appspot.com",
  messagingSenderId: "634059554156",
  appId: "1:634059554156:web:ff0fee6f836c133c6b8749",
  measurementId: "G-CPG761Y581"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // SSR-safe
const db = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { db, auth, firestore, analytics };
