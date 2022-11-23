import { useAppDispatch } from '../../store/rootReducer.js';
import { signInWithGooglePopup, createUserDocFromAuth, signOutUser, } from '../../utils/firebase/firebase.utils.js';
import {setUser} from '../../store/authSlice'
import SignInForm from '../sign-in-form/SignInForm'
import SignUpForm from '../sign-up-form/SignUpForm'


const Authentication = () => {

    const dispatch = useAppDispatch();

    const handleGoogleSignIn = async () => {
        signInWithGooglePopup()
        .then(({user}) => {
            createUserDocFromAuth(user);
            const { uid, accessToken, email } = user;
            dispatch(setUser({ email: email, id: uid, token: accessToken }))
        })
       
    }

    return (<div className="auth-container">

        <SignInForm />

        <SignUpForm />
    <button onClick={() => handleGoogleSignIn()}>
            Sign In With Google
        </button>
        <button onClick={() => signOutUser()}>
        Sign Out
        </button>

    </div>
    )
};

export default Authentication;
