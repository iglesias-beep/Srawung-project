import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const ADMIN_EMAILS = ["ranggaliga90@gmail.com"];

const AuthContext = createContext(null);
export function errorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email sudah terdaftar. Silakan masuk langsung.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Kata sandi minimal 6 karakter.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau kata sandi salah.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Coba lagi beberapa saat.";
    case "auth/network-request-failed":
      return "Koneksi bermasalah. Periksa internet Anda.";
    default:
      return "Terjadi kesalahan. Coba lagi.";
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const register = useCallback(async (nama, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: nama });
    return cred.user;
  }, []);

  const login = useCallback(
    (email, password) => signInWithEmailAndPassword(auth, email, password),
    []
  );

  const logout = useCallback(() => signOut(auth), []);

  const isAdmin = useMemo(
    () => !!user && ADMIN_EMAILS.includes((user.email || "").toLowerCase()),
    [user]
  );

  const value = useMemo(
    () => ({ user, loading, isAdmin, register, login, logout }),
    [user, loading, isAdmin, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}
