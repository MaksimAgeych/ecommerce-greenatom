import React, {useState} from 'react';
import {WidgetSearchShopProps} from "./WidgetSearchShop.props";
import {Input} from "../Input/Input";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {clearSerch, searchAct} from "../../store/productsSlice";

export const WidgetSearchShop = ({className, ...props}: WidgetSearchShopProps): JSX.Element => {

    const dispatch = useAppDispatch()

    const [search, setSearch] = useState('');
    const defaultProducts = useAppSelector(state => state.products.products);

    const goToSearch = (e: string) => {
        if (!e) {
            return dispatch(clearSerch())
        } else {
            const searchResult = defaultProducts.filter((item) => {
                const isFind = item.name.toLowerCase().includes(e.toLowerCase());
                if (isFind) {
                    return item
                }
            })
            return dispatch(searchAct(searchResult))
        }
    }

    return (
        <Input value={search} onChange={(event) => {
            setSearch(event.target.value);
            goToSearch(event.target.value);
        }} placeholder={'Поиск по товарам...'}/>
    );
}

export default WidgetSearchShop;