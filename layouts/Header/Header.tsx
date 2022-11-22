import React from 'react';
import styles from './Header.module.css';
import {HeaderProps} from "./Header.props";
import cn from 'classnames';
import Link from "next/link";
import Logo from "../logo.svg";
import {Search} from "../../components";


export const Header = ({className, ...props}: HeaderProps): JSX.Element => {

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.topHeader}>
                <div>
                    <div className={styles.leftTopHeader}>
                        <ul>
                            <li><Link href={'/'}>О нас</Link></li>
                            <li><Link href={'/'}>Оплата и доставка</Link></li>
                            <li><Link href={'/'}>Новости</Link></li>
                            <li><Link href={'/'}>Контакты</Link></li>
                        </ul>
                    </div>
                    <div className={styles.rightTopHeader}>
                        <Link href={'/'}>Личный Кабинет</Link>
                    </div>
                </div>
            </div>
            <div className={styles.midHeader}>
                <Logo />
                <Search />
            </div>
            <div className={styles.botHeader}>bot</div>
        </header>
    );
};