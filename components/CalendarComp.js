// 캘린더를 표시하는 화면
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  Button
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useSelector } from "react-redux";
import { OrdersDistrubutionSclie } from "../store/storeSlice";

// 한국어 설정 추가
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
};

LocaleConfig.defaultLocale = 'ko'; // 기본 언어 설정


const CalendarComp = ({ onPress }) => {

  const completeOrders = useSelector((state) => state.OrdersDistrubutionSclie.complete);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  
  useEffect(() => {
    // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
    const readyOrders = completeOrders.filter(order => order.status === "fast_ready" || order.status === "ready");

    // markedDates 객체 초기화
    const initialMarkedDates = {};

    // 각 주문에 대해 "date" 속성 값에 해당하는 캘린더 상자에 "sumPrice" 값을 표시
    readyOrders.forEach(order => {
      const { date, sumPrice } = order;
      initialMarkedDates[date] = { marked: true, dotColor: 'green', sumPrice }; // 적절한 dotColor 및 sumPrice로 설정
    });

    // markedDates 상태 업데이트
    setMarkedDates(initialMarkedDates);
  }, [completeOrders]);

  const handleCalenderDay = (day) => {
        // 선택한 날짜에 해당하는 주문 목록 가져오기
        const selectedOrders = completeOrders.filter(order => order.date === day.dateString);
  
        // 선택한 날짜의 주문 목록의 SumPrice 계산
        const sumPrice = selectedOrders.reduce((total, order) => total + order.sumPrice, 0);
        // Alert 창에 SumPrice 정보 출력
       //  Alert.alert("총매출액은 : ", `${sumPrice}원 입니다!!`);

       setSelectedOrders(selectedOrders);

       setModalVisible(true);
      

    // 캘린더에서 날짜를 선택할 때 수행할 로직을 구현
    // 예를 들어 다른 화면으로 이동하거나 일부 상태를 업데이트할 수 있습니다.
    //console.log("Selected day:", day);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={{
        padding: 10,
        zIndex: 20000,
        position: "absolute",
        width: Dimensions.get("window").width,
        top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
      }}
    >
      <Calendar
        style={{ borderRadius: 10 }}
        markedDates={markedDates}  // 업데이트된 markedDates 객체로 markedDates prop 설정
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >  
     <View style={{ marginTop: 50, padding: 20, backgroundColor: "white", flex: 1 }}>
        {selectedOrders.map(order => (
          <View key={order.id} style={{ marginBottom: 20 }}>
            <Text>이름: {order.name}</Text>
            <Text>고객번호: {order.number}</Text>
            <Text>가격: {order.sumPrice} won</Text>
            <Text>주문목록: {order.orders.join(", ")}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        ))}
      </View>
    </Modal>
  </View>
  );
};


const styles = StyleSheet.create({});


export default CalendarComp;