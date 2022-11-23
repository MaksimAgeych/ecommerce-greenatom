import React from "react";
import styles from "./Cart.module.css";
import IconStar from "./element/Star.svg";
import IconCompare from "./element/scales.svg";
import IconLike from "./element/like.svg";
import { Button } from "../Button/Button";

function createStar(countStar:number){
    for(let i=0;i<countStar;i++){
        return <IconStar className="star"/>
    }
}

 export const Cart =() :JSX.Element=>{//на продукт пока заглушка any 
    
    return(
        
        <div className={styles.first}>
            <div className={styles.imsec}>
                <img src="https://www.zlatmax.ru/images/zik-0321/01s.webp" className={styles.image}/>
            </div>
            <span  className={styles.textName}>asd</span>
            <div>
            <div>
                <div className={styles.textSize}>sizeXsize</div>
                <div className={styles.textMaterial}>Material</div>
            </div>
            <IconStar className={styles.star}/>
            <IconStar className={styles.star}/>
            <div className={styles.textFeedback}>1 Отзыв</div>
            </div>
            <div className={styles.divLine}>
                <hr className={styles.line}/>
            </div>
            <div>
            <div className={styles.price}>500 р.</div>
            <div className={styles.imageTwo}><IconCompare className={styles.scale} /><IconLike className={styles.like} /></div>
            <div>
            <Button appearance={'primary'}>В корзину</Button>
            </div>
            </div>
        </div>
    );
}
