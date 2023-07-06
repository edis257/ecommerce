import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProduct = createAsyncThunk(
  'singleProduct/fetchSingleProduct',
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

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default singleProductSlice.reducer;
