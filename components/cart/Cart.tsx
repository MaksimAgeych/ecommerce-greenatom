import React from "react";
import ReactComponent from "*.svg"
import Star from "./element/Star.svg";


function createStar(countStar:number){
    for(let i=0;i<countStar;i++){
        return <Star/>
    }
}

const Cart =({product}:any)=>{//на продукт пока заглушка any 
    const {id, title, rank, img, price}=product;

    return(
        <div>
            <img src={img}/>
            <span>{title}</span>
            {createStar(rank)}
              
            
        </div>
    );
}
