import React from 'react';
import {useState, useEffect} from 'react';
import {
    createAuthUserWithEmailAndPassword,
    createUserFromAuthWithPassword,
    complitedUserAuth
} from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput';
import {setUser} from '../../store/authSlice';
import {useAppDispatch} from "../../hooks/redux-hooks";
import {getAuth, updateProfile} from "firebase/auth";
import styles from './SignUpForm.module.css';
import {Htag} from "../Htag/Htag";
import {Button} from "../Button/Button";
import { useRouter } from 'next/router';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const router = useRouter()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useAppDispatch();

    const handleOnChange = (event: any) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleOnSubmit = async (event: any) => {
        event.preventDefault();

        const {email, password, confirmPassword, displayName} = formFields;
        if (password !== confirmPassword) return alert("Пароли не совпадают");

        createAuthUserWithEmailAndPassword(email, password)
            .then(({user}: any) => {
                    const {uid, accessToken, email} = user;

                    createUserFromAuthWithPassword(user)
                    dispatch(setUser({email: email, id: uid, token: accessToken, name: displayName}))
                    complitedUserAuth(user); 
                }
               
            ).catch(console.error)


    }

    return (
        <div className='sign-up-container'>
            <Htag tag={'h3'}>Нет аккаунта?</Htag>
            <span>Создайте аккаунт</span>

            <form onSubmit={handleOnSubmit}>

                <FormInput label={'Имя'} type='text' required onChange={handleOnChange} name='displayName'
                           value={displayName}/>

                <FormInput label={'Email'} type='email' required onChange={handleOnChange} name='email' value={email}/>

                <FormInput label={'Пароль'} type='password' required onChange={handleOnChange} name='password'
                           value={password}/>

                <FormInput label={'Пароль ещё раз'} type='password' required onChange={handleOnChange}
                           name='confirmPassword' value={confirmPassword}/>

                <Button appearance={'primary'} onClick={(event) => handleOnSubmit(event)}>Зарегистрироваться</Button>
            </form>
        </div>
    );
};

export default SignUpForm;