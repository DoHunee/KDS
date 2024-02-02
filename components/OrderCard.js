// OrderCard.js
// 주문 카드 나타내주는 칸!
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../refs/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";


const OrderCard = ({
  name,
  hp,
  orderNumber,
  orders,
  status,
  id,
  onPress,
  buttons,
  date
}) => {
  const [timeElapse, setTimeElapsed] = useState(0);  // timeElapsed 상태 변수를 초기화하고, 초깃값으로 0을 설정합니다.
  const handleOnPress = (data) => {
    onPress({ action: data, id: id });
  };
  const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    

  // 배달 시간 나타내주는 네모 창 => 계속 변하는 친구!!!
  let dynamicChange = {
    backgroundColor: "skyblue",
    color: "black",
  };

  // MaterialCommunityIcons 컴포넌트 이용하여 트럭 아이콘 생성하여 변수 timerIcon에 할당하는 부분
  let timerIcon = (
    <MaterialCommunityIcons
      style={[styles.timerText, { color: dynamicChange.color }]}
      name="truck-fast"
      color={colors.white}
      size={26}
    />
  );


    // timeElapse1초씩 경과시간 갱신
  useEffect(() => {
      let timeout = setInterval(() => {
        setTimeElapsed(timeElapse + 1);
      }, 1000);
      return () => clearInterval(timeout);
  }, [timeElapse]);


  let topLeft  // 각 주문카드 왼쪽 상단에 뜨는 친구

  // "주문대기중" 
  if (status === "pending") {
    topLeft ="주문 대기중";
  }
    
  // "경과 시간 : n분 m초 ""
  else if (status === "preparing") {
    
    const elapsedMinutes = Math.floor(timeElapse / 60); // 분 단위
    const elapsedSeconds = Math.round(timeElapse) % 60; // 초 단
    // 경과 시간에 따라 텍스트 생성
    topLeft = `경과시간: ${
      timeElapse < 60 ? `${elapsedSeconds} 초` : `${elapsedMinutes} 분 ${elapsedSeconds} 초`
    }`;
  } 

  // "즉시수령" Pink 
    else if (status === "fast_ready") {
      dynamicChange.backgroundColor = "pink";
      topLeft = "즉시수령";
    } 

  // "취소처리" Red
  else if (status === "decline") {
    dynamicChange.backgroundColor = "red";
    topLeft = "취소처리";
  } 

  // "주문처리완료" 됐으면 Green
  else if (status === "ready") {
    dynamicChange.backgroundColor = "green";
    topLeft = "주문처리완료"    
  } 




  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.timer,
            { backgroundColor: dynamicChange.backgroundColor },
          ]}
        >
          <Text style={[styles.timerText, { color: dynamicChange.color }]}>
          {topLeft}
          </Text>
          {timerIcon}
        </TouchableOpacity>
      </View>

    

      {/* orderNumber가 존재하는 경우, 문자열 "#00"과 orderNumber를 결합하여 반환합니다.
      orderNumber가 존재하지 않는 경우, 문자열 "#000"을 반환합니다
      */}
      <View style={styles.namePhone}>
        <View>
          <Text style={styles.text}>{name} 【{hp}】</Text>
          <Text>{formattedTime}</Text>
        </View>
        <View>
          <Text style={styles.orderText}>
            {orderNumber ? "#00" + orderNumber : "#000"}
          </Text>
        </View>
      </View>
      <View style={styles.orders}>
        {orders.map((order, index) => {
          return (
            <View style={styles.orderItem} key={index}>
              <Text style={{ color: "black" }}> ▶ {order.name}  :  {order.quantity}</Text>  
            </View>
          );
        })}
      </View>
      {/* 주문카드에 버튼부분 */}
      <View style={styles.buttons}>
        {buttons.map((name, index) => {
          return (
            <Button
              onPress={() => handleOnPress(name?.toLowerCase())}
              key={index}
              filled={index % 2 === 0}
              outline={index % 2 !== 0}
            >
              {name}
            </Button>
          );
        })}
      </View>
    </View>
  );
};


export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor:  "white",
    borderRadius: 20,
  },
  timer: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  timerText: {
    marginHorizontal: 5,
    fontWeight: "bold",
    color: "black",
  },
  namePhone: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  orderText: {
    color: colors.lightBlack,
    fontSize: 20,
    fontWeight: "bold",
  },
  orders: {
    borderTopColor: "skyblue",
    borderTopWidth: 2,
    marginTop: 5,
  },
  orderItem: {
    marginTop: 3,
  },
  buttons: {
    marginTop: 20,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});