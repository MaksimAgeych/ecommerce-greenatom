import React from 'react';
import {useState, useEffect} from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserFromAuthWithPassword,
    complitedUserAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/FormInput';
import {setUser} from '../../store/authSlice';
import {useAppDispatch} from "../../hooks/redux-hooks";
import {getAuth, updateProfile} from "firebase/auth";
// import Button from '../button/Button';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useAppDispatch();

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const {email, password, confirmPassword, displayName} = formFields;
        if (password !== confirmPassword) return alert("Пароли не совпадают");

        createAuthUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                    const {uid, accessToken, email} = user;

                    const auth = getAuth();
                    //Добавление имени
                    updateProfile(auth.currentUser, {
                        displayName: displayName
                    }).then(() => {
                        console.log('Имя обновлено')
                    }).catch((error) => {
                        console.error('Имя не обновлено: ' + error)
                    });

                    dispatch(setUser({email: email, id: uid, token: accessToken, name: displayName}))
                    complitedUserAuth(user);

                }
            ).catch(console.error)


    }

    return (
        <div className='sign-up-container'>
            <h2>Do not have an account?</h2>
            <span>SIGN UP with email and password</span>

            <form onSubmit={handleOnSubmit}>

                <FormInput label={'Display name'} type='text' required onChange={handleOnChange} name='displayName'
                           value={displayName}/>

                <FormInput label={'Email'} type='email' required onChange={handleOnChange} name='email' value={email}/>

                <FormInput label={'Password'} type='password' required onChange={handleOnChange} name='password'
                           value={password}/>

                <FormInput label={'Confirm Password'} type='password' required onChange={handleOnChange}
                           name='confirmPassword' value={confirmPassword}/>

                <button onClick={(e) => handleOnSubmit(e)}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;