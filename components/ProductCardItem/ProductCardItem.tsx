import React from "react";
import styles from "./ProductCardItem.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';
import { db, deleteProductById, updateProductById } from "../../utils/firebase/firebase.utils";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useCollectionData, useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, query } from "firebase/firestore";
import { converter } from "../../pages/catalog/[id]";
import { getBasket } from "../../store/basketSlice";
import router from "next/router";

export const ProductCardItem = ({id, name, size, about, price, rating, description, img, quantity} : IProduct): JSX.Element => {
   
    const useLoadData = (userID: string) => {

        const q = doc(db, 'users', userID, 'basket', id.toString()).withConverter(converter)
        const [product, loading, error, snapshot] = useDocumentData(q);

    
        return [product, loading, error, snapshot];
    }

    const userID = useAppSelector(state =>  state.user.id)
    const basket = useAppSelector(getBasket);
    const [product, ...props] = useLoadData(userID)


  async function changeQuantityOnClick(count: number) {
        
        if (product?.quantity === 1 && count === -1) {
            await deleteProductById(userID, 'basket', id.toString())
        } else {
                    const responce =  await updateProductById(id,`users/${userID}/basket`, {quantity: product?.quantity + count} );
        }
        
    }


    return (
            //TODO: Сделать передачу данных при нажатии кнопки сначала в стор и только потом в firebase


        <div className={styles.productCardItem}>
            <div>{name}</div>
            <div>{price} руб.</div>
            <div className={styles.productCardCount}>
                <button className={styles.productBtn} onClick={() => changeQuantityOnClick(-1)}>{'<'}</button>
                <span>{product?.quantity}</span>
                <button className={styles.productBtn} onClick={() =>changeQuantityOnClick(1)}>{'>'}</button>
            </div>
            <div>{price} руб.</div>
        </div>
    )

}