import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
// import cartReducer from "../slices/cartSlice";
import cartReducer from "../slices/cartSlices";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  // cart: cartReducer,
  cart: cartReducer,
});

export default rootReducer;
