import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interface/entities/interface";
import { RootState } from "./rootReducer";


type TBasketState = { basket: IProduct[], }


const initialState: TBasketState = {
    basket: [],
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<IProduct>) => {

            const isUnique = state.basket.some((item) => item.id === action.payload.id)

            if (!isUnique) state.basket = [...state.basket, action.payload]

        },
        deleteFromBasket: (state, action: PayloadAction<IProduct>) => {
            state.basket = state.basket.filter(
                (item) => item.id !== action.payload.id
            );
        },

    },
});

export const getBasket = (state: RootState) => state.basket.basket;

export const { addToBasket, deleteFromBasket } = basketSlice.actions; //
export default basketSlice.reducer;