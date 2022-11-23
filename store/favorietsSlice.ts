import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interface/entities/interface";
import { RootState } from "./rootReducer";


type TFavState = { favoriets: IProduct[], }


const initialState: TFavState = {
  favoriets: [],
};

export const favorietsSlice = createSlice({
  name: "favoriets",
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<IProduct>) => {

      const isUnique = state.favoriets.some((item) => item.id === action.payload.id)

      if (!isUnique) state.favoriets = [...state.favoriets, action.payload]

    },
    deleteFav: (state, action: PayloadAction<IProduct>) => {
      state.favoriets = state.favoriets.filter(
        (item) => item.id !== action.payload.id
      );
    },

  },
});

export const getFavoriets = (state: RootState) => state.favoriets

export const { addFav, deleteFav } = favorietsSlice.actions; // 
export default favorietsSlice.reducer;