import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  signInAnonymously
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

type UserRole = 'guest' | 'user' | null;

interface AuthContextType {
  role: UserRole;
  user: User | null;
  loading: boolean;
  loginGoogle: () => Promise<void>;
  loginGuest: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setRole(currentUser.isAnonymous ? 'guest' : 'user');
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    try {
      // Mock login fallback if Firebase is not yet configured
      if (auth.app.options.apiKey === "REPLACE_WITH_YOUR_KEY") {
        console.warn("Using mock Google login because Firebase config is missing.");
        setRole('user');
        // @ts-ignore
        setUser({ displayName: 'Mock User', email: 'mock@example.com' });
        return;
      }
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
       console.error("Google login failed", error);
    }
  };

  const loginGuest = async () => {
    try {
      // Mock login fallback if Firebase is not yet configured
      if (auth.app.options.apiKey === "REPLACE_WITH_YOUR_KEY") {
        console.warn("Using mock Guest login because Firebase config is missing.");
        setRole('guest');
        // @ts-ignore
        setUser({ isAnonymous: true });
        return;
      }
      await signInAnonymously(auth);
    } catch (error) {
       console.error("Guest login failed", error);
    }
  };

  const logout = async () => {
    try {
      if (auth.app.options.apiKey === "REPLACE_WITH_YOUR_KEY") {
         setRole(null);
         setUser(null);
         return;
      }
      await signOut(auth);
      setRole(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ role, user, loading, loginGoogle, loginGuest, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
