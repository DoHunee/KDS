// Socket.js

import io from "socket.io-client";
import { Alert } from "react-native";
import { handlePending } from "../store/storeSlice"; // 정확한 이름으로 수정
import { store } from "../store/store";

// 서버 주소를 변수로 분리하여 필요에 따라 쉽게 변경할 수 있도록 했습니다.
const SERVER_URL = "http://211.54.171.41:8025/admin";

const connectToServer = (stCode, posSeq, userId, setData) => {

  const socket = io(SERVER_URL, {
    // reconnection: false, // 자동 재접속 비활성화
    query: {
      stCode,
      posSeq,
      userId,
    },
  });

  socket.on("connect", () => {
    console.log("서버와 연결되었습니다.");
    // 연결되면 필요한 작업 수행
  });

  socket.on("disconnect", () => {
    console.log("서버와의 연결이 끊어졌습니다.");
    // 연결이 끊기면 필요한 작업 수행
  });

  socket.on("open", (data) => {
    console.log("Opening and closing points? : ", data);
    Alert.alert(
      "소켓 데이터 수신", // 알림 창 제목
      `${JSON.stringify(data)}`, // 열기를 원하십니까??
      [
        {
          text: "확인",
          onPress: () => {
            console.log("확인 버튼 클릭됨");
            // "open" 이벤트로 "OK"를 다시 emit
            socket.emit("open", "OK");
          }
        },
        {
          text: "취소",
          onPress: () => console.log("취소 버튼 클릭됨"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  });

  socket.on("test", (orderstatus) => {
    console.log("즉시수령 목록:", orderstatus);
  });

  socket.on("sideMenuSoldOut", (sideMenu) => {
    console.log("사이드 품절:", sideMenu);
  });

  socket.on("mainMenuSoldOut", (mainMenu) => {
    console.log("메인 품절:", mainMenu);
  });

  // 'handlePending' 액션을 디스패치하여 대기 중인 주문 목록을 업데이트합니다.
  socket.on('newOrderCreate', (orderListString) => {
    // 문자열을 JSON 객체로 파싱
    const orderList = JSON.parse(orderListString);
  
    // 파싱된 객체를 배열로 감싸기
    const wrappedOrderList = Array.isArray(orderList) ? orderList : [orderList];
  
    // 원본 형태 확인!
    // console.log(JSON.stringify(wrappedOrderList, null, 2));
    
    store.dispatch(handlePending(wrappedOrderList)); // 배열로 감싼 orderList를 store의 dispatch 함수에 전달
    
    

  });
  
  
  
  return socket; // 생성된 소켓 반환
};


export default connectToServer;
