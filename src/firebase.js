// src/firebase.js
// Konfigurasi Firebase & Inisialisasi Firestore Database
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_PL2bExAZIBaRyUk1z-0VISLFYRTmXrE",
  authDomain: "synora-web.firebaseapp.com",
  projectId: "synora-web",
  storageBucket: "synora-web.firebasestorage.app",
  messagingSenderId: "486464007298",
  appId: "1:486464007298:web:b228ea87cc7dc84847589b",
  measurementId: "G-RBY5YM1XP5"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore Database
export const db = getFirestore(app);

export default app;
