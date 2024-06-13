import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expired: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const { token, expired } = action.payload;
      state.token = token;
      state.expired = expired;
    },
    logout: (state) => {
      state.token = null;
      state.expired = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
