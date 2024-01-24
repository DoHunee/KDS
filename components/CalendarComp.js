// Screen that displays the calendar
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, LocaleConfig , Agenda } from "react-native-calendars";
import { useSelector } from "react-redux";
import { OrdersDistrubutionSclie } from "../store/storeSlice";

//한국어 세팅
LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "ko"; // set default language

const CalendarComp = ({ onPress }) => {
  const completeOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.complete
  );
  const [markedDates, setMarkedDates] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSales, setTotalSales] = useState(0); // 총 판매 금액 상태 추가


  useEffect(() => {
     // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
     const readyOrders = completeOrders.filter(order => order.status === "fast_ready" || order.status === "ready");
    // markedDates 객체 초기화
    const initialMarkedDates = {};

    // 각 주문에 대해 "date" 속성 값에 해당하는 캘린더 상자에 "sumPrice" 값을 표시
    readyOrders.forEach((order) => {
      const { date, sumPrice } = order;

      // Ensure the markedDates[date] object exists
      initialMarkedDates[date] = initialMarkedDates[date] || {};

      // 달력에 표시할 색 
      initialMarkedDates[date] = { marked: true, dotColor: "blue", sumPrice,};
    });

      // markedDates 상태 업데이트
    setMarkedDates(initialMarkedDates);
  }, [completeOrders]);

  const handleCalenderDay = (day) => {
    // 선택한 날짜에 해당하는 주문 목록 가져오기
    const selectedOrders = completeOrders.filter((order) => order.date === day.dateString);

    // 선택한 날짜의 주문 목록의 총매출액 계산
    const Final_Price = selectedOrders.reduce((total, order) => total + order.sumPrice, 0);      
    
    setTotalSales(Final_Price); // 총 판매 금액 상태 업데이트

    setSelectedOrders(selectedOrders);
    setModalVisible(true);
  };

  // 모달 닫는 부분
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
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
        <View style={styles.modalContainer}>
          {selectedOrders.map((order) => (
            <View key={order.id} style={styles.orderContainer}>
              <View style={styles.orderBackground}>
                <Text style={styles.orderText}>이름: {order.name}</Text>
                <Text style={styles.orderText}>고객번호: {order.number}</Text>
                <Text style={styles.orderText}>가격: {order.sumPrice} 원</Text>
                <Text style={styles.orderText}>
                  주문 목록: {order.orders.join(", ")}
                </Text>
              </View>
            </View>
          ))}

          <Text style={styles.totalSalesText}>
            총매출: {totalSales} 원
          </Text>

          {/* Place the button at the end, separate from the last order list */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    zIndex: 20000,
    position: "absolute",
    width: Dimensions.get("window").width,
    top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
  },
  calendar: {
    borderRadius: 10,
  },
  modalContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10, // Add border property to surround the shape with a rectangle
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 1, // Add border between order lists to distinguish them
    borderRadius: 10, // Add border-radius property to enclose the shape of the rectangle surrounding the order list.
  },
  orderText: {
    marginBottom: 5,
  },
  orderBackground: {
    backgroundColor: "skyblue", // Set the background color of the square surrounding each spell to sky blue
    borderRadius: 10,
    padding: 10,
  },

  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'skyblue', // 버튼을 감싸는 부분을 skyblue로 설정
    padding: 10,
    borderRadius: 10, // border-radius 속성 추가
  },
    buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  
  totalSalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color : "red" ,
  },

});


export default CalendarComp;