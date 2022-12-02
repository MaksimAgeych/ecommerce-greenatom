import React from "react";
import styles from "./ProductDescription.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import IconCart from "./icons/cart.svg";
import Link from "next/link";
import { IProduct } from '../../interface/entities/interface';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { addFav, deleteFav, getFavorites } from "../../store/favoritesSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, createUsersProuctDataFromAuth, deleteProductById } from "../../utils/firebase/firebase.utils";
import { addToBasket } from "../../store/basketSlice";


export const ProductDescription = ({id, name, size, about, price, rating, description, img, quantity}: IProduct): JSX.Element => {
    const item = {id, name, size, about, price, rating, description, img, quantity}
    const dispatch = useAppDispatch()
    const [user] = useAuthState(auth)
    let userID = user?.uid

    const favProducts = useAppSelector(getFavorites)
   let isFav = favProducts && favProducts.filter(item => item?.id === id).length == 1


    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<IconStar key={i} className={styles.star}/>);
    }
    const handleAddToFav = (product: IProduct) => {
        dispatch(addFav(product))
        if (userID) createUsersProuctDataFromAuth(userID, 'fav', product, product.id.toString())
        //createUsersProductDataFromAuth заносит товар (документ) в конкретную коллекцию
        //для этого ей нужно указать путь в виде аргументов функции
    }

    const handleAddToBasket = (product: IProduct) => {
        dispatch(addToBasket(product))
        if (userID) createUsersProuctDataFromAuth(userID, 'basket', {...product, quantity: 1}, product.id.toString())
    }

    const handleDeleteToFav = (product: IProduct) => {
        dispatch(deleteFav(product))
        if (userID) deleteProductById(userID, 'fav', product.id.toString())
    }



    
    return (
    <div className={styles.catDes}>
        <div className={styles.imageDiv}>
            <img src={img} className={styles.image}></img>
        </div>
        <div className={styles.destiptionDiv}>
            <div className={styles.descripName}>
                <span>{name}</span>
                <span className={styles.mater}>Материал: {about}</span>
            </div>
            <hr className={styles.line}/>
            <div className={styles.right}>
            <div className={styles.activity}>
                    <button className={styles.btn}><IconCompare/></button>
                    <button 
                        className={styles.btn}
                        onClick={(event) => isFav ? (event.preventDefault(), handleDeleteToFav(item)) : handleAddToFav(item)}
                    >
                        <IconLike className={isFav ? styles.like : styles.likesvg}/>
                    </button>
                    <button className={styles.btn} onClick={(event) => {
                        event.preventDefault();
                        handleAddToBasket(item);
                    }}>
                        <IconCart/>
                    </button>
                    <div className={styles.stars}>
                        {stars}
                    </div>
                </div>
                
            </div>
            <span className={styles.descripTitle}>Описание</span>
            <hr className={styles.line}/>
            <div className={styles.text}>{description}</div>
        </div>
    </div>
    );
}


