import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store/rootReducer';
import styles from './Menu.module.css';
import { useAppDispatch } from './../../hooks/redux-hooks';
import { ProductCart } from './../../components/ProductCard/ProductCart';
import { fetchAllProducts } from '../../store/productsAsyncActions';

export const Menu = (): JSX.Element => {
    const {products, status} = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, []);

    return (
        <nav className={styles.menu} role={"navigation"}>
            {status === "loading" && <div>Загрузка</div>}
            {status === "error" && <div>Ошибка</div>}
            {
                products.map((product) => (
                    <ProductCart key={product.id} {...product}/>
                ))
            }
        </nav>
    );
};