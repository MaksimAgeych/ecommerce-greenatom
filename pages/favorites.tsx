import { getDocs, getDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { isTemplateMiddle } from 'typescript';
import { ProductCard } from '../components';
import { useAppSelector } from '../hooks/redux-hooks';
import {withLayout} from '../layouts/Layout';
import { createUsersProuctDataFromAuth, getProductById, db, newGetDoc } from '../utils/firebase/firebase.utils';


function Favorites(): JSX.Element {
    
    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)
  

    const getFavID = favProducts.map((item) => item.id)

    useEffect( () => {
    if (userID) async () => {
        const res = await getProductById(userID, 'users') 
        // console.log(res)
        }
        console.log(userID)
    }, [userID])
    
   

    return (
        <div>
            Избранное

            {userID ? 
            <ul>
                {
                    favProducts.map((item) => {
                return <li key={item.id+item.price}>
                    <ProductCard item={item} />
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