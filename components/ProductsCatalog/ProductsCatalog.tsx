import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './ProductsCatalog.module.css';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ProductCard } from '../ProductCard/ProductCard';
import { IProduct } from '../../interface/entities/interface';
import { useFetchCollection } from '../../hooks/firestore-hooks';
import { addProducts, clearProducts } from '../../store/productsSlice';
import { updateProductById } from '../../utils/firebase/firebase.utils';

export const ProductsCatalog = (): JSX.Element => {
  const {products, status, search} = useAppSelector((state) => state.products);

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

  return (
      <nav className={styles.menu} role={"navigation"}>
          {status === "loading" && <div>Загрузка</div>}
          {status === "error" && <div>Ошибка</div>}
          {
            productsList ?  
            productsList.map((product) => <ProductCard key={product.id} item={product}/>)
              : <span>Loading</span>
          }
          
      </nav>
  );
};