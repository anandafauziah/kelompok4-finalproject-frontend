import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchProvince = createAsyncThunk("province/fetchProvince", async () => {
  const response = await axios.get(`${backendURL}/getProvinces`);
  return response.data[0].results;
});

const provinceSlice = createSlice({
  name: "province",
  initialState: {
    provinces: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default provinceSlice.reducer;
