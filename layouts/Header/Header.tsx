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
    const basket = useAppSelector(state => state.basket.basket);

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
let count = basket.reduce((sum: number, item: { quantity: number; price: number; }) => {
    return sum += item.quantity
}, 0);

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={cn(styles.container, styles.black)}>
                <div className={styles.topHeader}>
                    <div className={styles.leftTopHeader}>
                        <ul>
                            <li><Link href={'/about'}>О нас</Link></li>
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
                    <Link href={'/'}><Logo/></Link>
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
                        <Link href='/favorites'><IconFav/></Link>
                    </div>
                    <div className={styles.cart}>
                        {/*//TODO Сделать вывод количества товара в корзине в иконку*/}
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.13008 9.76882H29.7121C30.3649 9.76882 30.8427 10.3841 30.681 11.0165L28.7801 18.4506C28.4405 19.7785 27.2442 20.7074 25.8736 20.7074H9.02537M0 3.49957H4.65214C5.63535 3.49957 6.47274 4.21422 6.62728 5.18521L9.6467 24.1562C9.80125 25.1272 10.6386 25.8418 11.6218 25.8418H28.203" stroke="black" stroke-width="1.5"/>
                            <path d="M15.7689 32.2656C15.7689 33.5678 14.7584 34.5758 13.5695 34.5758C12.3807 34.5758 11.3701 33.5678 11.3701 32.2656C11.3701 30.9634 12.3807 29.9554 13.5695 29.9554C14.7584 29.9554 15.7689 30.9634 15.7689 32.2656Z" stroke="black" stroke-width="1.5"/>
                            <path d="M28.746 32.2656C28.746 33.5678 27.7354 34.5758 26.5466 34.5758C25.3577 34.5758 24.3472 33.5678 24.3472 32.2656C24.3472 30.9634 25.3577 29.9554 26.5466 29.9554C27.7354 29.9554 28.746 30.9634 28.746 32.2656Z" stroke="black" stroke-width="1.5"/>
                            <circle cx="30" cy="7" r="7" fill="#E8AA31"/>
                            <text x="27" y="10" fill="white" font-size="0.7em" font-family="Montserrat">
                             
                              {  count > 9 ? '9+' : count
                                } 
                            </text>
                        </svg>
                        <div className={styles.cardData}>
                            <span className={styles.cartAmount}>
                                {basket.reduce((sum: number, item: { quantity: number; price: number; }) => {
                                        return sum += item.quantity * item.price
                                }, 0)} р.</span>
                        
                         <Link className={styles.checkout} href={'/cart'}>Оформить заказ</Link>
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