import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../interface/entities/interface";
import {RootState} from "./rootReducer";


type TFavState = {
    favorites: IProduct[]
}


const initialState: TFavState = {
    favorites: [],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFav: (state, action: PayloadAction<IProduct>) => {
            let isUnique;
            state.favorites.length !== 0
                ? (
                    isUnique = state.favorites.some((item) => item.id === action.payload.id),
                        !isUnique ? state.favorites = [...state.favorites, action.payload] : null
                )
                : state.favorites = [action.payload];

            // if (isUnique) state.favorites = [...state.favorites, action.payload]

        },
        deleteFav: (state, action: PayloadAction<IProduct>) => {
            state.favorites = state.favorites.filter(
                (item) => item.id !== action.payload.id
            );
        },
        clearFav: (state) => {
            state.favorites = [];
        },
        addManyFav: (state, action: PayloadAction<IProduct[]>) => {
            state.favorites = action.payload
        }

    },
});

export const getFavorites = (state: RootState) => state.favorites.favorites;

export const {addFav, deleteFav, clearFav, addManyFav} = favoritesSlice.actions; //
export default favoritesSlice.reducer;