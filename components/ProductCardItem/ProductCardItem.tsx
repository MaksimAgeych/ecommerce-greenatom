import React from "react";
import styles from "./ProductCardItem.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';

export const ProductCardItem = ({id, name, size, about, price, rating, description, img}: IProduct): JSX.Element => {
    
    return (
        <div className={styles.productCardItem}>
            <div>{name}</div>
            <div>{price} руб.</div>
            <div className={styles.productCardCount}>
                <button className={styles.productBtn}>{'<'}</button>
                <span>{1}</span>
                <button className={styles.productBtn}>{'>'}</button>
            </div>
            <div>{price} руб.</div>
        </div>
    )
}