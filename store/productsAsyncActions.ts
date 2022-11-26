import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../axios/axios";
import { IProduct } from "../interface/entities/interface";
import { ProductsSlice } from "./productsSlice";
import { RootState } from "./rootReducer";


export const fetchAllProducts = createAsyncThunk
<
    IProduct[],
    string,
    { state: { products: ProductsSlice } }
  >
  (
    'products/fetchProducts',
    async () => {
      const response = await getData('/products');
      return await response.data;
    },
    {
      condition: (_, { getState }) => {
        const { status } = getState().products;
       
        status

        if (status === 'loading') {
          return false;
        }
      }
    }
  );