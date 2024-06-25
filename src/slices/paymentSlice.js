import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchPayment = createAsyncThunk("order/fetchOrder", async (_, { getState }) => {
  const { token } = getState().auth;
  const { orders } = getState().order;

  const res = await axios.get(`${backendURL}/getMidtransOrders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const midtrans = res.data;

  const mergedData = orders.map((order) => {
    const matchingMidtrans = midtrans.find((item) => item.order_id === order.order_id);
    return {
      ...order,
      ...matchingMidtrans,
    };
  });

  return mergedData;
});

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
