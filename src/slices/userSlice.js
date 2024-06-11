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

export const updateUser = createAsyncThunk("user/updateUser", async (payload, { getState }) => {
  const { token } = getState().auth;
  const { userId, username, name, email, phone } = payload;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.put(
    `${backendURL}/user/${userId}`,
    { username, name, email, phone },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
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
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
