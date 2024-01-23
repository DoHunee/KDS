// store.js

import { configureStore } from '@reduxjs/toolkit';
import OrdersDistrubutionSclie from './storeSlice';
import authSlice from '../auth/authSlice'; // authSlice 추가

export const store = configureStore({
  reducer: {
    OrdersDistrubutionSclie: OrdersDistrubutionSclie,
    auth: authSlice, // authSlice 추가
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});