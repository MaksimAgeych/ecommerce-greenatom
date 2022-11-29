import React, {useEffect, useState} from 'react';
import {WidgetPriceFilterProps} from "./WidgetPriceFilter.props";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import styles from './WidgetPriceFilter.module.css';
import cn from "classnames";
import {collection, query} from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";
import {converter} from "../../pages/catalog/[id]";
import {useCollectionData} from "react-firebase-hooks/firestore";



export const WidgetPriceFilter = ({className, ...props}: WidgetPriceFilterProps): JSX.Element => {

    const dispatch = useAppDispatch()
    const defaultProducts =  useAppSelector(state => state.products.products);

    const [minRange, setMinRange] = useState<number>(0);
    const [maxRange, setMaxRange] = useState<number>(0);

    // useEffect(() => {
    //     defaultProducts.map((item) => {
    //         maxRange < item.price ? setMaxRange(Number(item.price)) : null;
    //         console.log(item.price)
    //     })
    //     console.log(maxRange)
    // }, [defaultProducts])


    const [minPrice, setMinPrice] = useState<number>(minRange);
    const [maxPrice, setMaxPrice] = useState<number>(3000);


    useEffect(()=> {
        setMinPrice(minRange);
        setMaxPrice(maxRange);
    },[])

    useEffect(() => {
        maxPrice < minPrice ? setMaxPrice(Number(minPrice) + 5) : null;
    }, [maxPrice])

    useEffect(() => {
        minPrice > maxPrice ? setMinPrice(Number(maxPrice) - 5) : null;
        minPrice < 0 ? setMinPrice(0): null;
    }, [minPrice])

    return (
        <div className={styles.rangeSlider}>
            <input className={styles.min} name="range1" type="range" min={minRange} max={maxRange} value={minPrice} onChange={(event) => setMinPrice(Number(event.target.value))}/>
            <input className={styles.max} name="range2" type="range" min={minRange} max={maxRange} value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))}/>
            <span className={cn(styles.range_min, styles.light, styles.left)}>{minPrice} руб</span>
            <span className={cn(styles.range_max, styles.light, styles.right)}>{maxPrice} руб</span>
        </div>
    );
}

export default WidgetPriceFilter;