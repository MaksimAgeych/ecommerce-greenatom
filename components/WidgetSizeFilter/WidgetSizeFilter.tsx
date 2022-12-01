import React, {useEffect, useState} from 'react';
import {WidgetSizeFilterProps} from "./WidgetSizeFilter.props";
import styles from './WidgetSizeFilter.module.css'

export const WidgetSizeFilter = ({handleFilterSize, product}: WidgetSizeFilterProps): JSX.Element => {

    const [sizes, setSizes] = useState<string[]>([]);

    let sizeProduct = Array.from(new Set(product.map((item) => {
        return item.size
    })));

    useEffect(() => handleFilterSize(sizes), [handleFilterSize, sizes])

    return (
        <div className={styles.list}>
            {sizeProduct.map((item) => {
                return (
                    <div key={item} className={styles.itemList}>
                        <input type="checkbox" id={item} name={item} value={item}
                               onChange={(e) => {
                                   sizes.includes(item) ? setSizes(sizes.filter(size => size !== item)) : setSizes(sizes => [...sizes, e.target.value])
                               }
                               }/>
                        <label htmlFor={item}>{item}</label>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetSizeFilter;