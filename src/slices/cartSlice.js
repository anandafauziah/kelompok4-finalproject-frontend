// slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const response = await axios.get("http://localhost:8000/api/cart");
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (payload) => {
  const response = await axios.post("http://localhost:8000/api/cart", payload);
  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (payload) => {
  const { cartId, quantity } = payload;
  const response = await axios.put(`http://localhost:8000/api/cart/${cartId}`, { quantity });
  return response.data;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (cartId) => {
  await axios.delete(`http://localhost:8000/api/cart/${cartId}`);
  return cartId;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.carts.findIndex((cart) => cart.id === action.payload.id);
        state.carts[index] = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = state.carts.filter((cart) => cart.id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
