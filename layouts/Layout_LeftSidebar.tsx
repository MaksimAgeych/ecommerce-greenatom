import React, {FunctionComponent, useEffect} from 'react';
import styles from './Layout.module.css';
import {LayoutProps} from "./Layout.props";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from "../context/app.context";
import {Provider} from 'react-redux';
import {store} from '../store/rootReducer';
import {Sidebar} from "./Sidebar/Sidebar";
import {collection, DocumentData, getDocs, query} from "firebase/firestore";
import {auth,db, getCollectionByName} from "../utils/firebase/firebase.utils";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {addProducts} from "../store/productsSlice";
import {IProduct} from "../interface/entities/interface";
import internal from "stream";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;
import {converter} from "../pages/catalog/[id]";
import { ColorRing } from 'react-loader-spinner';

export const Layout = ({children}: LayoutProps): JSX.Element => {

    interface IProductDataProps {
        fetchProd: IProduct[];
        loadingProd: boolean;
        errorProd:  FirestoreError | undefined;
    }
    const q = query(collection(db, 'products').withConverter(converter))

    const [fetchProd, loadingProd, errorProd] = useCollectionData(q)
    const [user, loadingUser, errorUser] = useAuthState(auth);
    const dispatch = useAppDispatch();
    let products = useAppSelector(state => state.products.products);

    useEffect(() => {
        if (fetchProd) {
            dispatch(addProducts(fetchProd));
        }
    }, [fetchProd])


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

    // return (
    //     <div className={styles.wrapperLeftSidebar}>
    //         <Header className={styles.header}/>
    //         <Sidebar className={styles.sidebar}/>
    //         <main className={styles.body} tabIndex={0} role={"main"}>
    //             {children}
    //         </main>
    //         <Footer className={styles.footer}/>
    //     </div>
    // );
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