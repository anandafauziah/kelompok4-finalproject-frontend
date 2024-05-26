import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
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
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = {};
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
