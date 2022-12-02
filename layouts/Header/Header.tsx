import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import {HeaderProps} from "./Header.props";
import cn from 'classnames';
import Link from "next/link";
import Logo from "../logo.svg";
import {Search} from "../../components";
import IconLocate from './locate.svg';
import IconFav from './fav.svg';
import IconCart from './cart.svg';
import IconAuth from './auth.svg';
import {db, getProductById, onAuthStateChangedListner, signOutUser} from '../../utils/firebase/firebase.utils';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import { IProduct } from '../../interface/entities/interface';
import { removeUser, setUser, setUserName } from '../../store/authSlice';
import { useFetchCollection } from '../../hooks/firestore-hooks';
import { clearBasket } from '../../store/basketSlice';
import { clearFav } from '../../store/favoritesSlice';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth } from '../../utils/firebase/firebase.utils';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, query } from 'firebase/firestore';
import { User } from 'firebase/auth';


export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
    const [user] = useAuthState(auth)
    const userID = (user as User)?.uid;
    // const [basket] = useCollectionData(query(collection(db, 'users', userID, 'basket')))

    const [searchResult, setSearchResult] = useState<IProduct[] | []>([]);
    const dispatch = useAppDispatch()
    const fetchUser = useFetchCollection('users')

    useEffect(() => {
        //TODO displayName 
        onAuthStateChangedListner((user: React.SetStateAction<any>) => { 
            setUser(user)
            //  console.log(user)
        })
    }, [])



    const userAuth = useAppSelector(state => state.user)

    useEffect(() => {
   const isExists = fetchUser?.find(user => user.email === userAuth.email)
   if (isExists) dispatch(setUserName(isExists.displayName))
}
,[user])

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={cn(styles.container, styles.black)}>
                <div className={styles.topHeader}>
                    <div className={styles.leftTopHeader}>
                        <ul>
                            <li><Link href={'/'}>О нас</Link></li>
                            <li><Link href={'/'}>Оплата и доставка</Link></li>
                            <li><Link href={'/'}>Новости</Link></li>
                            <li><Link href={'/'}>Контакты</Link></li>
                        </ul>
                    </div>
                    <div className={styles.rightTopHeader}>
                        <div className={cn(styles.lk, {
                            [styles.lkNoAuth]: !user,
                        })
                        }>
                            <IconAuth className={styles.iconAuth}/>
                            {user ? <div><span>Личный кабинет {userAuth.name}</span> | <Link href={'/'}
                                                                                      onClick={() => {
                                                                                        signOutUser()
                                                                                        dispatch(removeUser())
                                                                                        dispatch(clearBasket())
                                                                                        dispatch(clearFav())
                                                                                        }}>Выйти</Link>
                                </div>
                                : <div><Link href={'/auth'}><span>Войти</span></Link></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn(styles.container, styles.gray)}>
                <div className={styles.midHeader}>
                    <Link href={'http://localhost:3000/'}><Logo/></Link>
                    <Search setSearchResult={setSearchResult} />
                    <div className={styles.locate}>
                        <IconLocate/>
                        <span> Москва</span>
                    </div>
                    <div className={styles.contact}>
                        <Link className={styles.tel} href={'tel:8800000000'}>8-800-000-000</Link>
                        <Link className={styles.callBack} href={'/'}>Заказать звонок</Link>
                    </div>
                    <div className={styles.favorites}>
                        <Link href={user ? '/favorites' : '/auth'}><IconFav/></Link>
                    </div>
                    <div className={styles.cart}>
                        {/*//TODO Сделать вывод количества товара в корзине в иконку*/}
                        <IconCart/>
                        <div className={styles.cardData}>
                            <span className={styles.cartAmount}>0 р.</span>
                        
                         <Link className={styles.checkout} href={user ? '/cart' : '/auth'}>Оформить заказ</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn(styles.container, styles.black)}>
                <div className={styles.botHeader}>
                    <nav className={styles.menu}>
                        <ul>
                            <li><Link href={'/catalog'}>Каталог</Link></li>
                            <li><Link href={'/'}>Клинковое оружие</Link></li>
                            <li><Link href={'/'}>Сувенирные изделия</Link></li>
                            <li><Link href={'/'}>Фонари ARMYTEK</Link></li>
                            <li><Link href={'/'}>Сопутствующие товары</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};