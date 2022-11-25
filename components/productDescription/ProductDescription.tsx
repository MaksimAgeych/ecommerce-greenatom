import React from "react";
import styles from "./ProductDescription.module.css";
import { IProduct } from '../../interface/entities/interface';



export const ProductDescription = ({id, name, size, about, price, rating, description, img}: IProduct): JSX.Element => {
    
    
    return (
    <div className={styles.catDes}>
        <div className={styles.imageDiv}>
            <img src={img} className={styles.image}></img>
        </div>
        <div className={styles.destiptionDiv}>
            <span className={styles.descripTitle}>Описание</span>
            <hr className={styles.line}/>
            <div className={styles.text}>{description}</div>
        </div>
    </div>
    );
}
