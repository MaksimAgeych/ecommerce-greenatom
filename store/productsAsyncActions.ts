import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../interface/entities/interface";
import { ProductsSlice } from "./productsSlice";

export const fetchAllProducts = createAsyncThunk<
  IProduct[],
  undefined,
  { state: { asyncProducts: ProductsSlice }}
>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:4000/products');
    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().asyncProducts;

      if (status === 'loading') {
        return false;
      }
    }
  }
);