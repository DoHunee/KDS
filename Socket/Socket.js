// Socket.js

import io from "socket.io-client";

// 서버 주소를 변수로 분리하여 필요에 따라 쉽게 변경할 수 있도록 했습니다.
const SERVER_URL = "http://10.1.1.13:8025/admin";

const connectToServer = (stCode, posSeq, userId) => {

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

  socket.on("soldOutMenuList", (data) => {
    console.log("주문 상태 업데이트 받음:", data);
  });

  return socket; // 생성된 소켓 반환
};


export default connectToServer;
