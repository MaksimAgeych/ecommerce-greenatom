import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import favoritesSlice from "./favoritesSlice";
import productsSlice from "./productsSlice";
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import basketSlice from "./basketSlice";

const rootReducer = combineReducers({
    favorites: favoritesSlice,
    user: authSlice,
    products: productsSlice,
    basket: basketSlice,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    }
);

export const persister = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;