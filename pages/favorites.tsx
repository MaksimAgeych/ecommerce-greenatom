import { getDocs, getDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { isTemplateMiddle } from 'typescript';
import { ProductCart } from '../components';
import { useFetchCollection } from '../hooks/firestore-hooks';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { IProduct } from '../interface/entities/interface';
import {withLayout} from '../layouts/Layout';
import { addFav, clearFav } from '../store/favorietsSlice';
import { createUsersProuctDataFromAuth, getProductById, db, getSubCollection, updateProductById, } from '../utils/firebase/firebase.utils';


function Favorites(): JSX.Element {
    
    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)
    const dispatch = useAppDispatch();
  

    const getFavID = favProducts.map((item) => item.id)
    const getFavCollection = useFetchCollection(`products`)

    // useEffect(() => {
    //     dispatch(clearFav())
    //      getProductById(userID, 'users')
    //      .then(data => {
            
    //      if (getFavCollection) getFavCollection.forEach((item: any) =>
    //          {
    //             console.log(data)
    //            if (data.fav.includes(item.id))  dispatch(addFav(item))} )
    //      })   
        
    // },[getFavCollection])


    useEffect(() => {
        updateProductById(userID, 'users', {fav: favProducts.map((item) => item.id)})
    },[favProducts])
 
    
    return (
        <div>
            Избранное

            {userID ? 
            <ul>
                {
                    favProducts.map((item) => {
                return <li key={item.id+item.price}>
                    <ProductCart item={item} />
                </li>
                
            }) 
                }
            </ul>
           
            : 'Пользователь не авторизирован'
        }
        </div>
    )
}

export default withLayout(Favorites);