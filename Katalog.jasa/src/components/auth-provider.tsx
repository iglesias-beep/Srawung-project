"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";

export type UserRole = "user" | "admin";

export interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  authError: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      userData: null,
      loading: true,
      authError: "",
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
    };
  }
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setAuthError("Firebase belum dikonfigurasi");
      setLoading(false);
      return;
    }
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const snap = await getDoc(doc(db, "users", firebaseUser.uid));
          if (snap.exists()) {
            setUserData(snap.data() as UserData);
          } else {
            setAuthError("Document user tidak ditemukan di Firestore. UID: " + firebaseUser.uid);
            const fallbackData: UserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || "",
              name: firebaseUser.displayName || "User",
              role: "user",
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", firebaseUser.uid), fallbackData);
            setUserData(fallbackData);
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          setAuthError("Gagal baca Firestore: " + msg);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function signIn(email: string, password: string) {
    const auth = getFirebaseAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signUp(email: string, password: string, name: string) {
    const auth = getFirebaseAuth();
    const db = getFirebaseDb();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const userDataDoc: UserData = {
      uid: cred.user.uid,
      email,
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", cred.user.uid), userDataDoc);
    setUserData(userDataDoc);
  }

  async function signOut() {
    const auth = getFirebaseAuth();
    await firebaseSignOut(auth);
    setUser(null);
    setUserData(null);
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, authError, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
