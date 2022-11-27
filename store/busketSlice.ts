import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interface/entities/interface";
import { RootState } from "./rootReducer";


type TBusketState = { busket: IProduct[], }


const initialState: TBusketState = {
    busket: [],
};

export const busketSlice = createSlice({
    name: "busket",
    initialState,
    reducers: {
        addToBusket: (state, action: PayloadAction<IProduct>) => {

            const isUnique = state.busket.some((item) => item.id === action.payload.id)

            if (!isUnique) state.busket = [...state.busket, action.payload]

        },
        deleteFromBusket: (state, action: PayloadAction<IProduct>) => {
            state.busket = state.busket.filter(
                (item) => item.id !== action.payload.id
            );
        },

    },
});

export const getFavoriets = (state: RootState) => state.favoriets

export const { addToBusket, deleteFromBusket } = busketSlice.actions; // 
export default busketSlice.reducer;