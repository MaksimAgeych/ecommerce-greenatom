import React from 'react';
import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {
    return (
        <nav className={styles.menu} role={"navigation"}>
            Меню
        </nav>
    );
};