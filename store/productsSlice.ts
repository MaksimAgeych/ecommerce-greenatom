import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllProducts } from './productsAsyncActions';
import { IProduct } from "../interface/entities/interface";

export type ProductsSlice = { 
    status: 'idle' | 'loading' | 'finished' | 'error',
    products: IProduct[], 
}


const initialState: ProductsSlice = {
    status: 'idle',
    products: [],
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchAllProducts.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.status = "finished";
            state.products = action.payload;
        })
        .addCase(fetchAllProducts.rejected, (state) => {
            state.status = "error";
        })
    } 
});

export default productsSlice.reducer;