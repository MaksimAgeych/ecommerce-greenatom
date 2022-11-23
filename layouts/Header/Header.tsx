import React, {use, useEffect, useState} from 'react';
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
import {useAuth} from '../../hooks/userAuth'
import { onAuthStateChangedListner } from '../../utils/firebase/firebase.utils';
import { useAppSelector } from '../../store/rootReducer';


export const Header = ({className, ...props}: HeaderProps): JSX.Element => {
    
   const [user, setUser] = useState(null)
   



    useEffect(() => {
        onAuthStateChangedListner(user => setUser(user))
        
        console.log(user)}, [])

   const userAuth = useAppSelector(state => state.user)

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
                        <Link className={styles.lk} href={'/auth'}>
                            <IconAuth className={styles.iconAuth}/>
                          {user? 
                        <span>
                       {userAuth.email}
                          </span>
                           : <span>
                            Личный Кабинет
                            </span>}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cn(styles.container, styles.gray)}>
                <div className={styles.midHeader}>
                    <Link href={'http://localhost:3000/'}><Logo/></Link>
                    <Search/>
                    <div className={styles.locate}>
                        <IconLocate/>
                        <span> Москва</span>
                    </div>
                    <div className={styles.contact}>
                        <Link className={styles.tel} href={'tel:8800000000'}>8-800-000-000</Link>
                        <Link className={styles.callBack} href={'/'}>Заказать звонок</Link>
                    </div>
                    <div className={styles.favorites}>
                        <Link href={'/favorites'}><IconFav/></Link>
                    </div>
                    <div className={styles.cart}>
                        <IconCart/>
                        <div className={styles.cardData}>
                            <span className={styles.cartAmount}>0 р.</span>
                            <Link className={styles.checkout} href={'/cart'}>Оформить заказ</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn(styles.container, styles.black)}>
                <div className={styles.botHeader}>
                    <nav className={styles.menu}>
                        <ul>
                            <li><Link href={'/'}>Каталог ножей</Link></li>
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