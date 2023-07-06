import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'allProducts/fetchAllProducts',
  async (keyword = '') => {
    const response = await axios.get(`/api/products${keyword}`);
    return response.data;
  }
);

const initialState = {
  products: [],
  loading: 'idle',
  error: null
}

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default allProductsSlice.reducer;
