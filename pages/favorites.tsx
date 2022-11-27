import {getDocs, getDoc, doc} from 'firebase/firestore';
import {useEffect} from 'react';
import {isTemplateMiddle} from 'typescript';
import {Htag, ProductCard, ProductCardFav} from '../components';
import {useAppSelector} from '../hooks/redux-hooks';
import {withLayout} from '../layouts/Layout';
import {createUsersProuctDataFromAuth, getProductById, db} from '../utils/firebase/firebase.utils';

function Favorites(): JSX.Element {

    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const userID = useAppSelector(state => state.user.id)


    const getFavID = favProducts.map((item) => item.id)

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
                ? favProducts.map((item) => {return <ProductCardFav item={item} key={item.id}/>})
                : 'Авторизуйтесь, чтобы получит доступ к вашему списку избранного'
            }
        </div>
    )
}

export default withLayout(Favorites);