// Socket.js

import io from "socket.io-client";
import { Alert } from "react-native";
import { handlePending } from "../store/storeSlice"; // 정확한 이름으로 수정
import { store } from "../store/store";

// 서버 주소를 변수로 분리하여 필요에 따라 쉽게 변경할 수 있도록 했습니다.
const SERVER_URL = "http://211.54.171.41:8025/admin";
// 주문 데이터를 저장할 배열
let orderListArray = [];

const connectToServer = (stCode, posSeq, userId) => {

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
    // console.log("Opening and closing points? : ", data);
    Alert.alert(
      "< OPEN >", // 알림 창 제목
      "개점을 원하십니까?", // 열기를 원하십니까??
      [
        {
          text: "확인",
          onPress: () => {
            console.log("확인 버튼 클릭됨");
            // "open" 이벤트로 "OK"를 다시 emit
            socket.emit("open", "OK");
          },
        },
        {
          text: "취소",
          onPress: () => console.log("취소 버튼 클릭됨"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  });

  // 'handlePending' 액션을 디스패치하여 대기 중인 주문 목록을 업데이트합니다.
  socket.on('newOrderCreate', (orderListString) => {
    // 문자열을 JSON 객체로 파싱
    const newOrderList = JSON.parse(orderListString);
  
    // 파싱된 객체를 배열로 감싸기
    const wrappedNewOrderList = Array.isArray(newOrderList) ? newOrderList : [newOrderList];
  
    // 새 주문 데이터가 기존 주문 목록에 이미 존재하는지 확인
    const isDuplicate = wrappedNewOrderList.every(newOrder => 
      orderListArray.some(existingOrder => JSON.stringify(existingOrder) === JSON.stringify(newOrder))
    );
  
    if (isDuplicate) {
      // 모든 새 주문이 기존 주문 목록에 존재한다면 콘솔에 메시지 출력하고 여기서 중단
      console.log("중복된 주문입니다");
    } else {
      // 중복되지 않은 새 주문이 있으면 기존 주문 목록에 추가
      // orderListArray = [...wrappedNewOrderList]; // 기존 주문 목록을 새 주문 목록으로 대체
      orderListArray = [...orderListArray, ...wrappedNewOrderList]; // 기존 주문 목록에 새 주문 목록을 추가   
      
      // console.log("콘솔로 온 데이터",wrappedNewOrderList);
      // console.log("디스패칭할  데이터",orderListArray);
  
      // 새 주문 알림 표시
      Alert.alert(
        "새 주문 알림",
        "새로운 주문이 도착했습니다!",
        [{
            text: "확인",
            onPress: () => console.log("새 주문 확인"),
        }],
        { cancelable: false }
      );
  
      // store의 dispatch 함수를 사용하여 상태 업데이트
      store.dispatch(handlePending(orderListArray));
    }
  });

  return socket; // 생성된 소켓 반환
};


export default connectToServer;
