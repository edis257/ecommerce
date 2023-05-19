import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
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

const productsSlice = createSlice({
  name: 'productsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
