import React from "react";
import { ReactComponent as Star } from "./element/Star.svg"
const Cart =({product})=>{
    const {id, title, rank, img, price}=product;

    return(
        <div>
            <img src={img}/>
            <span>{title}</span>
            {
                for (let i=0;i < rank;i++){
                    return (<Star/>)
                }
            }
        </div>
    );
}