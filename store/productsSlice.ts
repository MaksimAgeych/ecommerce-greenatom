import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllProducts } from './productsAsyncActions';
import { IProduct } from "../interface/entities/interface";

export type ProductsSlice = {
    status: 'idle' | 'loading' | 'finished' | 'error',
    products: IProduct[],
    search: IProduct[],
    filtered: IProduct[],
}


const initialState: ProductsSlice = {
    status: 'idle',
    products: [],
    search: [],
    filtered: [],
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload
        },
        clearProducts: (state) => {
            state.products = []
        },
        filteredProduct: (state, action: PayloadAction<IProduct[]>) => {
            state.filtered = action.payload
        },
        clearFilter: (state) => {
            state.filtered = [];
        },
        searchAct: (state, action: PayloadAction<IProduct[]>) => {
            state.search = action.payload
        },
        clearSerch: (state) => {
            state.search = [];
        },
    },
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

export const {filteredProduct, clearFilter, searchAct, clearSerch, addProducts, clearProducts } = productsSlice.actions
export default productsSlice.reducer;