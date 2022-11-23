import React from 'react';
import { useState, useEffect } from 'react';
import { createAuthUserWithEmailAndPassword, createUserFromAuthWithPassword, complitedUserAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import { onAuthStateChangedListner } from '../../utils/firebase/firebase.utils';
import { useAppDispatch } from '../../store/rootReducer';
import { setUser } from '../../store/authSlice';
// import Button from '../button/Button';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const [isSignUp, setIsSignUp] = useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useAppDispatch()


    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const { email, password, confirmPassword, displayName } = formFields;
        if (password !== confirmPassword) return alert("Password dosn't match");


        try {

            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            const { uid, accessToken, email } = await user
            await dispatch(setUser({ email: email, id: uid, token: accessToken }))
            const userDocRef = await createUserFromAuthWithPassword(user, { displayName })
            setFormFields(defaultFormFields); //очистка полей при успешной авторизцации
            const res = await complitedUserAuth(user)
            setIsSignUp(res)
            setUser(user)
        } catch (error) {

            if (error.code === 'auth/email-already-in-use') return alert('User alredy exists')
            console.log('this error:', error.message);
        }
    }

    // useEffect(() => {
    //     if (user) {
    //       const { uid, accessToken, email } = user
    //     dispatch(setUser({ email: email, id: uid, token: accessToken }))
    //     }
        
    // }, [user])
    return (
        <div className='sign-up-container'>
            <h2>Do not have an account?</h2>
            <span>SIGN UP with email and password</span>

            <form onSubmit={handleOnSubmit} >

                <FormInput label={'Display name'} type='text' required onChange={handleOnChange} name='displayName' value={displayName} />

                <FormInput label={'Email'} type='email' required onChange={handleOnChange} name='email' value={email} />

                <FormInput label={'Password'} type='password' required onChange={handleOnChange} name='password' value={password} />

                <FormInput label={'Confirm Password'} type='password' required onChange={handleOnChange} name='confirmPassword' value={confirmPassword} />

                <button onClick={(e) => handleOnSubmit(e)}>Sign Up</button>
            </form>
        </div >
    );
};

export default SignUpForm;