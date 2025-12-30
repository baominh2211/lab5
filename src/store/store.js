/**
 * Redux Store Configuration
 * Exercise 1.2: The Global Store (Redux Toolkit)
 * Author: Hoang Bao Minh
 */

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
