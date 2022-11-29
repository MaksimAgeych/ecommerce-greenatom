import React from 'react';
import {withLayout} from "../../layouts/Layout";
import {useAppSelector} from "../../hooks/redux-hooks";
import styles from "./Cart.module.css";
import {ProductCardItem} from "../../components/ProductCardItem/ProductCardItem";

function Index(): JSX.Element {
    const {basket} = useAppSelector(state => state.basket);

    return (
        <section className={styles.sectionCart}>
            <div className={styles.sectionCartHeader}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Корзина
                    </h1>
                </div>
            </div>
            <div className={styles.sectionCartBody}>
                <div className={styles.container}>
                    <div className={styles.cart}>
                        <div className={styles.cartHeader}>
                            <div className={styles.cartHeaderTitle}>товар</div>
                            <div className={styles.cartHeaderPrice}>цена</div>
                            <div className={styles.cartHeaderCount}>количество</div>
                            <div className={styles.cartHeaderCost}>сумма</div>
                        </div>
                        <div className={styles.product}>
                            {basket.map(item => {
                                return <ProductCardItem key={item.id} {...item} />
                            })}
                        </div>
                        <div className={styles.cartFooter}>
                            итого:
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default withLayout(Index);