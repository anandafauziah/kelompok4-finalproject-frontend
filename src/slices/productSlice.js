import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
  const response = await axios.get(`${backendURL}/product`);
  return response.data.products;
});

export const getProduct = createAsyncThunk("product/getProduct", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/getProduct`);
  return response.data;
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { productId, productname, name, email, phone } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(
    `${backendURL}/product/${productId}`,
    { productname, name, email, phone },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
