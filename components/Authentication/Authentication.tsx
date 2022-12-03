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
    const [usersFavData] = useCollectionDataOnce(query(collection(db, 'users', user?.uid || 'falseUser', 'fav')))
    const [usersBasketData] = useCollectionDataOnce(query(collection(db, 'users', user?.uid || 'falseUser' , 'basket')))
    const dispatch = useAppDispatch()


        //==========Merge user's 

    // console.log("f", usersFavData);
    // console.log("b", usersBasketData);
    // console.log("ff", fav);
    // console.log("bb", basket);

    useEffect(() => {
        if (!!user && user.uid !== 'falseUser') {
            const favQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'fav', id)
            fav.forEach((item) => (setDoc(favQUeryPath(item.id.toString()), item)));
    
            
            // let mergedFav = [...usersFavData as IProduct[], ...fav]
            console.log("i'm usecallback")
            // dispatch(addManyFav(mergedFav as IProduct[]))
        }
    }, [fav, usersFavData, user])



    useEffect(() => {
        if(!!user && user.uid !== 'falseUser') {
           const basketQUeryPath = (id: string) =>  doc(db, 'users', user.uid.toString(), 'basket', id) 
           basket.forEach((item) => (setDoc(basketQUeryPath(item.id.toString()), item)));
            
        }
    
    }, [usersBasketData, basket, user])

  
useEffect(() => {
    if (usersBasketData) {
        let result = [];
        let arrID = usersBasketData.map((item) => item.id)
        result = [...usersBasketData]
        basket.filter((item: IProduct) => {
            if (!(arrID.includes(item.id)))
            result.push(item) 
        })
       
        dispatch(addManyBasket(result as IProduct[])) 
     }
    } ,  
 [usersBasketData])

useEffect(() => {
    if (usersFavData) {
    
       let result = [];
        let arrID = usersFavData.map((item) => item.id)
        result = [...usersFavData]
        fav.filter((item: IProduct) => {
            if (!(arrID.includes(item.id)))
            result.push(item) 
        })
      
        dispatch(addManyFav(result as IProduct[]))
    
    }
   
}, [usersFavData])


    
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
