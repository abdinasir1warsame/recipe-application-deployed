import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../assets/googleSignin/config';

const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  // Google Sign-In
  const googleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account', // Forces account selection dialog
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  // Email/Password Registration with Display Name
  const registerWithEmail = async (email, password, fullName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      setUser(userCredential.user);
    } catch (error) {
      console.error('Registration Error:', error.message);
      throw error;
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  };

  // Logout
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ Set loading to false when Firebase resolves user state
      console.log('User', currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        googleSignin,
        registerWithEmail,
        loginWithEmail,
        logOut,
        user,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const userAuth = () => {
  return useContext(authContext);
};
