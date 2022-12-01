import { collection, doc, getDoc, query, setDoc, updateDoc } from "firebase/firestore";
import {createContext, PropsWithChildren, ReactNode, useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAppSelector } from "../hooks/redux-hooks";
import { converter } from "../pages/catalog/[id]";
import { auth, db, getCollectionByName } from "../utils/firebase/firebase.utils";


export interface IAppContext {

}




export const AppContext = createContext<IAppContext>({});

export const AppContextProvider = ({
                                       children
                                   }: PropsWithChildren<IAppContext> ): JSX.Element => {
 //--------Достаем значения из  стора (дефолиные, если юзер не установлен)                                   
  const [user, loaderUser, errorUser] = useAuthState(auth)
  const [userExist, setUserExist] = useState<any>({})

function isUserExist(entity: any) {
   
  if (user) {
      const favQUeryPath =  query(collection(db, 'users', user.uid.toString(), 'fav').withConverter(converter));
      const productQUeryPath =  query(collection(db, 'users', user.uid.toString(), 'product').withConverter(converter))
      
      
      
       const valueFirebase = {
        userID: user.uid,
        favQUeryPath,
        productQUeryPath,
        docPath: (path: string, id: number) => {
            return doc(db, 'users', user.uid.toString(), path, id.toString()).withConverter(converter)
        },
        getDoc: async (path: string, id: number) => {

            await getDoc(valueFirebase.docPath(path, id))
        },
        upDoc: async (path: string, id: number, obj: any) => {

                await updateDoc(valueFirebase.docPath(path, id), obj)
            },
        setDoc: async (path: string, id: number, obj: any) => {
            await setDoc(valueFirebase.docPath(path, id), obj)
        }

       
  } 
  setUserExist(valueFirebase)

  } else {

    setUserExist({userID: null})
    
  } 
}



  
  useEffect((
 ) => {isUserExist(user)}, [user])




    return <AppContext.Provider value={userExist}>
        {children}
    </AppContext.Provider>;
};