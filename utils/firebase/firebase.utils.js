import { initializeApp } from "firebase/app";
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    collection,
    getFirestore,
    doc, //document
    getDoc, //get data from doc
    setDoc,
    deleteDoc,
    updateDoc,
    addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAieju392UH-kl2CsYkY50WslOjxs2feBQ",
    authDomain: "crwn-shop-bf775.firebaseapp.com",
    projectId: "crwn-shop-bf775",
    storageBucket: "crwn-shop-bf775.appspot.com",
    messagingSenderId: "436520126514",
    appId: "1:436520126514:web:e05cd6b7856e1249e2542b",
    measurementId: "G-JY869MF3H7",
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid) //обращение к документу с именем в колл-ии users
    const userSnapShot = await getDoc(userDocRef); // получение данных по конкретному юзеру
    // console.log(userSnapShot)

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth; //userSnapShot = данные конкретного usera, проверем существует ли такой ser
        const createdAt = new Date() //если usera не существует в базе, созадем дату и имя и почту

        try { //cсоздаем документ с юзером
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch (error) {
            console.log('error create user: ', error.message)
        }
    }

    return userDocRef
}
//------------------------Создаем колекцию с избранным

//-------------------Функции CRUD

export const getProductById = async (id, str) => {
    const response = await getDoc(doc(db, str, id.toString()))
    const data = await response
    return data
} //функция для получения нужного документа (товар, пользователь), в нее передаем id или uid

export const createUsersProuctDataFromAuth = async (id, obj) => {
    return setDoc(doc(db, 'products', id.toString()), obj)
        .then((Response) => console.log(Response)
        ).catch((error) => console.log(error))
} //для создания нового товара передаем id и обьект товара

export const updateProductById = async (id, ...obj) => {

    return updateDoc(doc(db, 'products', id.toString()), ...obj)
} // обновляем информацию в документе, передаем id и обьект с нужными полями для изменения 

export const deleteProductById = async (id) => {
    return deleteDoc(doc(db, 'products', id.toString()))
} // для удаления передаем просто id


export const getCollectionByName = async (collectionName) => {
    const response = await collection(db, collectionName)
    const data = await response.withConverter()
    return response
}
//---------------------------------------------------


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const createUserFromAuthWithPassword = async (userAuth, additional) => {

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef);

    if (!userSnapShot.exists()) {
        const { displayName, email, password } = userAuth;
        const createdAt = new Date()

        try { //cсоздаем документ с юзером
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additional
            })
        } catch (error) {
            console.log('error create user: ', error.message)
        }
    }

    return userDocRef


}

export const complitedUserAuth = async (user) => {
    const userDocRef = doc(db, 'users', user.uid)

    const userSnapShot = await getDoc(userDocRef);
    // получение данных по конкретному юзеру
    if (userSnapShot.exists()) {

        return alert('User has created~~')
    }

}

export const signIn = async (email, password) => {

    if (!(email && password)) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);
//следит за изменениями авторизации юзера
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);


