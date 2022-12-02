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
import { ColorRing } from 'react-loader-spinner';

export const Layout = ({children}: LayoutProps): JSX.Element => {
    const q = query(collection(db, 'products',))
    const [fetchProd, loadingProd, errorProd] = useCollectionData(q)
    const [user, loadingUser, errorUser] = useAuthState(auth);

    if (loadingProd || loadingUser) {
        return (
            <>
           <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
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
                {/* <AppContextProvider> */}
                    <Layout>
                        <Component {...props}/>
                    </Layout>
                {/* </AppContextProvider> */}
            </Provider>
        );


    };
};