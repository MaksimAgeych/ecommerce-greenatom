import {auth, createUserDocFromAuth, db, signInWithGooglePopup, signOutUser,} from '../../utils/firebase/firebase.utils.js';
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
import { collection, doc, query, setDoc } from 'firebase/firestore';
// import { converter } from '../../pages/catalog/[id].jsx';


const Authentication = () => {
  
        const [user, loadUser, errorUser] = useAuthState(auth)
        const basket = useAppSelector(getBasket)
        const fav = useAppSelector(getFavorites)

        useEffect(() => {

  if (user) {
    const favQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'fav', id)
    const basketQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'basket', id)
    basket.forEach((item) => {
        setDoc(basketQUeryPath(item.id.toString()), item)
    })
        }

        }, [user])

      

    
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
