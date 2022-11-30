import React, {useState} from 'react';
import {WidgetSearchShopProps} from "./WidgetSearchShop.props";
import {Input} from "../Input/Input";

export const WidgetSearchShop = ({handleFilterSearch, initSearch = ''}: WidgetSearchShopProps): JSX.Element => {

    const [search, setSearch] = useState(initSearch);

    return (
        <Input value={search} onChange={(event) => {
            setSearch(event.target.value);
            handleFilterSearch(event.target.value);
        }} placeholder={'Поиск по товарам...'} />
    );
}

export default WidgetSearchShop;