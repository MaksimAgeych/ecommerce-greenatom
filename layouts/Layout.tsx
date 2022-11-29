import React, {FunctionComponent, useRef, useState} from 'react';
import styles from './Layout.module.css';
import {LayoutProps} from "./Layout.props";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from "../context/app.context";
import {Provider} from 'react-redux';
import {store} from '../store/rootReducer';
import {collection, query} from "firebase/firestore";
import {auth, db} from "../utils/firebase/firebase.utils";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

export const Layout = ({children}: LayoutProps): JSX.Element => {
    const q = query(collection(db, 'products',))
    const [fetchProd, loadingProd, errorProd] = useCollectionData(q)
    const [user, loadingUser, errorUser] = useAuthState(auth);

    if (loadingProd || loadingUser) {
        return (
            <>
            Загрузка
            </>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <Header className={styles.header}/>
                <main className={styles.body} tabIndex={0} role={"main"}>
                    {children}
                </main>
                <Footer className={styles.footer}/>
            </div>
        );
    }

};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {


    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Provider store={store}>
                <AppContextProvider>
                    <Layout>
                        <Component {...props}/>
                    </Layout>
                </AppContextProvider>
            </Provider>
        );


    };
};