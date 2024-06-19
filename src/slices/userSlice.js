import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/user`);
  return response.data;
});

export const getUser = createAsyncThunk("user/getUser", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/getUser`);
  return response.data;
});

export const getAdmin = createAsyncThunk("user/getAdmin", async (_, { getState }) => {
  const { token } = getState().auth;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.get(`${backendURL}/getAdmin`);
  return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (payload) => {
  return payload;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    admin: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
