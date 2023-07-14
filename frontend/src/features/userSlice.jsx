// frontend\src\features\userSlice.jsx:

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Load user info from local storage if it exists
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: 'idle',
  error: null,
}

// Async action for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/users/login/`, { username, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/users/register/`, { name, email, password });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.userInfo = action.payload;
        state.error = null;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.userInfo = action.payload;
        state.error = null;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
  
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
