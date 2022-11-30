import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import cn from "classnames";
import styles from "../../layouts/Sidebar/Sidebar.module.css";
import {SidebarWidget} from "../SidebarWidget/SidebarWidget";
import WidgetSearchShop from "../WidgetSearchShop/WidgetSearchShop";
import WidgetPriceFilter from "../WidgetPriceFilter/WidgetPriceFilter";
import {WidgetFilterProps} from "./WidgetFilter.props";
import {IProduct} from "../../interface/entities/interface";
import {filteredProduct} from "../../store/productsSlice";
import {useRouter} from "next/router";

const filtering = (search: string | undefined, minPrice: number | undefined, maxPrice: number | undefined, defaultProducts: IProduct[]) => {
    let searchResult;
    let priceResult;
    if(search) {
        searchResult = defaultProducts.filter((item) => {
            const isFindSearch = item.name.toLowerCase().includes(search.toLowerCase());
            if (isFindSearch) {
                return item
            }
        })
    } else {
        searchResult = defaultProducts;
    }
    if(minPrice && maxPrice) {
        priceResult = searchResult.filter((item) => {
            if (item.price > minPrice && item.price < maxPrice) {
                return item
            }
        })
    } else {
        priceResult = searchResult
    }

    return priceResult;
}

const WidgetFilter = ({className, ...props}: WidgetFilterProps): JSX.Element => {

    const dispatch = useAppDispatch()
    const defaultProducts = useAppSelector(state => state.products.products);
    const router = useRouter();
    //Фильтры
    const [search, setSearch] = useState(String(router.query.search));
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();

    //Получение данных из фильтров
    const handleFilterSearch = (search: React.SetStateAction<string>) => {
        setSearch(search);
    }
    const handleFilterMinPrice = (minPrice: React.SetStateAction<number>) => {
        setMinPrice(Number(minPrice));
    }
    const handleFilterMaxPrice = (maxPrice: React.SetStateAction<number>) => {
        setMaxPrice(Number(maxPrice));
    }

    //Загрузка отфильтрованного товара на страницу
    useEffect(()=> {
        dispatch(filteredProduct(filtering(search, minPrice, maxPrice, defaultProducts)))
    }, [defaultProducts, maxPrice, minPrice, search])

    return (
        <div {...props} className={cn(className)}>
            <div className={styles.sidebar}>
                <SidebarWidget name={"Поиск"}>
                    <WidgetSearchShop
                        initSearch={router.query.search}
                        handleFilterSearch={handleFilterSearch}/>
                </SidebarWidget>
                <SidebarWidget name={"Цена"}>
                    <WidgetPriceFilter
                        handleFilterMaxPrice={handleFilterMaxPrice}
                        handleFilterMinPrice={handleFilterMinPrice}
                    />
                </SidebarWidget>
                <SidebarWidget name={"Категории"}>Контент</SidebarWidget>
                <SidebarWidget name={"Длина ножа"}>Контент</SidebarWidget>
            </div>
        </div>
    );


};

export default WidgetFilter;