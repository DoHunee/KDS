import { createSlice, current } from "@reduxjs/toolkit";
import { useState } from "react";
import data from "../assets/data/orders.json";
import getTimePassedSec from "../refs/getTime";

const initialState = {
  pending: [],
  current: [],
  schedule: [],
  complete: [],
};

export const OrdersDistrubutionSclie = createSlice({
  name: "ordersDistribution",
  initialState,
  reducers: {
    handlePending: (state, action) => {
      state.pending = data.orders;
    },
    onConfirm: (state, action) => {
      const orders = state.pending;
      const confirmOrder = orders?.find((item) => {
        return item.id === action.payload.id;
      });
      confirmOrder.status = "preparing";
      confirmOrder.confirmTime = getTimePassedSec();
      confirmOrder.orderNumber = state.current.length + 1;
      state.current = [...state.current, confirmOrder];
      const newPendingOrders = state.pending.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.pending = newPendingOrders;
    },
    onReady: (state, action) => {
      const orders = state.current;
      const readyOrder = orders.find((item) => {
        return item.id === action.payload.id;
      });
      readyOrder.status = "ready";
      readyOrder.readyTime = getTimePassedSec();
      readyOrder.orderNumber = state.complete.length + 1;
      state.complete = [...state.complete, readyOrder];
      const newCurrentOrders = state.current.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.current = newCurrentOrders;
    },
    onSchedule: (state, action) => {
      const orders = state.pending;
      const scheduleOrder = orders?.find((item) => {
        return item.id === action.payload.id;
      });
      scheduleOrder.status = "schedule";
      scheduleOrder.confirmTime = getTimePassedSec();
      scheduleOrder.orderNumber = state.schedule.length + 1;
      scheduleOrder.scheduleFor = action.payload.schedule;
      state.schedule = [...state.schedule, scheduleOrder];
      const newPendingOrders = state.pending.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.pending = newPendingOrders;
    },
    onDecline: (state, action) => {
      const newPendingOrders = state.pending.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.pending = newPendingOrders;
    },
  },
});

export const handlePending = OrdersDistrubutionSclie.actions.handlePending;
export const onConfirm = OrdersDistrubutionSclie.actions.onConfirm;
export const onReady = OrdersDistrubutionSclie.actions.onReady;
export const onSchedule = OrdersDistrubutionSclie.actions.onSchedule;
export const onDecline = OrdersDistrubutionSclie.actions.onDecline;

export default OrdersDistrubutionSclie.reducer;
