import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../axios/axios";
import { IProduct } from "../interface/entities/interface";
import { ProductsSlice } from "./productsSlice";
import { RootState } from "./rootReducer";


export const fetchAllProducts = createAsyncThunk
<
    IProduct[],
    string,
    { state: { asyncProducts: ProductsSlice } }
  >
  (
    'products/fetchProducts',
    async (substr: string) => {
      // const response = await fetch('http://localhost:4000/products');
      const response = await getData(substr)
      // return await response.json();
      return await response.data
    },
    {
      condition: (_, { getState }) => {
        const { status } = getState().asyncProducts;
       
        status

        if (status === 'loading') {
          return false;
        }
      }
    }
  );