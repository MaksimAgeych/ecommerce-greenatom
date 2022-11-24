import React from "react";
import styles from "./Cart.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";

export const Cart = (): JSX.Element => {//на продукт пока заглушка any
    return (
        <div className={styles.cart}>
            <div className={styles.images}>
                <img src="https://www.zlatmax.ru/images/zik-0321/01s.webp" className={styles.image}/>
            </div>
            <span className={styles.name}>Нож Лиса</span>
            <div className={styles.spec}>
                <p className={styles.left}>95x18</p>
                <p className={styles.right}>Орех, алюминий</p>
            </div>
            <div className={styles.feedback}>
                <div className={styles.rating}>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                    <IconStar className={styles.star}/>
                </div>
                <div className={styles.reviews}>1 Отзыв</div>
            </div>
            <div className={styles.hr}>
                <hr className={styles.line}/>
            </div>
            <div className={styles.footer}>
                <div className={styles.price}>500 р.</div>
                <div className={styles.activity}>
                    <IconCompare/>
                    <IconLike/>
                </div>
            </div>
        </div>
    );
}
