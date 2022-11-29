import id from 'date-fns/locale/id';
import {getDocs, getDoc, doc, query, collection} from 'firebase/firestore';
import {useEffect} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {isTemplateMiddle} from 'typescript';
import {Htag, ProductCard, ProductCardFav} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import { IProduct } from '../interface/entities/interface';
import {withLayout} from '../layouts/Layout';
import { addFav, deleteFav } from '../store/favorietsSlice';
import {createUsersProuctDataFromAuth, getProductById, db} from '../utils/firebase/firebase.utils';
import { converter } from './catalog/[id]';

function Favorites(): JSX.Element {

    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)


    const getFavID = favProducts.map((item) => item.id)
    const dispatch = useAppDispatch()
    
   
     const q = query(collection(db, 'users', userID, 'fav').withConverter(converter))
    const [docs, loading, error, snapshot] = useCollectionData(q);
    
    const handleDeleteFav = (item :IProduct)=>{
        dispatch(deleteFav(item))
    }

    useEffect(() => {
        docs?.forEach((item) =>dispatch(addFav(item)) )
        
    },[docs])
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
            {
                loading && <span>Loading</span>
                        }
                        {
                            error &&  alert(error)
                        }
            {docs
                ? (favProducts.length!=0 ?  
                    favProducts.map((item) => {return <ProductCardFav item={item} key={item.id} isFavor={true} handleDeleteFav={handleDeleteFav}/>})
                    : <div style={{margin: '20px 0'}}>Нет избранных товаров</div>)
                : <div style={{margin: '20px 0'}}>Авторизуйтесь, чтобы получит доступ к вашему списку избранного</div>
            }
            
        </div>
    )
}

export default withLayout(Favorites);