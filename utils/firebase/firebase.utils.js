import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc, //document
    getDoc, //get data from doc
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAieju392UH-kl2CsYkY50WslOjxs2feBQ",
    authDomain: "crwn-shop-bf775.firebaseapp.com",
    projectId: "crwn-shop-bf775",
    storageBucket: "crwn-shop-bf775.appspot.com",
    messagingSenderId: "436520126514",
    appId: "1:436520126514:web:e05cd6b7856e1249e2542b",
    measurementId: "G-JY869MF3H7",
};
const express = require('express');
const cors = require('cors');


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid) //обращение к документу с именем в колл-ии users
    const userSnapShot = await getDoc(userDocRef); // получение данных по конкретному юзеру
    // console.log(userSnapShot)

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth; //userSnapShot = данные конкретного usera, проверем существует ли такой ser
        const createdAt = new Date() //если usera не существует в базе, созадем дату и имя и почту

        try { //cсоздаем документ с юзером
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch (error) {
            console.log('error create user: ', error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const createUserFromAuthWithPassword = async (userAuth, additional) => {

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email, password } = userAuth;
        const createdAt = new Date()

        try { //cсоздаем документ с юзером
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additional
            })
        } catch (error) {
            console.log('error create user: ', error.message)
        }
    }

    return userDocRef


}

export const complitedUserAuth = async (user) => {
    const userDocRef = doc(db, 'users', user.uid)

    const userSnapShot = await getDoc(userDocRef);
    // получение данных по конкретному юзеру
    if (userSnapShot.exists()) {
        
        return alert('User has created~~')
    }

}

export const signIn = async (email, password) => {

    if (!(email && password)) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);
//следит за изменениями авторизации юзера
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback); 

const expiresIn = 60 * 60 * 24 * 5 * 1000;

 export const createCookie = express().post('/sessionLogin', (req, res) => {
    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    // Guard against CSRF attacks.
    if (csrfToken !== req.cookies.csrfToken) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    getAuth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          // Set cookie policy for session cookie.
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };
          res.cookie('session', sessionCookie, options);
          res.end(JSON.stringify({ status: 'success' }));
        },
        (error) => {
          res.status(401).send('UNAUTHORIZED REQUEST!');
        }
      );
  });
