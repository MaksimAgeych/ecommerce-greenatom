import {auth, createUserDocFromAuth, db, getCollectionByName, signInWithGooglePopup, signOutUser,} from '../../utils/firebase/firebase.utils.js';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm'

import {useAuth} from "../../hooks/userAuth";
import {Button} from "../Button/Button";
import {useRouter} from "next/router";

import styles from './Authentication.module.css';
import {Htag} from "../Htag/Htag";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {addManyBasket, getBasket} from "../../store/basketSlice";
import {addFav, addManyFav, getFavorites} from "../../store/favoritesSlice";
import { collection, doc, query, QueryDocumentSnapshot, setDoc } from 'firebase/firestore';
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
        const [usersFavData] = useCollectionDataOnce(collection(db, 'users', currentUserID, 'fav').withConverter(converter))
        const [usersBasketData] = useCollectionDataOnce(collection(db, 'users', currentUserID, 'basket').withConverter(converter))
        const dispatch = useAppDispatch()


        //==========Merge user's 

     
useEffect(() => {
if (!!user) {
    const favQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'fav', id)
    const basketQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'basket', id)

    basket.forEach((item) => {
        setDoc(basketQUeryPath(item.id.toString()), item)
    })

    setCurrentUserID(user.uid.toString());
    if (usersBasketData && currentUserID !== 'falseUser') {
        let mergedBasket = new Set([...usersBasketData, ...basket])
        dispatch(addManyBasket(Array.from(mergedBasket)))
    }
} else {
    setCurrentUserID('falseUser')
}

})
  
    
    
  
    // const {usersFavData} = await getCollectionByName(`users/${user.uid}/fav`);
    // const {userBasektData} = await getCollectionByName(`users/${user.uid}/basket`)

  
      

        

    
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
