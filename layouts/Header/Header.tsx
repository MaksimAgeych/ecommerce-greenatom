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
import {onAuthStateChangedListner, signOutUser} from '../../utils/firebase/firebase.utils';
import {useAppSelector} from "../../hooks/redux-hooks";


export const Header = ({className, ...props}: HeaderProps): JSX.Element => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        //TODO displayName 
        //
        onAuthStateChangedListner((user: React.SetStateAction<any>) => {
            // console.log(user.displayName)
            // console.log(user)
            setUser(user)})
        // onAuthStateChangedListner((user: React.SetStateAction<null>) => setUser(user))
        // .then((use}) => console.log(user.displayName))
        console.log(name)
        console.log(user)
    }, [])

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
                        <div className={cn(styles.lk, {
                            [styles.lkNoAuth]: !user,
                        })
                        }>
                            <IconAuth className={styles.iconAuth}/>
                            {user ? <div><span>Личный кабинет {userAuth.email}</span> | <Link href={'/'}
                                                                                      onClick={() => signOutUser()}>Выйти</Link>
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