import React from "react";
// import { getRedirectResult } from 'firebase/auth';
import { signInWithGooglePopup, createUserDocFromAuth, } from '../../utils/firebase/firebase.utils.js';
import SignUpForm from "../../Components/sign-up-form/SignUpForm.jsx";
import SignInForm from "../../Components/sign-in-form copy/SignInForm.jsx";
import '../autentication/auth.styles.scss';

const Authentication = () => {


    const handleGoogleSignIn = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);


    }

    return (<div className="auth-container">

        <SignInForm />
        <SignUpForm />
    </div>
    )
};

export default Authentication;
