import { createSlice, current } from "@reduxjs/toolkit";
import { useState } from "react";
import data from "../assets/data/orders.json";
import getTimePassedSec from "../refs/getTime";

//초기 상태 정의
const initialState = {
  pending: [],
  current: [],
  schedule: [],
  complete: [],
};

// Redux 슬라이스 생성:
export const OrdersDistrubutionSclie = createSlice({
  name: "ordersDistribution",
  initialState,
  reducers: {
    // handlePending: pending 상태를 초기 데이터로 설정합니다.
    handlePending: (state, action) => {
      state.pending = data.orders;
    },
    // onConfirm: 주문을 확인하고 현재 상태로 이동시킵니다.
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
    //onReady: 주문이 완료되었음을 표시하고 완료 상태로 이동시킵니다
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
    // onSchedule: 주문을 예약 상태로 이동시키고 예약 날짜를 설정합니다.
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
    // onDecline: 주문을 거부하고 pending 상태에서 제거합니다.
    onDecline: (state, action) => {
      const newPendingOrders = state.pending.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.pending = newPendingOrders;
    },
  },
});

// 액션 생성자 함수 내보내기:
export const handlePending = OrdersDistrubutionSclie.actions.handlePending;
export const onConfirm = OrdersDistrubutionSclie.actions.onConfirm;
export const onReady = OrdersDistrubutionSclie.actions.onReady;
export const onSchedule = OrdersDistrubutionSclie.actions.onSchedule;
export const onDecline = OrdersDistrubutionSclie.actions.onDecline;

//리듀서 내보내기
export default OrdersDistrubutionSclie.reducer;
