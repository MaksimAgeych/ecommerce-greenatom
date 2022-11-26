import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {withLayout_leftSidebar} from "../layouts/Layout_LeftSidebar";
import { fetchAllProducts } from '../store/productsAsyncActions';
import productsSlice from '../store/productsSlice';
import Cart from "./cart";

function Catalog() : JSX.Element {
    const dispatch = useAppDispatch();
    const getState = useAppSelector(state => state.products)

    useEffect(() => {
    
    fetchAllProducts('/products')
     
  
    },[])
    return (
        <div>
            <Cart/>
            <Cart/>
            <Cart/>
            <Cart/>
            <Cart/>
        </div>
    );
}

export default withLayout_leftSidebar(Catalog);