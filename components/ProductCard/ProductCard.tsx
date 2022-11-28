import React, {FC} from "react";
import styles from "./ProductCard.module.css";
import IconStar from "./icons/Star.svg";
import IconCompare from "./icons/scales.svg";
import IconLike from "./icons/like.svg";
import IconCart from "./icons/cart.svg";
import {IProduct} from '../../interface/entities/interface';
import Link from "next/link";
import {useAppDispatch,useAppSelector} from "../../hooks/redux-hooks";
import {addFav} from "../../store/favorietsSlice";


interface IProps {
    item: IProduct
}

export const ProductCard: FC<IProps> = ({item}): JSX.Element => {
    const {id, name, size, about, price, rating, description, img} = item

    let isFavor=styles.btn;
    const favProducts = useAppSelector(state => state.favoriets.favoriets)
    const getFavID = favProducts.map((item) => item.id)
    for(let i=0;i<getFavID.length;i++){
        if(getFavID[i]==id){
            isFavor=styles.like;
        }
        else {}
    }

    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<IconStar key={i} className={styles.star}/>);
    }

    return (
        <Link href={`/catalog/${id}`}>
            <div className={styles.cart}>
                <div className={styles.images}>
                    <img src={img} className={styles.image}/>
                </div>
                <span className={styles.name}>{name}</span>
                <div className={styles.spec}>
                    <p>{size}</p>
                    <p>{about}</p>
                </div>
                <div className={styles.feedback}>
                    <div className={styles.rating}>
                        {stars.length == 0 ? "Нет рейтинга" : stars}
                    </div>
                    <div className={styles.reviews}>1 Отзыв</div>
                </div>
                <div className={styles.hr}>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.footer}>
                    <div className={styles.price}>{price} р.</div>
                    <div className={styles.activity}>
                        <Link href={'/'}><IconCompare/></Link>
                        <button className={styles.btn} onClick={() => dispatch(addFav(item))}>
                            
                            <IconLike className={isFavor} />
                        </button>
                        <button className={styles.btn}>
                            <IconCart/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
