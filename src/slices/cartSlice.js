// // src/store/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState }) => {
//   const { token } = getState().auth;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const response = await axios.get(`${backendURL}/cart`);
//   return response.data;
// });

// export const addToCart = createAsyncThunk("cart/addToCart", async (payload, { getState }) => {
//   const { token } = getState().auth;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const response = await axios.post(`${backendURL}/cart`, payload);
//   return response.data;
// });

// export const updateCart = createAsyncThunk("cart/updateCart", async (payload, { getState }) => {
//   const { cartId, productId, quantity } = payload;
//   const { token } = getState().auth;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const response = await axios.put(
//     `${backendURL}/cart/${cartId}`,
//     { product_id: productId, quantity },
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
//   return response.data;
// });

// export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (payload, { getState }) => {
//   const { cartId, productId } = payload;
//   const { token } = getState().auth;
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const response = await axios.delete(`${backendURL}/cart/${cartId}/products/${productId}`);
//   return response.data;
// });

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items = action.payload.cart;
//       })
//       .addCase(updateCart.fulfilled, (state, action) => {
//         state.items = action.payload.cart;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.items = action.payload;
//       });
//   },
// });

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const removeItem = createAsyncThunk("cart/remoteItem", async (payload, { getState }) => {
  const { cartId, productId } = payload;
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.delete(`${backendURL}/cart/${cartId}/products/${productId}`);
  return response.data;
});

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.cart.find((item) => item.cart_items[0].product.id === productId);

      if (existingProduct) {
        state.cart = state.cart.map((item) => {
          if (item.cart_items[0].product.id === productId) {
            return {
              ...item,
              cart_items: [
                {
                  ...item.cart_items[0],
                  quantity: item.cart_items[0].quantity + quantity,
                },
              ],
            };
          }
          return item;
        });
      } else {
        state.cart.push({
          cart_items: [
            {
              product: {
                id: productId,
              },
              quantity: quantity,
            },
          ],
        });
      }
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { setCart, setTotalPrice, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
