import React from "react";
import styles from "./ProductDescription.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';

export const ProductDescription = ({id, name, size, about, price, rating, description, img}: IProduct): JSX.Element => {
    
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<IconStar key={i} className={styles.star}/>);
    }
    
    return (
    <div className={styles.catDes}>
        
        <div className={styles.imageDiv}>
            <img src={img} className={styles.image}></img>
        </div>
        <div className={styles.destiptionDiv}>
            <div className={styles.descripName}>
                {name}
                
                <span className={styles.mater}>Материал: {about}</span>
            </div>
            <hr className={styles.line}/>
            <div className={styles.right}>
            <div className={styles.activity}>
                    <Link href={'/'}><IconCompare/></Link>
                    <Link href={'/'}><IconLike/></Link>
                </div>
                <div className={styles.stars}>
                    {stars}
                </div>
            </div>
            <span className={styles.descripTitle}>Описание</span>
            <hr className={styles.line}/>
            <div className={styles.text}>{description}</div>
        </div>
    </div>
    );
}
