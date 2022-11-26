import { useState, useEffect, } from 'react';
import { createUserDocFromAuth, signInWithGooglePopup, signIn } from '../../utils/firebase/firebase.utils';
import FormInput from '../FormInput/FormInput';
import { setUser } from '../../store/authSlice'
import { useAppDispatch } from "../../hooks/redux-hooks";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [currentUser, setCurrentUser] = useState < User | null > (null);
    const { email, password, } = formFields;
    const dispatch = useAppDispatch();

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        setCurrentUser(user);
        await createUserDocFromAuth(user)

        const { email, refreshToken, uid, displayName } = user;
        dispatch(setUser({
            email,
            id: uid,
            token: refreshToken,
            name: displayName,
        }))

    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        const { email, password } = formFields;

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                    name: user.displayName
                }))

            }).catch(console.error)


        return (
            <div className='sign-up-container'>
                <h2>Авторизация</h2>
                <span> Введите Email и пароль</span>

                <form onSubmit={handleOnSubmit}>

                    <FormInput label={'Email'} type='email' required onChange={handleOnChange} name='email' value={email} />


                    <FormInput label={'Password'} type='password' required onChange={handleOnChange} name='password'
                        value={password} />

                    <button onClick={(event) => handleOnSubmit(event)}>
                        Sign In
                    </button>
                    <button onClick={() => signInWithGoogle()}>
                        Sign In
                    </button>

                </form>
            </div>
        );
    }
};

export default SignInForm;