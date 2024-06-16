import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchOrder = createAsyncThunk("order/fetchOrder", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/order`);
  return response.data;
});

export const createOrder = createAsyncThunk("order/createOrder", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { items, user, amount } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.post(`${backendURL}/order`, { items, user, amount });
  return response.data;
});

export const updateOrder = createAsyncThunk("order/updateOrder", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { orderId, productId, quantity } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(
    `${backendURL}/order/${orderId}`,
    { product_id: productId, quantity },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
});

export const removeFromOrder = createAsyncThunk("order/removeFromOrder", async (payload, { getState }) => {
  const { orderId, productId } = payload;
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.delete(`${backendURL}/order/${orderId}/products/${productId}`);
  return response.data;
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (state.orders.length >= 1) {
          state.orders.push(...state.orders, action.payload.order);
        } else {
          state.orders = action.payload.order;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId } = action.payload;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId);
        if (orderIndex !== -1) {
          state.totalPrice -= state.orders[orderIndex].total_price;
          state.orders[orderIndex] = action.payload.order;
          state.totalPrice += action.payload.order.total_price;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromOrder.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, productId } = action.payload;
        const orderIndex = state.orders.findIndex((order) => order.id === orderId);
        if (orderIndex !== -1) {
          const orderItemIndex = state.orders[orderIndex].orderItems.findIndex((item) => item.product_id === productId);
          if (orderItemIndex !== -1) {
            state.totalPrice -= state.orders[orderIndex].orderItems[orderItemIndex].total_price;
            state.orders[orderIndex].orderItems.splice(orderItemIndex, 1);
          }
        }
      })
      .addCase(removeFromOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
