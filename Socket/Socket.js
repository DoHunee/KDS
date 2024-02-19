// Socket.js

import io from "socket.io-client";
import { Alert } from "react-native";

// 서버 주소를 변수로 분리하여 필요에 따라 쉽게 변경할 수 있도록 했습니다.
const SERVER_URL = "http://211.54.171.41:8025/admin";

const connectToServer = (stCode, posSeq, userId, setData) => {

  const socket = io(SERVER_URL, {
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
    // 알림 창 표시를 위해 메인 스레드에서 실행되어야 함
    // setTimeout을 사용하여 메인 스레드로의 실행을 보장
    setTimeout(() => {
      console.log("Opening and closing points? : ", data);
      Alert.alert(
        "소켓 데이터 수신", // 알림 창 제목
        `수신된 데이터: ${JSON.stringify(data)}`, // 알림 창 내용
        [
          { text: "확인", onPress: () => console.log("확인 버튼 클릭됨") }
        ],
        { cancelable: false }
      );
    }, 0);
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
  
  
  
  return socket; // 생성된 소켓 반환
};


export default connectToServer;
