import type { NextPage } from 'next'
import MainLayOut from '../layout/MainLayOut/MainLayOut'
import SignInForm from './sign-in-form copy/SignInForm'


// import Counter from '../features/counter/Counter'
// import styles from '../styles/Home.module.css'
import Home from './HomePage/home'

const IndexPage: NextPage = () => {
  return (
    <MainLayOut>
       <h1>Hello</h1>
       <SignInForm />
    </MainLayOut>
  
  )
}

export default IndexPage