import { collection } from 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { db } from '../utils/firebase/firebase.utils'

export const useFetchCollection = (pathName: string) => {
      const [fetchProd] = useCollectionData(collection(db, pathName)) 
    return fetchProd
}

