import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './features/allProductsSlice';
import productReducer from './features/singleProductSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productList: productReducer,
    cart: cartReducer,
    user: userReducer,
  },
})

// Save cart state to local storage whenever it changes
store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});


export default store;
