import React from "react";
import IconStar from "./element/Star.svg";


function createStar(countStar:number){
    for(let i=0;i<countStar;i++){
        return <IconStar className="star"/>
    }
}

const Cart =({product}:any)=>{//на продукт пока заглушка any 
    const {id, title, rank, img, price}=product;

    return(
        <div>
            <div className="imsec">
            <img src={img} className="image"/>
            </div>
            <span>{title}</span>
            {createStar(rank)}
              
            
        </div>
    );
}
