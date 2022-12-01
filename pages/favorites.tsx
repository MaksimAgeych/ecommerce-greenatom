import {query, collection} from 'firebase/firestore';
import {useEffect} from 'react';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {Htag, ProductCardFav} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/redux-hooks';
import {IProduct} from '../interface/entities/interface';
import {withLayout} from '../layouts/Layout';
import {addFav, deleteFav} from '../store/favoritesSlice';
import {db} from '../utils/firebase/firebase.utils';
import {converter} from './catalog/[id]';
import {useRouter} from "next/router";


const LoadData = (userID: string) => {

    const q = query(collection(db, 'users', userID, 'fav').withConverter(converter))
    const [docs, loading, error, snapshot] = useCollectionData(q);

    return [docs, loading, error, snapshot];
}

function Favorites(): JSX.Element {

    const favProducts = useAppSelector(state => state.favorites.favorites)
    let userID = useAppSelector(state => state.user.id);

    const getFavID = favProducts.map((item) => item.id)
    const dispatch = useAppDispatch();

    const handleDeleteFav = (item: IProduct) => {
        dispatch(deleteFav(item))
    }
    const router = useRouter();

    if (userID) {
        const [docs, loading, error, snapshot] = LoadData(userID);
        return (
            <>
                <Htag tag={'h1'}>Избранное</Htag>
                {loading && <span>Loading</span>}
                {error && alert(error)}
                {docs
                    ? (favProducts.length != 0 ?
                        favProducts.map((item) => {
                            return <ProductCardFav item={item} key={item.id} isFavor={true}
                                                   handleDeleteFav={handleDeleteFav}/>
                        })
                        : <div style={{margin: '20px 0'}}>Нет избранных товаров</div>)
                    : <div style={{margin: '20px 0'}}>Авторизуйтесь, чтобы получит доступ к вашему списку
                        избранного</div>
                }
            </>
        )

    } else {
        router.push('/auth');
        return (
            <div>Редирект на авторизацию</div>
        )
    }
}

export default withLayout(Favorites);