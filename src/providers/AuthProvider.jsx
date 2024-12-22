/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [inPrivateRoute,setInPrivateRoute] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // login with email and password
    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    // update user profile
    const updateUserProfile = (updateInfo) => {
        return updateProfile(auth.currentUser, updateInfo)
    }
    
    // create user register with google
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // handle logout
    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });


        return () => {
            unSubscribe;
        }
    }, [])


    const authInfo = {
        user,
        createUser,
        googleLogin,
        userLogin,
        updateUserProfile,
        setUser,
        logout,
        setLoading,
        loading,
        inPrivateRoute,
        setInPrivateRoute,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;