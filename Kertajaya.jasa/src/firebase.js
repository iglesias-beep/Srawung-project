import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeNVhTO2FnvTXF9lF4WTlQBnfEFPF-Y-4",
  authDomain: "kertajaya-2ecd6.firebaseapp.com",
  projectId: "kertajaya-2ecd6",
  storageBucket: "kertajaya-2ecd6.firebasestorage.app",
  messagingSenderId: "923312142796",
  appId: "1:923312142796:web:41c5154912fa43dcd88569",
  measurementId: "G-RQQGXVRPKJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { serverTimestamp };
