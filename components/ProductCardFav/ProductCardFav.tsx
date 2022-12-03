import React, {FC, useEffect, useState} from "react";
import styles from "./ProductCardFav.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import IconCart from "./icons/cart.svg";
import {IProduct} from '../../interface/entities/interface';
import Link from "next/link";
import {useAppDispatch,useAppSelector} from "../../hooks/redux-hooks";
import {addFav, deleteFav} from "../../store/favoritesSlice";

interface IProps {
    item: IProduct,  
    isFavor: boolean,
    handleDeleteFav: (item: IProduct) => void
    handleAddToBasket: (item: IProduct) => void
}

export const ProductCardFav: FC<IProps> = ({item, isFavor,handleDeleteFav, handleAddToBasket}): JSX.Element => {//на продукт пока заглушка any

    const {id, name, size, about, price, rating, description, img} = item
    const dispatch = useAppDispatch()

    

    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<IconStar key={i} className={styles.star}/>);
    }

    return (
        <div className={styles.cart}>
            <div className={styles.image}>
                <img src={img} className={styles.image}/>
            </div>
            <span className={styles.name}>{name}</span>
            <div className={styles.feedback}>
                <div className={styles.rating}>
                    {stars}
                </div>
                <div className={styles.reviews}>1 Отзыв</div>
            </div>
            <div className={styles.price}>{price} р.</div>
            <div className={styles.activity}>
                <button className={styles.btn}><Link className={styles.link} href={'/'}><IconCompare/></Link></button>
                <button className={styles.btn} onClick={(event) => {
                        event.preventDefault();
                        handleAddToBasket(item)}}>
                    <IconCart/>
                </button>
                <button className={styles.btn} onClick={()=>handleDeleteFav(item)}>
                    <IconLike className={isFavor && styles.like}/>
                </button>
            </div>
        </div>
    );
}
