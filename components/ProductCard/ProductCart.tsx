import React from "react";
import styles from "./Cart.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import { IProduct } from '../../interface/entities/interface';

export const ProductCart = ({id, name, size, about, price, rating, description, img}: IProduct): JSX.Element => {//на продукт пока заглушка any
    
    const stars = [];
    for(let i = 0; i < rating; i++) {
        stars.push(<IconStar key={i} className={styles.star}/>);
    }
    
    return (
        <div className={styles.cart}>
            <div className={styles.images}>
                <img src={img} className={styles.image}/>
            </div>
            <span className={styles.name}>{name}</span>
            <div className={styles.spec}>
                <p className={styles.left}>{size}</p>
                <p className={styles.right}>{about}</p>
            </div>
            <div className={styles.feedback}>
                <div className={styles.rating}>
                    {stars}
                    {/* <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/> */}
                </div>
                <div className={styles.reviews}>1 Отзыв</div>
            </div>
            <div className={styles.hr}>
                <hr className={styles.line}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.price}>{price} р.</div>
                <div className={styles.activity}>
                    <IconCompare/>
                    <IconLike/>
                </div>
            </div>
        </div>
    );
}
