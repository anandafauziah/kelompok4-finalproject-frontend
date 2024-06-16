import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlices";
import userReducer from "../slices/userSlice";
import orderReducer from "../slices/orderSlice";
import provinceReducer from "../slices/provinceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  province: provinceReducer,
});

export default rootReducer;
