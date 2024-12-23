/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    // const [inPrivateRoute,setInPrivateRoute] = useState(false)
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
            console.log('CurrentUser-->', currentUser)
            // generate and delete token
            if (currentUser?.email) {
                // generate and set the token to the browser cookie by sending post request
                axios.post(`${import.meta.env.VITE_BASE_URI}/jwt`, { email: currentUser?.email }, { withCredentials: true })
                    .then(res => {
                        console.log("token creation successful.",res.data);
                    })
            }
            else {
                // deleting token from browser cookie by sending get request
                axios.get(`${import.meta.env.VITE_BASE_URI}/logout`, { withCredentials: true})
            }
            // if (currentUser) {
            //     setUser(currentUser);
            // } else {
            //     setUser(null);
            // }
            setUser(currentUser);
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
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;