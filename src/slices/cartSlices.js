import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/cart`);
  return response.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { productId, quantity } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.post(`${backendURL}/cart`, { product_id: productId, quantity });
  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { cartId, productId, quantity } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(
    `${backendURL}/cart/${cartId}`,
    { product_id: productId, quantity },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (payload, { getState }) => {
  const { cartId, productId } = payload;
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.delete(`${backendURL}/cart/${cartId}/products/${productId}`);
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
        state.totalPrice = state.carts.reduce((total, cart) => total + cart.total_price, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.carts.push(action.payload.cart);
        state.totalPrice += action.payload.cart.total_price;
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
        const { cartId } = action.payload;
        const cartIndex = state.carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex !== -1) {
          state.totalPrice -= state.carts[cartIndex].total_price;
          state.carts[cartIndex] = action.payload.cart;
          state.totalPrice += action.payload.cart.total_price;
        }
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
        const { cartId, productId } = action.payload;
        const cartIndex = state.carts.findIndex((cart) => cart.id === cartId);
        if (cartIndex !== -1) {
          const cartItemIndex = state.carts[cartIndex].cartItems.findIndex((item) => item.product_id === productId);
          if (cartItemIndex !== -1) {
            state.totalPrice -= state.carts[cartIndex].cartItems[cartItemIndex].total_price;
            state.carts[cartIndex].cartItems.splice(cartItemIndex, 1);
          }
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
