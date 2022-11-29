import React from "react";
import styles from "./ProductCardItem.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';
import { db, updateProductById } from "../../utils/firebase/firebase.utils";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { converter } from "../../pages/catalog/[id]";

export const ProductCardItem = ({id, name, size, about, price, rating, description, img} : IProduct): JSX.Element => {
   
        const userID = useAppSelector(state => state.user.id)
        const docRef = doc(db,'users', userID, 'basket', id).withConverter(converter);
        const [value, loading, error, snapshot, reload] = useDocumentDataOnce(docRef);

   async function handleOnClick() {
        return await updateProductById(id,`users/${userID}/baset`, {quantity: 1} )
    }

    return (

        <div className={styles.productCardItem}>
            <div>{name}</div>
            <div>{price} руб.</div>
            <div className={styles.productCardCount}>
                <button className={styles.productBtn} onClick={() => handleOnClick()}>{'<'}</button>
                <span>{1}</span>
                <button className={styles.productBtn}>{'>'}</button>
            </div>
            <div>{price} руб.</div>
        </div>
    )
}