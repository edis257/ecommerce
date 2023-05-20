// frontend\src\features\cartSlice.jsx:

import { createSlice } from "@reduxjs/toolkit";

// Load cart state from local storage if it exists
const savedCartItems = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart')).cartItems
  : [];

const initialState = {
  cartItems: savedCartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => 
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
