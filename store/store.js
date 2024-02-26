// store.js

import { configureStore } from '@reduxjs/toolkit';
import OrdersDistrubutionSlice from './storeSlice';
import authSlice from '../auth/authSlice'; // authSlice 추가

export const store = configureStore({
  reducer: {
    OrdersDistrubutionSlice: OrdersDistrubutionSlice,
    auth: authSlice, // authSlice 추가
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});