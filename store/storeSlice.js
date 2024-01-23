import { createSlice } from "@reduxjs/toolkit";
import getTimePassedSec from "../refs/getTime";
import data from "../assets/data/orders.json";

// 초기 상태 정의
const initialState = {
  pending: [], // 대기 목록
  current: [], //현재 주문 목록
  complete: [], //완료 목록

};

// Redux slice 생성
export const OrdersDistrubutionSclie = createSlice({
  name: "ordersDistribution",
  initialState,
  reducers: {

    // 대기 중인 주문 목록을 초기 데이터로 설정
    handlePending: (state, action) => {
      state.pending = data.orders;
    },

    // 주문 확인 및 현재 상태로 이동
    onConfirm: (state, action) => {
      const orders = state.pending;
      const confirmOrder = orders?.find((item) => item.id === action.payload.id);

      confirmOrder.status = "preparing";
      confirmOrder.confirmTime = getTimePassedSec();
      confirmOrder.orderNumber = state.current.length + 1;

      state.current = [...state.current, confirmOrder];
      state.pending = state.pending.filter((item) => item.id !== action.payload.id);
    },
    // "Decline "주문을 거절하고 대기 중 목록에서 제거  state = decline
    onDecline: (state, action) => {
          const orders = state.pending;
          const immediateReceiptOrder = orders?.find((item) => item.id === action.payload.id);
    
          immediateReceiptOrder.status = "decline"; 
    
          immediateReceiptOrder.completeTime = getTimePassedSec();
          immediateReceiptOrder.orderNumber = state.complete.length + 1;
    
          state.complete = [...state.complete, immediateReceiptOrder];
          state.pending = state.pending.filter((item) => item.id !== action.payload.id);
          
          
        },
    // "즉시 수령"에 대한 액션 및 리듀서  state fast_ready
    onImmediateReceipt: (state, action) => {
          const orders = state.pending;
          const immediateReceiptOrder = orders?.find((item) => item.id === action.payload.id);
    
          immediateReceiptOrder.status = "fast_ready"; 
    
          immediateReceiptOrder.completeTime = getTimePassedSec();
          immediateReceiptOrder.orderNumber = state.complete.length + 1;
    
          state.complete = [...state.complete, immediateReceiptOrder];
          state.pending = state.pending.filter((item) => item.id !== action.payload.id);
        },


    
    // 주문이 완료되었음을 나타내고 완료 상태로 이동
    onReady: (state, action) => {
      const orders = state.current;
      const readyOrder = orders.find((item) => item.id === action.payload.id);

      readyOrder.status = "ready";
      readyOrder.readyTime = getTimePassedSec();
      readyOrder.orderNumber = state.complete.length + 1;

      state.complete = [...state.complete, readyOrder];
      state.current = state.current.filter((item) => item.id !== action.payload.id);
    },

     // 주문을 취소하고 대기 중인 목록으로 이동
    onCancel: (state, action) => {
      const orderId = action.payload.id;
      const canceledOrder = state.current.find((order) => order.id === orderId);

      canceledOrder.status = "pending"; // 상태를 "pending"로 변경
      canceledOrder.cancelTime = getTimePassedSec();

      state.pending = [...state.pending, canceledOrder];
      state.current = state.current.filter((order) => order.id !== orderId);
    },

    // 주문을 예약하고 예약된 상태로 이동
    onSales: (state, action) => {
      const orders = state.pending;
      const scheduleOrder = orders?.find((item) => item.id === action.payload.id);

      scheduleOrder.status = "sales";
      scheduleOrder.confirmTime = getTimePassedSec();
      scheduleOrder.orderNumber = state.schedule.length + 1;
      scheduleOrder.scheduleFor = action.payload.schedule;

      state.schedule = [...state.schedule, scheduleOrder];
      state.pending = state.pending.filter((item) => item.id !== action.payload.id);
    },
   
  
  },
});

// Export action creator 함수
export const {
  handlePending,
  onConfirm,
  onDecline,
  onImmediateReceipt,

  onReady,
  onCancel,
  onSales,
  
} = OrdersDistrubutionSclie.actions;

// Reducer를 내보냄
export default OrdersDistrubutionSclie.reducer;