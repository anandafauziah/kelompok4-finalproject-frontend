import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  expired: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      const { token, expired } = action.payload;
      state.token = token;
      state.expired = expired;
    },
    logout: (state) => {
      state.token = null;
      state.expired = null;
      state.user = {};
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
