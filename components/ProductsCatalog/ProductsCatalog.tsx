import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './ProductsCatalog.module.css';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ProductCard } from '../ProductCard/ProductCard';
import { IProduct } from '../../interface/entities/interface';
import { useFetchCollection } from '../../hooks/firestore-hooks';
import { addProducts, clearProducts } from '../../store/productsSlice';
import { createUsersProuctDataFromAuth, db, deleteProductById, updateProductById } from '../../utils/firebase/firebase.utils';
import { addFav, deleteFav } from '../../store/favorietsSlice';
import { addToBusket } from '../../store/busketSlice';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';

export const ProductsCatalog = (): JSX.Element => {
  const {products, status, search} = useAppSelector((state) => state.products);
  const favProducts = useAppSelector(state => state.favoriets.favoriets)
  const userID = useAppSelector(state => state.user.id)

  const dispatch = useAppDispatch();
  const [productsList, setProductsList] = useState<IProduct[] | null>(null)
  const q = query(collection(db, 'products',))

  const [fetchProd, loading, error] = useCollectionData(q)

  // useEffect(() => {
  //   dispatch(clearProducts())} ,[])
  
  useEffect(() => {

    if (fetchProd) {
      const  arr = fetchProd.map((item) => {
        return item
      }) 

      // dispatch(addProducts(arr))
      setProductsList(products)
    }
  
  }, [fetchProd]);

  useEffect(() => {
    search.length > 0? setProductsList(search) : setProductsList(products) 
      
  }, [search, products])

  const handleAddToFav = (product: IProduct) => {
    dispatch(addFav(product))
    if (userID) createUsersProuctDataFromAuth(userID, 'fav', product, product.id.toString())
//createUsersProuctDataFromAuth заносит товар (документ) в конкретную коллекцию
//для этого ей нужно указать путь ввиде аргументов функции
  }

  const handleAddToBusket = (product: IProduct) => {
    dispatch(addToBusket(product))
    if (userID) createUsersProuctDataFromAuth(userID, 'busket', product, product.id.toString())
  }

  const handleDeleteToFav = (product: IProduct) => {
    dispatch(deleteFav(product))
    if (userID) deleteProductById(userID, 'fav', product.id.toString())
  }



  return (
      <nav className={styles.menu} role={"navigation"}>

          {loading && <div>Загрузка</div>}
        
          {error && <div>Ошибка</div>}
          {
            fetchProd ?  
            fetchProd.map((product) => 
                <ProductCard key={product.id} 
                item={product} 
                handleAddToBusket={handleAddToBusket}
                handleAddToFav={handleAddToFav}
                handleDeleteToFav={handleDeleteToFav}
                isFav={fetchProd.filter(item => item.id === product.id).length == 1}/>)
            : <span>Loading</span>
          }
      </nav>
  );
};