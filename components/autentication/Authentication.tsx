// import { useAppDispatch } from '../../store/rootReducer.js';
import { signInWithGooglePopup, createUserDocFromAuth, signOutUser, } from '../../utils/firebase/firebase.utils.js';
import {setUser} from '../../store/authSlice'
import SignInForm from '../sign-in-form/SignInForm'




const Authentication = () => {

    // const dispatch = useAppDispatch();

    const handleGoogleSignIn = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
        // dispatch(setUser(user))
        

    }

    return (<div className="auth-container">

        <SignInForm />

        {/* <SignUpForm /> */}
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
