import React from "react";
import styles from "./ProductCardItem.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';
import { db, updateProductById } from "../../utils/firebase/firebase.utils";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useCollectionData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, query } from "firebase/firestore";
import { converter } from "../../pages/catalog/[id]";
import { getBasket } from "../../store/basketSlice";
import router from "next/router";

export const ProductCardItem = ({id, name, size, about, price, rating, description, img} : IProduct): JSX.Element => {
   
    const LoadData = (userID: string) => {

        const q = doc(db, 'users', userID, 'basket', id.toString()).withConverter(converter)
        const [product, loading, error, snapshot, reload] = useDocumentDataOnce(q);

    
        return [product, loading, error, snapshot];
    }
    const userID = useAppSelector(state =>  state.user.id)
    const basket = useAppSelector(getBasket);



  async function handleOnClick() {
        return await updateProductById(id,`users/${userID}/basket`, {quantity: value.quantity + 1} )
    }

    if (userID) {
        const [product, loading, error, snapshot, reload] = LoadData(userID);

    return (
            //TODO: Сделать передачу данных при нажатии кнопки сначала в стор и только потом в firebase


        <div className={styles.productCardItem}>
            <div>{name}</div>
            <div>{price} руб.</div>
            <div className={styles.productCardCount}>
                <button className={styles.productBtn} onClick={() =>{() => handleOnClick()}}>{'<'}</button>
                <span>{1}</span>
                <button className={styles.productBtn}>{'>'}</button>
            </div>
            <div>{price} руб.</div>
        </div>
    )
} else {
    router.push('/auth');
    return (
        <div>Редирект на авторизацию</div>
    )
}

}