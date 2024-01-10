import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../refs/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import getTimePassedSec from "../refs/getTime";

const OrderCard = ({
  name,
  number,
  orderNumber,
  orders,
  confirmTime,
  status,
  id,
  onPress,
  timeRequire,
  buttons,
  readyTime,
  scheduleFor,
}) => {
  const [timeElapse, setTimeElapsed] = useState(0);
  const handleOnPress = (data) => {
    onPress({ action: data, id: id });
  };
  let tempOrder = ["Cheesburger", "Hamburger", "Coca-Cola", "Pizza"];

    // 배달 시간 나타내주는 친구
  let dynamicChange = {
    backgroundColor: "white",
    color: "black",
  };

    // 경과시간 갱신
  useEffect(() => {
    let timeout = setInterval(() => {
      setTimeElapsed(timeElapse + 1);
    }, 1000);

        // 배달 시간 나타내주는 친구 상태에 따라 색 변경
    return () => clearInterval(timeout);
  }, [timeElapse]);
  const timeRemaining = confirmTime + timeRequire * 60 - getTimePassedSec();

    // 주문이 처리중이고 0이상 5분(300초) 이하일때 주황색으로 표시
    if (timeRemaining < 300 && timeRemaining >= 0 && status === "preparing") {
      dynamicChange.backgroundColor = "orange";
    } 
  
    // 주문이 처리중이고 0아래로 갈때 빨간색으로 표시 
    else if (timeRemaining < 0 && status === "preparing") {
      dynamicChange.backgroundColor = "red";
      dynamicChange.color = "white";
    } 
    // 주문 준비 됐으면 그린
    else if (status === "ready") {
      dynamicChange.backgroundColor = "green";
    } 
    // 주문 스케쥴로 넘어가면 pink
    else if (status === "schedule") {
      dynamicChange.backgroundColor = "pink";
    }


    
  // timeRequire 원래 얼마나 걸리는지
  // timeRemaining 
  // 준비중일때만 sec로 설정
  let topLeft = timeRequire + " mins";
  if (status === "preparing") {
    topLeft = timeRemaining + " secs";
  } 
  else if (status === "schedule") {
    topLeft = scheduleFor;
  }

   // MaterialCommunityIcons 컴포넌트 이용하여 트럭 아이콘 생성하여 변수 timerIcon에 할당하는 부분
  let timerIcon = (
    <MaterialCommunityIcons
      style={[styles.timerText, { color: dynamicChange.color }]}
      name="truck-fast"
      color={colors.white}
      size={26}
    />
  );

  
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
        
        <View style={{ alignItems: "center" }}>
        
          <Text>{status}...</Text>
          
          {status === "preparing" && (
            <Text>경과시간 : {Math.round(timeElapse / 60)} mins</Text>
          )}
          
          {status === "ready" && (
            <Text style={{ color: colors.white }}>
              준비 소요 시간 : {Math.round((readyTime - confirmTime) / 60)} mins
            </Text>
          )}
        </View>
      </View>


      {/* orderNumber가 존재하는 경우, 문자열 "#00"과 orderNumber를 결합하여 반환합니다.
      orderNumber가 존재하지 않는 경우, 문자열 "#000"을 반환합니다
      */}
      <View style={styles.namePhone}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{number}</Text>
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
              <Text style={{ color: colors.white }}>- {order}</Text>
            </View>
          );
        })}
      </View>
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
    backgroundColor: colors.card,
    borderRadius: 20,
  },
  timer: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 15,
  },
  timerText: {
    marginHorizontal: 5,
    fontWeight: "bold",
    // color: colors.white,
  },
  namePhone: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.darkGray,
  },
  orderText: {
    color: colors.lightBlack,
    fontSize: 20,
    fontWeight: "bold",
  },
  orders: {
    borderTopColor: colors.darkGray,
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