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


export const Card = (): JSX.Element => {
    const router = useRouter();
    const [basket, setBasket] = useState<any>([])
    const [user, loading, error] = useAuthState(auth)

    function useLoadData(user: any) {
        const [basket, loading, error, ...props] = useCollectionData(query(collection(db, 'users', user?.uid, 'basket').withConverter(converter)))

        return [basket, loading, error]
    }

    const [basketData, loadingData, errorData] = useLoadData(user)
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (basketData) {
            setBasket(basketData)
            basket.forEach((item: IProduct) => {
                dispatch(addToBasket(item))
            });

        }

    }, [user, loadingData, basketData])
    console.log(user)
    if(user) {
    return (
        <>
            {loading && loadingData &&
                <span>loading data</span>
            }

            {user &&
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
                                        return <ProductCardItem key={item.id} {...item} />
                                    })}
                                </div>
                                <div className={styles.cartFooter}>
                                    итого: {basketData?.reduce((sum: number, item: { quantity: number; price: number; }) => {
                                    return sum += item.quantity * item.price
                                }, 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
            {
                error || errorData ? alert(error && errorData) : null
            }
        </>


    );} else {
        router.push('/auth');
        return (
            <div>Редирект на авторизацию</div>
        )
    }

}

export default withLayout(Card);