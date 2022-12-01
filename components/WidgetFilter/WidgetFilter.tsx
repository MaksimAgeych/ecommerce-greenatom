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
import WidgetSizeFilter from "../WidgetSizeFilter/WidgetSizeFilter";

const filtering = (sizes: string[] | undefined, search: string | undefined, minPrice: number | undefined, maxPrice: number | undefined, defaultProducts: IProduct[]) => {
    let sizeResult: IProduct[], searchResult: IProduct[], priceResult: IProduct[];

    if (sizes && sizes.length > 0) {
        sizeResult = defaultProducts.filter(product => {
            let isFind: IProduct | undefined;
            sizes.map((size) => {
                if (size === product.size) {
                    isFind = product;
                }
            })
            if(isFind) return isFind
        })
    } else {
        sizeResult = defaultProducts;
    }

    if (search) {
        searchResult = sizeResult.filter((item) => {
            const isFindSearch = item.name.toLowerCase().includes(search.toLowerCase());
            if (isFindSearch) {
                return item
            }
        })
    } else {
        searchResult = sizeResult;
    }
    if (minPrice && maxPrice) {
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

    //Получение поискового запроса из get параметра
    const router = useRouter();
    const initSearch = router.query.search ? String(router.query.search) : '';

    //Фильтры
    const [search, setSearch] = useState(initSearch);
    const [minPrice, setMinPrice] = useState<number>();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [size, setSize] = useState<string[]>();

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
    const handleFilterSize = (size: React.SetStateAction<any>) => {
        setSize(size);
    }


    //Загрузка отфильтрованного товара на страницу
    useEffect(() => {
        dispatch(filteredProduct(filtering(size, search, minPrice, maxPrice, defaultProducts)))
    }, [defaultProducts, dispatch, maxPrice, minPrice, search, size])

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
                <SidebarWidget name={"Размеры"}>
                    <WidgetSizeFilter handleFilterSize={handleFilterSize} product={defaultProducts}/>
                </SidebarWidget>
                <SidebarWidget name={"Длина ножа"}>Контент</SidebarWidget>
            </div>
        </div>
    );


};

export default WidgetFilter;