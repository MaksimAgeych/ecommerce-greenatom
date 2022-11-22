import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import { Provider } from 'react-redux';
import { store } from '../store/rootReducer';

export default function App({Component, pageProps}: AppProps): JSX.Element {
    return <Provider store={store}>
        <Head>
            <title>Магазин Ножей</title>
            <meta name="description" content="Магазин Ножей"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"/>

        </Head>
        <Component {...pageProps} />
    </Provider>
        ;
}
