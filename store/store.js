import { configureStore } from "@reduxjs/toolkit";

import OrdersDistrubutionSclie from "./store-slice";
export const store = configureStore({
  reducer: {
    OrdersDistrubutionSclie: OrdersDistrubutionSclie,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});