import React, {FunctionComponent} from 'react';
import styles from './Layout.module.css';
import {LayoutProps} from "./Layout.props";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from "../context/app.context";
import {Provider} from 'react-redux';
import {store} from '../store/rootReducer';
import {Sidebar} from "./Sidebar/Sidebar";
import {collection, getDocs, query} from "firebase/firestore";
import {auth,db, getCollectionByName} from "../utils/firebase/firebase.utils";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {addProducts} from "../store/productsSlice";
import {IProduct} from "../interface/entities/interface";
import internal from "stream";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;

export const Layout = ({children}: LayoutProps): JSX.Element => {


    interface IProductDataProps {
        fetchProd: IProduct[];
        loadingProd: boolean;
        errorProd:  FirestoreError | undefined;
    }
    const q = query(collection(db, 'products',))
    // @ts-ignore
    const [fetchProd, loadingProd, errorProd] = useCollectionData<IProductDataProps>(q)
    const [user, loadingUser, errorUser] = useAuthState(auth);
    const dispatch = useAppDispatch();
    let products = useAppSelector(state => state.products.products);
    if (fetchProd) {
        // @ts-ignore
        dispatch(addProducts(fetchProd));
    };

    if (loadingProd || loadingUser) {
        return (
            <>
                Загрузка
            </>
        )
    } else {
        return (
            <div className={styles.wrapperLeftSidebar}>
                <Header className={styles.header}/>
                <Sidebar className={styles.sidebar}/>
                <main className={styles.body} tabIndex={0} role={"main"}>
                    {children}
                </main>
                <Footer className={styles.footer}/>
            </div>
        );
    }
};

export const withLayout_leftSidebar = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
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