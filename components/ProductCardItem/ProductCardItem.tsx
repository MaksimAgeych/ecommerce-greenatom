import React, { FC } from "react";
import styles from "./ProductCardItem.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import {IProduct} from '../../interface/entities/interface';
import {auth, db, deleteProductById, updateProductById} from "../../utils/firebase/firebase.utils";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {useCollectionData, useDocumentData, useDocumentDataOnce} from "react-firebase-hooks/firestore";
import {collection, doc, query} from "firebase/firestore";
import {converter} from "../../pages/catalog/[id]";
import {clearBasket, decreaseQuantity, deleteFromBasket, getBasket, increaseQuantity} from "../../store/basketSlice";
import router from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

interface IProps {
    product: IProduct
}
export const ProductCardItem:FC<IProps> = ( {product}): JSX.Element => {
                       const   {
                                    id,
                                    name,
                                    price,
                                    rating,
                                    description,
                                    img,
                                    quantity
                                } = product         
            const dispatch = useAppDispatch();

            const productList = useAppSelector(state => state.basket.basket)
           
    const [user] = useAuthState(auth)  


    async function changeQuantityOnClick(count: number) {

        if (quantity === 1 && count === -1) {
      
        dispatch(deleteFromBasket(product))
        }
        else if (count === 1) {
            
            dispatch(increaseQuantity(product))
        } else {
            dispatch(decreaseQuantity(product))
        }
    
    }


    function handleBasketDelete(item: IProduct): void {
        dispatch(deleteFromBasket(item))

         if (user) deleteProductById(user.uid, 'basket', item.id.toString() )
    }
   
    return (
        <>
        {
            !(productList.length > 0  ) && <span>Корзина пуста</span>
        }
        
        { productList.length > 0 &&   <div className={styles.productCardItem}>
            <div>{name}</div>
            <div>{price} руб.</div>
            <div className={styles.productCardCount}>
                <button className={styles.productBtn} onClick={() => changeQuantityOnClick(-1)}>{'<'}</button>
                <span>{quantity}</span>
                <button className={styles.productBtn} onClick={() => changeQuantityOnClick(1)}>{'>'}</button>
            </div>
            <div>{price * quantity} руб.</div>
            <button className={styles.btn} onClick={() => handleBasketDelete(product)}>x</button>
        </div>}
        </>


    
    )

}