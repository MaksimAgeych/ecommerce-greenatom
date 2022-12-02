import {auth, createUserDocFromAuth, db, getCollectionByName, signInWithGooglePopup, signOutUser,} from '../../utils/firebase/firebase.utils.js';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm'

import {useAuth} from "../../hooks/userAuth";
import {Button} from "../Button/Button";
import {useRouter} from "next/router";

import styles from './Authentication.module.css';
import {Htag} from "../Htag/Htag";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {addManyBasket, getBasket} from "../../store/basketSlice";
import {addFav, addManyFav, getFavorites} from "../../store/favoritesSlice";
import { collection, doc, getDocs, query, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
import { useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { IProduct } from '../../interface/entities/interface.js';


const Authentication = () => {
    

    const converter = {
        toFirestore: (data: IProduct) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) =>
            snap.data() as IProduct
    }
    
  
    const [user, loadUser, errorUser] = useAuthState(auth)
    const basket = useAppSelector(getBasket)
    const fav = useAppSelector(getFavorites)

    const [currentUserID, setCurrentUserID] = useState<string>('falseUser') 
    const [usersFavData, loading, error] = useCollectionDataOnce(query(collection(db, 'users', user?.uid || 'falseUser', 'fav')))
    const [usersBasketData] = useCollectionDataOnce(query(collection(db, 'users', user?.uid || 'falseUser' , 'basket')))
    const dispatch = useAppDispatch()


        //==========Merge user's 

    console.log("f", usersFavData);
    console.log("b", usersBasketData);
    console.log("ff", fav);
    console.log("bb", basket);

    useCallback(() => {
        if (!!user && user.uid !== 'falseUser') {
            const favQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'fav', id)
            fav.forEach((item) => (setDoc(favQUeryPath(item.id.toString()), item)));
    
            
            let mergedFav = [...usersFavData, ...fav]
            console.log("mf", mergedFav)
            dispatch(addManyFav(mergedFav as IProduct[]))
        }
    }, [fav, basket])

    useCallback(() => {
        if(!!user && user.uid !== 'falseUser') {
           const basketQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'basket', id) 
           basket.forEach((item) => (setDoc(basketQUeryPath(item.id.toString()), item)));
            
            let mergedBasket = [...usersBasketData, ...basket]
            console.log("mb", mergedBasket)
            dispatch(addManyBasket(mergedBasket as IProduct[]))
        }
    
    }, [basket, fav])
    
        

    
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
