import React, {useEffect, useState} from 'react';
import {WidgetPriceFilterProps} from "./WidgetPriceFilter.props";
import {useAppSelector} from "../../hooks/redux-hooks";
import styles from './WidgetPriceFilter.module.css';
import cn from "classnames";


export const WidgetPriceFilter = ({
                                      handleFilterMaxPrice,
                                      handleFilterMinPrice,
                                  }: WidgetPriceFilterProps): JSX.Element => {

    const defaultProducts = useAppSelector(state => state.products.products);

    const [minRange, setMinRange] = useState<number>(999999);
    const [maxRange, setMaxRange] = useState<number>(0);

    const [minPrice, setMinPrice] = useState<number>(minRange);
    const [maxPrice, setMaxPrice] = useState<number>(maxRange);

    //Поиск максимума и минимума
    useEffect(() => {
        defaultProducts.map((item) => {
            maxRange < item.price ? setMaxRange(Number(item.price)) : null;
            minRange > item.price ? setMinRange(Number(item.price)) : null;
        })
    }, [maxRange, minRange])


    //Изменение прайса от ползунков
    useEffect(() => {
        setMinPrice(minRange);
        setMaxPrice(maxRange);
    }, [maxRange, minRange])

    useEffect(() => {
        handleFilterMaxPrice(maxPrice);
        handleFilterMinPrice(minPrice);
    }, [maxPrice, minPrice])

    //Не дает сдвинуть ползунок меньше минимума
    useEffect(() => {
        maxPrice < minPrice ? setMaxPrice(Number(minPrice) + 5) : null;
    }, [maxPrice])

    //Не дает сдвинуть ползунок больше максимума
    useEffect(() => {
        minPrice > maxPrice ? setMinPrice(Number(maxPrice) - 5) : null;
        minPrice < 0 ? setMinPrice(0) : null;
    }, [minPrice])

    return (
        <div className={styles.rangeSlider}>
            <input className={styles.min} name="range1" type="range" min={minRange} max={maxRange} value={minPrice}
                   onChange={(event) => {
                       setMinPrice(Number(event.target.value));
                   }}/>
            <input className={styles.max} name="range2" type="range" min={minRange} max={maxRange} value={maxPrice}
                   onChange={(event) => {
                       setMaxPrice(Number(event.target.value));
                   }}/>
            <span className={cn(styles.range_min, styles.light, styles.left)}>{minPrice} руб</span>
            <span className={cn(styles.range_max, styles.light, styles.right)}>{maxPrice} руб</span>
        </div>
    );
}

export default WidgetPriceFilter;