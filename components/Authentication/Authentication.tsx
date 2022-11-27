import {createUserDocFromAuth, signInWithGooglePopup, signOutUser,} from '../../utils/firebase/firebase.utils.js';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm'

import {useAuth} from "../../hooks/userAuth";
import {Button} from "../Button/Button";
import {useRouter} from "next/router";

import styles from './Authentication.module.css';
import {Htag} from "../Htag/Htag";

const Authentication = () => {

    let {isAuth} = useAuth();
    let router = useRouter();
    isAuth ? router.push('/') : '';

    // const dispatch = useAppDispatch();

    // const handleGoogleSignIn = async () => {
    //     signInWithGooglePopup()
    //         .then(({user}) => {
    //             console.log(user);
    //             createUserDocFromAuth(user);
    //             const {uid, refreshToken, email, displayName} = user;
    //             dispatch(setUser({email: email, id: uid, token: refreshToken, name: displayName}))
    //         })

    // }

    console.log(useAuth().name)
    return (
        <>
            <Htag tag={'h1'}>Авторизация</Htag>
            <div className={styles.container}>
                <div className={styles.block}>
                    <SignInForm/>
                </div>
                <div className={styles.block}>
                    <SignUpForm/>
                </div>
                {/*<Button appearance={'primary'} onClick={() => signOutUser()}>Выйти</Button>*/}
            </div>
        </>
    )
};

export default Authentication;
