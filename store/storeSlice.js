import { createSlice } from "@reduxjs/toolkit";
import getTimePassedSec from "../refs/getTime";
import data from "../assets/data/orders.json";

// 초기 상태 정의
const initialState = {
  pending: [], // 대기 목록
  current: [], //현재 주문 목록
  complete: [], //완료 목록
  OOrders : []
};

// 새로운 전역 상태 추가
const globalState = {
  // 다른 전역 상태 (예: pending, current)...
  pending: initialState.pending,
  current: initialState.current,
  complete: initialState.complete,
  OOrders : initialState.OOrders,
  
  
};

// Redux slice 생성
export const OrdersDistrubutionSlice = createSlice({
  name: "ordersDistribution",
  initialState: { ...initialState, ...globalState },
  reducers: {

    // orders 배열 업데이트 리듀서
    updateOOrders: (state, action) => {
      // 새로운 주문 목록
      const newOrders = action.payload;
      
      // 중복된 주문을 제거하고 남은 주문만을 새로운 배열에 추가
      const uniqueOrders = newOrders.filter((newOrder) => (
        !state.OOrders.some((existingOrder) => (
          existingOrder.STSeq === newOrder.STSeq
        ))
      ));
      
      // 새로운 배열을 기존 주문 배열에 추가하여 중복 없이 누적
      state.OOrders = [...state.OOrders, ...uniqueOrders];
      
      console.log("OOrders 배열이 업데이트되었습니다:", state.OOrders);
    },

    // 대기 중인 주문 목록을 초기 데이터로 설정
    handlePending: (state, action) => {
      // state.pending = data;
      state.pending = action.payload;
    },

    // 주문 확인 및 현재 상태로 이동
    onConfirm: (state, action) => {
      // 결과 코드가 '00'인 경우에만 실행
      if (action.payload.res_cd === "00") {
        const orders = state.pending;
        const confirmOrder = orders?.find(
          (item) => item.STSeq === action.payload.STSeq
        );

        if (confirmOrder) {
          confirmOrder.ProcessCode = "preparing";
          confirmOrder.confirmTime = getTimePassedSec();
          confirmOrder.orderNumber = state.current.length + 1;

          state.current = [...state.current, confirmOrder];
          state.pending = state.pending.filter(
            (item) => item.STSeq !== action.payload.STSeq
          );
        }
      } else {
        // 결과 코드가 '00'이 아닌 경우의 처리 로직 (옵션)
        console.error(
          "고객님에게 알람이 가지 않았군요!",
          action.payload.res_msg
        );
      }
    },

    // "Decline "주문을 거절하고 대기 중 목록에서 제거  state = decline
    onDecline: (state, action) => {
      // 결과 코드가 '00'인 경우에만 실행
      if (action.payload.res_cd === "00") {
        const orders = state.pending;
        const declineOrder = orders?.find(
          (item) => item.STSeq === action.payload.STSeq
        );
    
        // 거절 사유를 받아옴
        const declineReason = action.payload?.declineReason;
    
        // 거절 사유와 관계없이 ProcessCode를 'decline'으로 설정
        declineOrder.ProcessCode = "decline";
    
        declineOrder.cancelTime = getTimePassedSec(); // 현재 시간을 기준으로 취소 시간 설정
        declineOrder.orderNumber = state.complete.length + 1; // 새로운 완료 주문 번호 설정
    
        // 취소 사유 저장
        declineOrder.declineReason = declineReason;
    
        // 완료된 주문 목록에 추가하고, 대기 중인 주문 목록에서 제거
        state.complete = [...state.complete, declineOrder];
        state.pending = state.pending.filter(
          (item) => item.STSeq !== action.payload.STSeq
        );
      } else {
        // 결과 코드가 '00'이 아닌 경우의 처리 로직 (옵션)
        console.error("주문 거절 실패:", action.payload.res_msg);
      }
    },

    // "즉시 수령"에 대한 액션 및 리듀서  state fast_ready
    onImmediateReceipt: (state, action) => {
      // 결과 코드가 '00'인 경우에만 실행
      if (action.payload.res_cd === "00") {
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
      } else {
        // 결과 코드가 '00'이 아닌 경우의 처리 로직 (옵션)
        console.error("즉시 수령 처리 실패:", action.payload.res_msg);
      }
    },

    // 주문이 완료되었음을 나타내고 완료 상태로 이동
    onReady: (state, action) => {
      // 결과 코드가 '00'인 경우에만 실행
      if (action.payload.res_cd === "00") {
        const orders = state.current;
        const readyOrder = orders.find(
          (item) => item.STSeq === action.payload.STSeq
        );

        readyOrder.ProcessCode = "ready";
        readyOrder.readyTime = getTimePassedSec();
        readyOrder.orderNumber = state.complete.length + 1;

        state.complete = [...state.complete, readyOrder];
        state.current = state.current.filter(
          (item) => item.STSeq !== action.payload.STSeq
        );
      } else {
        // 결과 코드가 '00'이 아닌 경우의 처리 로직 (옵션)
        console.error("주문 준비 완료 처리 실패:", action.payload.res_msg);
      }
    },

    // 주문 취소하고 완료 목록에 이동
    onCancel: (state, action) => {
      // 결과 코드가 '00'인 경우에만 실행
      if (action.payload.res_cd === "00") {
        const orders = state.current;
        const canceledOrderIndex = orders.findIndex(
          (item) => item.STSeq === action.payload.STSeq
        );
        
        // 취소 사유를 받아옴
        const cancellationReason = action.payload.cancellationReason;
        
        if (canceledOrderIndex !== -1) {
          // 취소된 주문 객체 복사 및 수정
          const canceledOrder = { ...orders[canceledOrderIndex] };
          canceledOrder.ProcessCode = "cancel";
          canceledOrder.cancelTime = getTimePassedSec();
          canceledOrder.cancellationReason = cancellationReason;
          
          // 취소된 주문을 완료 배열에 추가
          state.complete.push(canceledOrder);
          
          // 현재 주문 목록에서 해당 주문 제거
          state.current.splice(canceledOrderIndex, 1);
        }
      } else {
        // 결과 코드가 '00'이 아닌 경우의 처리 로직 (옵션)
        console.error('주문 취소 처리 실패:', action.payload.res_msg);
      }
    },

    // 모달창에서 주문 결제 취소할때!! status만 cancel로 변경!!
    onCancelCompleteOrder: (state, action) => {
      if (action.payload.res_cd === "00") {
        const orderIndex = state.complete.findIndex(order => order.STSeq === action.payload.STSeq);
        if (orderIndex !== -1) {
          const order = state.complete[orderIndex];
          if (order.ProcessCode === "cancel") {
          } else if (order.ProcessCode === "ready" || order.ProcessCode === "fast_ready") {
            order.ProcessCode = "cancel";
            order.cancellationReason = action.payload.cancellationReason || "사유 미제공";   
          }
        }
      } else {
        console.error('완료된 주문 취소 처리 실패:', action.payload.res_msg);
      }
    },

  },
});

// Export action creator 함수
export const {
  updateOOrders,
  handlePending,
  onConfirm,
  onDecline,
  onImmediateReceipt,
  onReady,
  onCancel,
  onCancelCompleteOrder,
} = OrdersDistrubutionSlice.actions;

// Reducer를 내보냄
export default OrdersDistrubutionSlice.reducer;
