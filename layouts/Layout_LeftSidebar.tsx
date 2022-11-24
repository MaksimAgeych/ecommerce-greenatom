import React, {FunctionComponent} from 'react';
import styles from './Layout.module.css';
import {LayoutProps} from "./Layout.props";
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {AppContextProvider, IAppContext} from "../context/app.context";
import {Provider} from 'react-redux';
import {store} from '../store/rootReducer';
import {Sidebar} from "./Sidebar/Sidebar";

export const Layout = ({children}: LayoutProps): JSX.Element => {

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