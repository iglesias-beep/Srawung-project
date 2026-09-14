"use client"

import { useState, useEffect, createContext, useContext } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, isFirebaseConfigured } from "@/lib/firebase"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  firebaseUser: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, nama: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser)
      if (fbUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", fbUser.uid))
          if (userDoc.exists()) {
            setUser({ uid: fbUser.uid, ...userDoc.data() } as User)
          }
        } catch {
          // Firestore not available
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum dikonfigurasi")
    const result = await signInWithEmailAndPassword(auth, email, password)
    const userDoc = await getDoc(doc(db, "users", result.user.uid))
    if (userDoc.exists()) {
      setUser({ uid: result.user.uid, ...userDoc.data() } as User)
    }
  }

  const signUp = async (email: string, password: string, nama: string) => {
    if (!isFirebaseConfigured) throw new Error("Firebase belum dikonfigurasi")
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, "users", result.user.uid), {
      nama,
      email,
      role: "user",
      alamat: "",
      no_hp: "",
      dibuat_pada: serverTimestamp(),
    })
    setUser({
      uid: result.user.uid,
      nama,
      email,
      role: "user",
      dibuat_pada: new Date().toISOString(),
    })
  }

  const signOut = async () => {
    if (!isFirebaseConfigured) return
    await firebaseSignOut(auth)
    setUser(null)
    setFirebaseUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, firebaseUser, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
