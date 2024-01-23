// store.js

import { configureStore } from '@reduxjs/toolkit';
import OrdersDistrubutionSclie from './store-slice';
import authSlice from './authSlice'; // authSlice 추가

export const store = configureStore({
  reducer: {
    OrdersDistrubutionSclie: OrdersDistrubutionSclie,
    AuthSlice: authSlice, // authSlice 추가
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});