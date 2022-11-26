import { useEffect } from 'react';
import { isTemplateMiddle } from 'typescript';
import { ProductCart } from '../components';
import { useAppSelector } from '../hooks/redux-hooks';
import {withLayout} from '../layouts/Layout';
import { createUsersProuctDataFromAuth } from '../utils/firebase/firebase.utils';


function Favorites(): JSX.Element {
    
    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)

    const getFavID = favProducts.map((item) => item.id)

    // useEffect(() => {
    //  createUsersProuctDataFromAuth(id, getFavID)
    //  .then((respncse) => console.log(respncse))
    
    // }, [])
    
   

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