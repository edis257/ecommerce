import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './reducers/productsSlice';
import productReducer from './reducers/productSlice';

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productList: productReducer,
  },
})

export default store;
