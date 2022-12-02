import React, {useEffect, useState} from 'react';
import {withLayout} from "../../layouts/Layout";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import styles from "./Cart.module.css";
import {ProductCardItem} from "../../components/ProductCardItem/ProductCardItem";
import {stat} from 'fs';
import {addToBasket, getBasket} from '../../store/basketSlice';
import {collection, query} from 'firebase/firestore';
import {auth, db} from '../../utils/firebase/firebase.utils';
import {useCollectionData, useCollectionDataOnce} from 'react-firebase-hooks/firestore';
import {converter} from '../catalog/[id]';
import router, {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';
import {User} from 'firebase/auth';
import {IProduct} from '../../interface/entities/interface';
import {FirebaseError} from 'firebase/app';
import {ColorRing} from 'react-loader-spinner';


export const Card = (): JSX.Element => {
        const basket = useAppSelector(state => state.basket.basket)

        return (
            <>
                 {/* <span>Cart is Empty</span> */}
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
                                        {basket.map((item: JSX.IntrinsicAttributes & IProduct) => {
                                            return <ProductCardItem key={item.id} product={item} />
                                        })}
                                    </div>
                                    <div className={styles.cartFooter}>
                                        итого: {basket.reduce((sum: number, item: { quantity: number; price: number; }) => {
                                        return sum += item.quantity * item.price
                                    }, 0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
          
            </>
    

        );
            

  
}

export default withLayout(Card);