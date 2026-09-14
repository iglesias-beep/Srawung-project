// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIA-qkNpOO5RucewoTsPuYr57w1XeoOwE",
  authDomain: "proyek-jasa-60c0a.firebaseapp.com",
  projectId: "proyek-jasa-60c0a",
  storageBucket: "proyek-jasa-60c0a.firebasestorage.app",
  messagingSenderId: "697623724339",
  appId: "1:697623724339:web:777d1d44db82443c957e46",
  measurementId: "G-WVPV56FQ2V"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
