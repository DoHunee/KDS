// Socket.js

import io from "socket.io-client";

const connectToServer = (stCode, posSeq, userId) => {
  const socket = io("http://10.1.1.13:8025/admin", {
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
  
  // 즉시수령 버튼을 눌러 Test를 수행하고 Test2를 통해 서버에서 받는 부분!!
  socket.on("test2", (updatedOrder) => {
    console.log("주문 상태 업데이트 받음:", updatedOrder);
    });

  
  return socket; // 생성된 소켓 반환
};

export default connectToServer;