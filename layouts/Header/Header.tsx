import React from 'react';
import styles from './Header.module.css';
import {HeaderProps} from "./Header.props";
import cn from 'classnames';

export const Header = ({className, ...props}: HeaderProps): JSX.Element => {

    return (
        <header className={cn(className, styles.header)} {...props}>
            <div className={styles.topHeader}>top</div>
            <div className={styles.midHeader}>mid</div>
            <div className={styles.botHeader}>bot</div>
        </header>
    );
};