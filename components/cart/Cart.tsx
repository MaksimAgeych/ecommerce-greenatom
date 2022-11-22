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
        
        <div className="first">
            <div className="imsec">
                <img src="https://www.zlatmax.ru/images/zik-0321/01s.webp" className="image"/>
            </div>
            <span  className="textName">asd</span>
            <div>
            <div>
                <div className="textSize">sizeXsize</div>
                <div className="textMaterial">Material</div>
            </div>
            <IconStar className="star"/>
            <IconStar className="star"/>
            <div className="textFeedback">1 Отзыв</div>
            </div>
            <div className="divLine">
                <hr className="line"/>
            </div>
            <div>
            <div className="price">500 р.</div>
            <div className="imageTwo"><IconCompare className="scale" /><IconLike className="like" /></div>
            <Button appearance={'primary'}>В корзину</Button>
            </div>
        </div>
    );
}
