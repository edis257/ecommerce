import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
  'product/fetchproduct',
  async (keyword = '') => {
    const response = await axios.get(`/api/products/${keyword}`);
    return response.data;
  }
);


const initialState = {
  product: [],
  loading: 'idle',
  error: null
}

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
