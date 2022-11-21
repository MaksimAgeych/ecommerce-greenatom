import Head from 'next/head'
import Image from 'next/image'
import { Provider } from 'react-redux'
import MainLayOut from '../layout/MainLayOut/MainLayOut'
import { store } from '../store/rootReducer'
import styles from '../styles/Home.module.css'
import App from './_app'

export default function Home() {
  return (
    <Provider store={store}>
      <MainLayOut>
        <App />
      </MainLayOut>
    </Provider>
  )
}
