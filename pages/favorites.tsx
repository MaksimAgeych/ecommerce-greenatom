import {query, collection} from 'firebase/firestore';
import {useEffect} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Htag, ProductCardFav} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {IProduct} from '../interface/entities/interface';
import {withLayout} from '../layouts/Layout';
import {addFav, deleteFav} from '../store/favoritesSlice';
import {auth, db, deleteProductById} from '../utils/firebase/firebase.utils';
import {converter} from './catalog/[id]';
import {useRouter} from "next/router";
import {useAuthState} from 'react-firebase-hooks/auth';
import {ColorRing} from 'react-loader-spinner';


const LoadData = (userID: string) => {

    const q = query(collection(db, 'users', userID, 'fav').withConverter(converter))
    const [docs, loading, error, snapshot] = useCollectionData(q);

    return [docs, loading, error, snapshot];
}

function Favorites(): JSX.Element {

    const favProducts = useAppSelector(state => state.favorites.favorites)

    const [user] = useAuthState(auth)

    const getFavID = favProducts.map((item) => item.id)
    const dispatch = useAppDispatch();

    const handleDeleteFav = (item: IProduct) => {
        deleteProductById(user?.uid, 'fav', item.id) //ошибка поиска пути документа
        dispatch(deleteFav(item))
    }
    const router = useRouter();

    let userID = user?.uid;
    let docs, loading, error, snapshot;
    if(userID) [docs, loading, error, snapshot] = LoadData(userID);

    return (
        <>
            <Htag tag={'h1'}>Избранное</Htag>
            {loading && <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />}
            {error && alert(error)}
            {(favProducts.length != 0 ?
                favProducts.map((item) => {
                    return <ProductCardFav item={item} key={item.id} isFavor={true}
                                           handleDeleteFav={handleDeleteFav}/>
                })
                : <div style={{margin: '20px 0'}}>Нет избранных товаров</div>)

            }
        </>
    )
}

export default withLayout(Favorites);