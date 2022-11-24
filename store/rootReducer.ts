import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "./authSlice";
import favorietsSlice from "./favorietsSlice";
import productsSlice from "./productsSlice";

export const store = configureStore(
    {
        reducer: {
            //сюда подключаем готовые редюсерры
            favoriets: favorietsSlice,
            user: authSlice,
            products: productsSlice
        }
    }
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;