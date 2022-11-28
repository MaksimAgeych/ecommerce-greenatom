import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './ProductsCatalog.module.css';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ProductCard } from '../ProductCard/ProductCard';
import { IProduct } from '../../interface/entities/interface';
import { useFetchCollection } from '../../hooks/firestore-hooks';
import { addProducts, clearProducts } from '../../store/productsSlice';
import { updateProductById } from '../../utils/firebase/firebase.utils';
import { addFav, deleteFav } from '../../store/favorietsSlice';
import { addToBusket } from '../../store/busketSlice';

export const ProductsCatalog = (): JSX.Element => {
  const {products, status, search} = useAppSelector((state) => state.products);
  const favProducts = useAppSelector(state => state.favoriets.favoriets)

  const dispatch = useAppDispatch();
  const [productsList, setProductsList] = useState<IProduct[] | null>(null)
  const fetchProd = useFetchCollection('products')

  useEffect(() => {
    dispatch(clearProducts())} ,[])
  
  useEffect(() => {

    if (fetchProd) {
      const  arr = fetchProd.map((item) => {
        return item
      }) 

      dispatch(addProducts(arr))
      setProductsList(products)
    }
  
  }, [fetchProd]);

  useEffect(() => {
    search.length > 0? setProductsList(search) : setProductsList(products) 
      
  }, [search, products])

  const handleAddToFav = (product: IProduct) => {
    dispatch(addFav(product))
  }

  const handleAddToBusket = (product: IProduct) => {
    dispatch(addToBusket(product))
  }

  const handleDeleteToFav = (product: IProduct) => {
    dispatch(deleteFav(product))
  }



  return (
      <nav className={styles.menu} role={"navigation"}>
          {status === "loading" && <div>Загрузка</div>}
          {status === "error" && <div>Ошибка</div>}
          {
            productsList ?  
            productsList.map((product) => 
                <ProductCard key={product.id} 
                item={product} 
                handleAddToBusket={handleAddToBusket}
                handleAddToFav={handleAddToFav}
                handleDeleteToFav={handleDeleteToFav}
                isFav={favProducts.filter(item => item.id === product.id).length == 1}/>)
            : <span>Loading</span>
          }
      </nav>
  );
};