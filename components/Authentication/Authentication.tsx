import {auth, createUserDocFromAuth, signInWithGooglePopup, signOutUser,} from '../../utils/firebase/firebase.utils.js';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm'

import {useAuth} from "../../hooks/userAuth";
import {Button} from "../Button/Button";
import {useRouter} from "next/router";

import styles from './Authentication.module.css';
import {Htag} from "../Htag/Htag";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getBasket} from "../../store/basketSlice";
import {addFav, getFavorites} from "../../store/favoritesSlice";

const Authentication = () => {
    const dispatch = useAppDispatch();

    const [userAuth] = useAuthState(auth)
    let {isAuth} = useAuth();
    let router = useRouter();
    // let basket = useAppSelector(getBasket);
    // let favorites = useAppSelector(getFavorites);
    // userAuth ? router.push('/') : '';
    //
    // useEffect(() => {
    //     dispatch(addFav(favorites))
    // }, [userAuth, basket, favorites])

    console.log(useAuth().name)
    return (
        <>
            <Htag tag={'h1'}>Авторизация</Htag>
            <div className={styles.container}>
                <div className={styles.block}>
                    <SignInForm/>
                </div>
                <div className={styles.block}>
                    <SignUpForm/>
                </div>
      
            </div>
        </>
    )
};

export default Authentication;
