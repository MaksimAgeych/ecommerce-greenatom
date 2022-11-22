import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

const initialState = {
    currentUser: null,
    setCurrentUser: () => null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})