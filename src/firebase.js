import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFxA0Wzx9YPKhcKEnpnMXtmLPpbj3evo4",
  authDomain: "hrms-23aed.firebaseapp.com",
  projectId: "hrms-23aed",
  storageBucket: "hrms-23aed.firebasestorage.app",
  messagingSenderId: "537961925062",
  appId: "1:537961925062:web:4de726849e02cf94770ac7",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
