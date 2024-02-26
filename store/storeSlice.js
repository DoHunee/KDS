import { createSlice } from "@reduxjs/toolkit";
import getTimePassedSec from "../refs/getTime";
import data from "../assets/data/orders.json";

// 초기 상태 정의
const initialState = {
  pending: [], // 대기 목록
  current: [], //현재 주문 목록
  complete: [], //완료 목록
};

// 새로운 전역 상태 추가
const globalState = {
  // 다른 전역 상태 (예: pending, current)...
  complete: initialState.complete,
  pending : initialState.pending
};

// Redux slice 생성
export const OrdersDistrubutionSlice = createSlice({
  name: "ordersDistribution",
  initialState: { ...initialState, ...globalState },
  // initialState,
  reducers: {
  
    // 대기 중인 주문 목록을 초기 데이터로 설정
    handlePending: (state, action) => {
      state.pending = data;

      // console.log("Before update:", state.pending);
      // state.pending = action.payload;
      // console.log("After update:", state.pending);
    
    },

    // 주문 확인 및 현재 상태로 이동
    onConfirm: (state, action) => {
      const orders = state.pending;
      const confirmOrder = orders?.find(
        (item) => item.STSeq === action.payload.STSeq
      );

      confirmOrder.ProcessCode = "preparing";
      confirmOrder.confirmTime = getTimePassedSec();
      confirmOrder.orderNumber = state.current.length + 1;

      state.current = [...state.current, confirmOrder];
      state.pending = state.pending.filter(
        (item) => item.STSeq !== action.payload.STSeq
      );
    },

    // "Decline "주문을 거절하고 대기 중 목록에서 제거  state = decline
    onDecline: (state, action) => {
      const orders = state.pending;
      const declineOrder = orders?.find((item) => item.STSeq === action.payload.STSeq);

       // 거절 사유를 받아옴
       const declineReason = action.payload?.declineReason;

      // 취소 사유에 따라 상태 설정
      if (
        declineReason === "재료소진" ||
        declineReason === "품절"
      ) {
        declineOrder.ProcessCode = "decline";
      }
      declineOrder.cancelTime = getTimePassedSec();
      declineOrder.orderNumber = state.complete.length + 1;
      
      // 취소 사유 저장
      declineOrder.declineReason = declineReason;

      state.complete = [...state.complete, declineOrder];
      state.pending = state.pending.filter(
        (item) => item.STSeq !== action.payload.STSeq
      );
    },

    // "즉시 수령"에 대한 액션 및 리듀서  state fast_ready
    onImmediateReceipt: (state, action) => {
      const orders = state.pending;
      const immediateReceiptOrder = orders?.find(
        (item) => item.STSeq === action.payload.STSeq
      );

      immediateReceiptOrder.ProcessCode = "fast_ready";

      immediateReceiptOrder.completeTime = getTimePassedSec();
      immediateReceiptOrder.orderNumber = state.complete.length + 1;

      state.complete = [...state.complete, immediateReceiptOrder];
      state.pending = state.pending.filter(
        (item) => item.STSeq !== action.payload.STSeq
      );
    },

    // 주문이 완료되었음을 나타내고 완료 상태로 이동
    onReady: (state, action) => {
      const orders = state.current;
      const readyOrder = orders.find((item) => item.STSeq === action.payload.STSeq);

      readyOrder.ProcessCode = "ready";
      readyOrder.readyTime = getTimePassedSec();
      readyOrder.orderNumber = state.complete.length + 1;

      state.complete = [...state.complete, readyOrder];
      state.current = state.current.filter(
        (item) => item.STSeq !== action.payload.STSeq
      );
    },

    // 주문 취소하고 완료 목록에 이동
    onCancel: (state, action) => {
      const orderId = action.payload.STSeq;
      const canceledOrder = state.current.find((order) => order.STSeq === orderId);

      // 취소 사유를 받아옴
      const cancellationReason = action.payload.cancellationReason;

      // 취소 사유에 따라 상태 설정
      if (
        cancellationReason === "고객 요청에 따른 취소" ||
        cancellationReason === "가게 사정에 따른 취소"
      ) {
        canceledOrder.ProcessCode = "cancel";
      }
      canceledOrder.cancelTime = getTimePassedSec();

      // 취소 사유 저장
      canceledOrder.cancellationReason = cancellationReason;

      // 취소된 주문을 완료 배열에 추가
      state.complete = [...state.complete, canceledOrder];
      state.current = state.current.filter(
        (item) => item.STSeq !== action.payload.STSeq
      );

      // 현재 주문 목록에서 해당 주문 제거
      state.current = state.current.filter((order) => order.STSeq !== orderId);
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
  onCancel
} = OrdersDistrubutionSlice.actions;

// Reducer를 내보냄
export default OrdersDistrubutionSlice.reducer;
