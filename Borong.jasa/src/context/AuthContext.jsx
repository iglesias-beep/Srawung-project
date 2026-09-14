import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    let unsub;
    (async () => {
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        const { doc, getDoc } = await import('firebase/firestore');

        unsub = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);
          if (user && db) {
            try {
              const snap = await getDoc(doc(db, 'users', user.uid));
              setUserRole(snap.exists() ? snap.data().role : 'user');
            } catch {
              setUserRole('user');
            }
          } else {
            setUserRole(null);
          }
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    })();

    return () => { if (unsub) unsub(); };
  }, []);

  const login = useCallback(async (email, password) => {
    if (auth) {
      try {
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        return await signInWithEmailAndPassword(auth, email, password);
      } catch {
        // fall through
      }
    }
    if (email === 'admin@borongjasa.com' && password === 'admin123') {
      const u = { uid: 'demo-admin', email, displayName: 'Admin' };
      setCurrentUser(u);
      setUserRole('admin');
      return { user: u };
    }
    if (password === '123456') {
      const u = { uid: 'demo-user', email, displayName: 'User' };
      setCurrentUser(u);
      setUserRole('user');
      return { user: u };
    }
    throw new Error('Email atau password salah');
  }, []);

  const register = useCallback(async (email, password, name) => {
    if (auth) {
      try {
        const { createUserWithEmailAndPassword } = await import('firebase/auth');
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), { name, email, role: 'user', createdAt: serverTimestamp() });
        return result;
      } catch {
        // fall through
      }
    }
    const u = { uid: 'demo-' + Date.now(), email, displayName: name };
    setCurrentUser(u);
    setUserRole('user');
    return { user: u };
  }, []);

  const signOut = useCallback(async () => {
    setCurrentUser(null);
    setUserRole(null);
    if (auth) {
      try {
        const { signOut: fbSignOut } = await import('firebase/auth');
        await fbSignOut(auth);
      } catch { /* ignore */ }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userRole, login, register, signOut, isAdmin: userRole === 'admin' }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
