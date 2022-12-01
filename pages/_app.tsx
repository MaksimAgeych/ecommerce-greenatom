import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux';
import {store, persister} from '../store/rootReducer';
import {PersistGate} from 'redux-persist/integration/react';
import Head from "next/head";
import { AppContextProvider } from '../context/app.context';

export default function App({Component, pageProps}: AppProps): JSX.Element {

    return <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
        {/* <AppContextProvider> */}
               <Head>
                <title>Магазин Ножей</title>
            </Head>
            <Component {...pageProps} />
        {/* </AppContextProvider> */}
        </PersistGate>
    </Provider>
}