import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './ProductsCatalog.module.css';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { ProductCart } from '../ProductCard/ProductCart';
import { fetchAllProducts } from '../../store/productsAsyncActions';
import { IProduct } from '../../interface/entities/interface';

export const ProductsCatalog = (): JSX.Element => {
   
    const {products, status, search} = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();
    const [productsList, setProductsList] = useState<IProduct[]>(products)
    useEffect(() => {
        dispatch(fetchAllProducts(''));
        setProductsList(products)
    }, []);

    useEffect(() => {
      search.length > 0? setProductsList(search) : setProductsList(products) 
    }, [search, products])

    return (
        <nav className={styles.menu} role={"navigation"}>
            {status === "loading" && <div>Загрузка</div>}
            {status === "error" && <div>Ошибка</div>}
            {
                productsList.map((product) => (
                    <ProductCart key={product.id} item={product}/>
                ))
            }
        </nav>
    );
};