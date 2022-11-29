import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../interface/entities/interface";
import { ProductsSlice } from "./productsSlice";


export const fetchAllProducts = createAsyncThunk<IProduct[], string, { state: { products: ProductsSlice } }>
    (
        'products/fetchProducts',
        async () => {
            const response = await fetch('http://localhost:4000/products')
            return await response.json();
        },
        {
            condition: (_, { getState }) => {
                const { status } = getState().products;

                if (status === 'loading') {
                    return false;
                }
            }
        }
    );