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
  Button
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
  const [selectedMonthOrders, setselectedMonthOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSales, setTotalSales] = useState(0); // 총 판매 금액 상태 추가
  const [selectedMonthSales, setSelectedMonthSales] = useState(0);
  

  // 해당되는 주문목록 날짜에 dot표시 해주는 부분
  useEffect(() => {
    // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
    const readyOrders = completeOrders.filter(order => order.status === "fast_ready" || order.status === "ready");
     
    // markedDates 객체 초기화
    const initialMarkedDates = {};

    // 각 주문에 대해 "date" 속성 값에 해당하는 캘린더 상자에 dot 표시하기! (텍스트 표현은 할 수 없네ㅠㅠ )
    readyOrders.forEach((order) => {
      const { date } = order;

       // Extract only the date part from the timestamp
      const dateOnly = date.split(' ')[0];

      initialMarkedDates[dateOnly] = initialMarkedDates[dateOnly] || {};  // Ensure the markedDates[date] object exists
      initialMarkedDates[dateOnly] = { marked: true, dotColor: "blue"}; // 달력에 표시할 색 
    });
    setMarkedDates(initialMarkedDates); // markedDates 상태 업데이트
  }, [completeOrders]);


  //월 매출 계산하는 함수!
  const calculateSelectedMonthSales = (selectedMonth) => {
    let totalSales = 0;

    completeOrders.forEach((order) => {
      const month = order.date.substring(0, 7);

      if (month === selectedMonth) {
        totalSales += order.sumPrice;
      }
    });

    setSelectedMonthSales(totalSales);
  };

  // 캘린더에 특정 날짜를 선택하면 실행되는 부분! (당일총액 계산,월총액 계산,선택한 날짜 강조 표시)
  const handleCalenderDay = (day) => {
    const selectedMonth = day.dateString.substring(0, 7); //선택된 날짜에서 연도와 월 정보를 추출
    calculateSelectedMonthSales(selectedMonth); // 해당 월의 매출 총액을 계산하는 부분입니다.

    const selectedOrders = completeOrders.filter((order) => {
      // Extract only the date part from the timestamp
      const dateOnly = order.date.split(' ')[0];
      return dateOnly === day.dateString;
    });
    const selectedMonthOrders = completeOrders.filter((order) => {
      return order.date.substring(0, 7) === selectedMonth;
    });
    const Final_Price = selectedOrders.reduce((total, order) => total + order.sumPrice,0);

    setSelectedOrders(selectedOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트
    setselectedMonthOrders(selectedMonthOrders); //당월에 해당하는 주문목록(selectedMonthOrders) 업데이트
    setTotalSales(Final_Price);// 당일총매출(Final_Price) 업데이트
   
    
    // markedDates 객체 업데이트: 모든 날짜의 강조 해제, 선택된 날짜를 특정 색으로 표시
    const updatedMarkedDates = {};
    Object.keys(markedDates).forEach((date) => {
    updatedMarkedDates[date] = {
      ...markedDates[date],
      selected: false,
      selectedColor: undefined,
    };
    });
    updatedMarkedDates[day.dateString] = {
    ...updatedMarkedDates[day.dateString],
    selected: true,
    selectedColor: "black",
    };

  setMarkedDates(updatedMarkedDates);

  };

  // 모달창 띄우기!!
  const handleModal= (day) => {
    setModalVisible(true); //모달창이 뜨게 된다!!
  };

  // 모달 닫는 부분
  const closeModal = () => {
    setModalVisible(false);
  };

  //Return
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates} // 변경된 markedDates 객체 전달
        onDayPress={(day) => {
          handleCalenderDay(day); //선택한 날짜의 handleCalenderDay함수 실행
        }}
      />

      
        <View style={styles.selectedDateInfoContainer}>
        <Text style={styles.totalSalesText}>
          🔴 선택한 날짜의 총 매출({selectedOrders.length}건): {totalSales} 원  
          </Text>
          <Text style={styles.monthlySalesText}>
          🟢 선택한 날짜의 총 월간 매출({selectedMonthOrders.length}건): {selectedMonthSales} 원 
          </Text>
          <Button title="상세보기!" onPress={handleModal} />
        </View>
     
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
                <Text style={styles.orderText}>Name: {order.name}</Text>
                <Text style={styles.orderText}>Customer number: {order.number}</Text>
                <Text style={styles.orderText}>Price: {order.sumPrice} 원</Text>
                <Text style={styles.orderText}>
                  Order list: {order.orders.join(", ")}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectedDateInfoContainer}>
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
    borderRadius: 10,
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  orderText: {
    marginBottom: 5,
  },
  orderBackground: {
    backgroundColor: "skyblue",
    borderRadius: 10,
    padding: 10,
  },

  buttonContainer: {
    marginTop: 20,
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 10,
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
    color: "red",
  },

  monthlySalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },

  selectedDateInfoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

});


export default CalendarComp;