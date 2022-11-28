import id from 'date-fns/locale/id';
import {getDocs, getDoc, doc} from 'firebase/firestore';
import {useEffect} from 'react';
import {isTemplateMiddle} from 'typescript';
import {Htag, ProductCard, ProductCardFav} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import { IProduct } from '../interface/entities/interface';
import {withLayout} from '../layouts/Layout';
import { deleteFav } from '../store/favorietsSlice';
import {createUsersProuctDataFromAuth, getProductById, db} from '../utils/firebase/firebase.utils';

function Favorites(): JSX.Element {

    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)


    const getFavID = favProducts.map((item) => item.id)
    const dispatch = useAppDispatch()
   

    const handleDeleteFav = (item :IProduct)=>{
        dispatch(deleteFav(item))
    }
    // useEffect(() => {
    //     if (userID) async () => {
    //         const res = await getProductById(userID, 'users')
    //         // console.log(res)
    //     }
    //     console.log(userID)
    // }, [userID])

    //TODO: Сделать редирект на авторизацию, если не залогинен
   
    return (
        <div>
            <Htag tag={'h1'}>Избранное</Htag>

            {userID
                ? (favProducts.length!=0 ?  
                    favProducts.map((item) => {return <ProductCardFav item={item} key={item.id} isFavor={true} handleDeleteFav={handleDeleteFav}/>})
                    : <div style={{margin: '20px 0'}}>Нет избранных товаров</div>)
                : <div style={{margin: '20px 0'}}>Авторизуйтесь, чтобы получит доступ к вашему списку избранного</div>
            }
            
        </div>
    )
}

export default withLayout(Favorites);