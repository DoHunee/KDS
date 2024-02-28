// OrderCard.js
// 주문 카드 나타내주는 칸!
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";

const OrderCard = ({
  STSeq,
  UserName,
  UserHp,
  Details,  //details로 변경하려면 여기를 수정!
  ProcessCode,
  onPress,
  buttons,
  SDTime,
  declineReason,
  OrderKey,
}) => {
  const [timeElapse, setTimeElapsed] = useState(0); // timeElapsed 상태 변수를 초기화하고, 초깃값으로 0을 설정합니다.
  
  // 여기서 data 객체를 구성하고 있는겨!!!
  const handleOnPress = (data) => {
    onPress({ action: data, STSeq: STSeq ,OrderKey : OrderKey });
  };

  const [hours, minutes] = SDTime.split(":").map((num) => parseInt(num, 10));

  // 24시간제를 12시간제로 변환하고, 오전/오후 결정
  const isPM = hours >= 12;
  const formattedHours = hours % 12 || 12; // 0시는 12시(오전)으로, 12시는 12시(오후)로 표시
  const amPm = isPM ? "PM" : "AM";

  // 시간과 분을 "HH:MM AM/PM" 형식의 문자열로 조합
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${amPm}`;

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
      color="white"
      size={26}
    />
  );

  // timeElapse 1초씩 경과시간 갱신
  useEffect(() => {
    let timeout = setInterval(() => {
      setTimeElapsed(timeElapse + 1);
    }, 1000);
    return () => clearInterval(timeout);
  }, [timeElapse]);

  let topLeft; // 각 주문카드 왼쪽 상단에 뜨는 친구

  // "주문대기중"
  if (ProcessCode === "pending") {
    topLeft = "주문 대기중";
  }

  // "경과 시간 : n분 m초 ""
  else if (ProcessCode === "preparing") {
    const elapsedMinutes = Math.floor(timeElapse / 60); // 분 단위
    const elapsedSeconds = Math.round(timeElapse) % 60; // 초 단
    // 경과 시간에 따라 텍스트 생성
    topLeft = `경과시간: ${
      timeElapse < 60
        ? `${elapsedSeconds} 초`
        : `${elapsedMinutes} 분 ${elapsedSeconds} 초`
    }`;
  }

  // "즉시수령" Pink
  else if (ProcessCode === "fast_ready") {
    dynamicChange.backgroundColor = "lightgreen";
    topLeft = "즉시수령";
  }

  // "주문처리완료" 됐으면 Green
  else if (ProcessCode === "ready") {
    dynamicChange.backgroundColor = "green";
    topLeft = "주문처리완료";
  }

  // "거절처리"
  else if (ProcessCode === "decline") {
    dynamicChange.backgroundColor = "pink";
    topLeft = `거절사유: ${declineReason}`; // 거부 이유를 표시
  }

  // 취소처리
  else if (ProcessCode === "cancel") {
    dynamicChange.backgroundColor = "red";
    topLeft = "취소처리";
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
          <Text style={styles.text}>{UserName} 【{UserHp}】</Text>
          <Text>{formattedTime}</Text>
          <Text>OrderKey : {OrderKey}</Text>
          <Text>ProcessCode : {ProcessCode}</Text>  
        </View>
        <View>
          <Text style={styles.orderText}>
            <Text>no.{STSeq}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.Details}>
      {Details && Details.map((order, orderIndex) => {
          return (
            <View style={styles.orderItem} key={orderIndex}>
              <Text style={{ color: "black" }}>
                ▶ {order.MISimpleName} : {order.MICnt}
              </Text>
              {order.SideYN === "Y" &&
                order.SubItems &&
                order.SubItems.length > 0 && (
                  <View style={styles.subItems}>
                    {order.SubItems.map((subItem, subItemIndex) => (
                      <Text style={{ color: "grey" }} key={subItemIndex}>
                        - {subItem.SMISimpleName} : {subItem.SMICnt}
                      </Text>
                    ))}
                  </View>
                )}
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

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "white",
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
    color: "#111",
    fontSize: 20,
    fontWeight: "bold",
  },
  Details: {
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
  subItems: {
    paddingLeft: 20, // 부가 항목을 주문 항목보다 들여쓰기
    paddingTop: 5,
  },
});

export default OrderCard;
