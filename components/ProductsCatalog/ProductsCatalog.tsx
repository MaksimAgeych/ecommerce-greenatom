import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../hooks/redux-hooks';
import styles from './ProductsCatalog.module.css';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {ProductCard} from '../ProductCard/ProductCard';
import {IProduct} from '../../interface/entities/interface';
import {
    createUsersProuctDataFromAuth,
    db,
    deleteProductById,
} from '../../utils/firebase/firebase.utils';
import {addFav, deleteFav, getFavorites} from '../../store/favoritesSlice';
import {addToBasket} from '../../store/basketSlice';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {collection, query} from 'firebase/firestore';
import {converter} from '../../pages/catalog/[id]';

export const ProductsCatalog = (): JSX.Element => {
    

    const {products, status, search} = useAppSelector((state) => state.products);
    const qFav = query(collection(db, 'fav',).withConverter(converter))
    const [favProducts, loadingFav, errorFav] = useCollectionData(qFav)

    // const userID = useAppSelector(state => state.user.id)
    const dispatch = useAppDispatch();
    const [productsList, setProductsList] = useState<IProduct[] | null>(null)
    const q = query(collection(db, 'products',).withConverter(converter))
    const [viewProducts, setViewProducts] = useState<IProduct[] | undefined>([]);
    const [fetchProd, loading, error] = useCollectionData(q)

    const filteredProduct = useAppSelector(state => state.products.filtered);
    useEffect(() => {
        setViewProducts(fetchProd);
    }, [fetchProd])

    useEffect(() => {
        console.log(filteredProduct)
        if (filteredProduct && filteredProduct.length > 0) {
            setViewProducts(filteredProduct);
        }
    }, [filteredProduct]);

    // useEffect(() => {
    //     filtered.length > 0 ? setProductsList(filtered) : setProductsList(products)
    // }, [filtered, products])


    const handleAddToFav = (product: IProduct) => {
        dispatch(addFav(product))
        if (userID) createUsersProuctDataFromAuth(userID, 'fav', product, product.id.toString())
        //createUsersProductDataFromAuth заносит товар (документ) в конкретную коллекцию
        //для этого ей нужно указать путь в виде аргументов функции
    }

    const handleAddToBasket = (product: IProduct) => {
        dispatch(addToBasket(product))
        if (userID) createUsersProuctDataFromAuth(userID, 'basket', {...product, quantity: 1}, product.id.toString())
    }

    const handleDeleteToFav = (product: IProduct) => {
        dispatch(deleteFav(product))
        if (userID) deleteProductById(userID, 'fav', product.id.toString())
    }


    return (
        <nav className={styles.menu} role={"navigation"}>

            {loading && loadingFav && <div>Загрузка</div>}

            {error || errorFav && <div>Ошибка</div>}
            {
                viewProducts ?
                    viewProducts.map((product) =>
                        <ProductCard key={product.id}
                                     item={product}
                                     handleAddToBasket={handleAddToBasket}
                                     handleAddToFav={handleAddToFav}
                                     handleDeleteToFav={handleDeleteToFav}
                                     isFav={favProducts && favProducts.filter(item => item?.id === product.id).length == 1}/>)
                    : <span>Loading</span>
            }
        </nav>
    );
};