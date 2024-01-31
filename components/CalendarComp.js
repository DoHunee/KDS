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
  Button,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { useSelector } from "react-redux";
import { OrdersDistrubutionSclie } from "../store/storeSlice";
import { Ionicons } from "@expo/vector-icons"; // Expo를 사용하는 경우 필요한 패키지 import

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
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
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
  const [searchOrder, setSearchOrder] = useState(""); // 추가: 주문 번호 검색 상태값
  const scrollViewRef = useRef(null); // scrollViewRef를 선언 및 초기화

  // 해당되는 주문목록 날짜에 dot표시 해주는 부분
  useEffect(() => {
    // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
    const readyOrders = completeOrders.filter(
      (order) => order.status === "fast_ready" || order.status === "ready"
    );

    const initialMarkedDates = {}; // markedDates 객체 초기화

    // 각 주문에 대해 "date" 속성 값에 해당하는 캘린더 상자에 dot 표시하기! (텍스트 표현은 할 수 없네ㅠㅠ )
    readyOrders.forEach((order) => {
      const { date } = order;
      const dateOnly = date.split(" ")[0];

      if (order.id.toString() === searchOrder) {
        initialMarkedDates[dateOnly] = { marked: true, dotColor: "red" };
      } else {
        initialMarkedDates[dateOnly] = { marked: true, dotColor: "blue" };
      }
    });
    setMarkedDates(initialMarkedDates); // markedDates 상태 업데이트
  }, [completeOrders, searchOrder]);

  //월 매출 계산하는 함수!
  const calculateSelectedMonthSales = (selectedMonth) => {
    let totalSales = 0;

    completeOrders.forEach((order) => {
      const month = order.date.substring(0, 7);

      if (month === selectedMonth) {
        totalSales += order.orders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
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
      const dateOnly = order.date.split(" ")[0];
      return dateOnly === day.dateString;
    });

    const selectedMonthOrders = completeOrders.filter((order) => {
      return order.date.substring(0, 7) === selectedMonth;
    });

    const Final_Price = selectedOrders.reduce(
      (total, order) =>
        total +
        order.orders.reduce((sum, item) => sum + item.price * item.quantity, 0),
      0
    );

    setSelectedOrders(selectedOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트
    setselectedMonthOrders(selectedMonthOrders); //당월에 해당하는 주문목록(selectedMonthOrders) 업데이트
    setTotalSales(Final_Price); // 당일총매출(Final_Price) 업데이트

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
  const handleModal = (day) => {
    setModalVisible(true); //모달창이 뜨게 된다!!
  };

  // 모달 닫는 부분
  const closeModal = () => {
    setModalVisible(false);
  };

  // 모달창 내 검색 버튼을 눌렀을 때의 동작을 처리하는 함수
  const handleSearchOrder = () => {
    // 입력된 주문 번호가 없을 경우, 전체 주문 목록을 표시
    if (!searchOrder) {
      setSelectedOrders(completeOrders);
      return;
    }

    const foundOrder = completeOrders.find(
      (order) => order.id.toString() === searchOrder
    );

    if (foundOrder) {
      setSelectedOrders([foundOrder]);
    } else {
      alert("주문을 찾을 수 없습니다.");
    }
  };

  // 스크롤 내리는 함수 정의
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
    // console.log("아래로 이동합니다!");
  };

  // 스크롤 위로 이동하는 함수
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    // console.log("위로 이동합니다!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        {/* 매출 나타내는 부분 */}
        <View style={styles.selectedDateInfoContainer}>
          <Text style={styles.totalSalesText}>
            🔴 선택한 날짜의 총 매출({selectedOrders.length}건): {totalSales} 원
          </Text>
          <Text style={styles.monthlySalesText}>
            🟢 선택한 날짜의 총 월간 매출({selectedMonthOrders.length}건):{" "}
            {selectedMonthSales} 원
          </Text>
          <Button title="상세보기!" onPress={handleModal} />
        </View>

        {/* 캘린더 부분 */}
        <Calendar
          style={styles.calendar}
          markedDates={markedDates} // 변경된 markedDates 객체 전달
          onDayPress={(day) => {
            handleCalenderDay(day); //선택한 날짜의 handleCalenderDay함수 실행
          }}
        />

        {/* 모달창을 나타내는 부분 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.modalContainer}
            contentContainerStyle={styles.modalContentContainer}
          >
            {/* 검색 상자 및 검색 버튼 추가 */}
            <View style={styles.searchContainerModal}>
              <TextInput
                style={styles.searchInputModal}
                placeholder="주문 번호를 입력하세요."
                placeholderTextColor="rgba(0, 0, 0, 0.5)" // 투명한 검정 색상으로 설정
                value={searchOrder}
                onChangeText={(text) => setSearchOrder(text)}
              />
              <TouchableOpacity
                style={styles.searchButtonModal}
                onPress={() => handleSearchOrder()}
              >
                <Text style={styles.searchButtonText}>검색</Text>
              </TouchableOpacity>
            </View>

            {selectedOrders.map((order) => (
              <View key={order.id} style={styles.orderContainer}>
                <View style={styles.orderBackground}>
                  <Text style={styles.orderText}>
                    이름: {order.name} [{order.hp}]
                  </Text>
                  <View style={styles.lineStyle}></View>
                  <Text style={styles.orderText}>주문번호 : {order.id} </Text>
                  <Text style={styles.orderText}>판매시간 : {order.date} </Text>
                  <View style={styles.lineStyle}></View>

                  <Text style={styles.orderText}>
                    [주문 목록]:{"\n\n"}
                    {order.orders.map((item, index) => (
                      <View key={item.name} style={styles.menuItemContainer}>
                        <Text style={styles.menuItemName}>
                          메뉴명: {item.name}
                        </Text>
                        <Text style={styles.menuItemDetail}>
                          수량: {item.quantity} | 금액:{" "}
                          {item.price * item.quantity} 원
                        </Text>
                      </View>
                    ))}
                  </Text>

                  <View style={styles.lineStyle}></View>
                  <Text style={styles.orderText}>
                    총 가격 :{" "}
                    {order.orders.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )}{" "}
                    원
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.buttonContainerModal}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            {/* 위로 이동하는 버튼 */}
            <TouchableOpacity
              style={styles.scrollToTopButton}
              onPress={scrollToTop}
            >
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>
            {/* 아래로 이동하는 버튼 */}
            <TouchableOpacity
              style={styles.scrollToBottomButton}
              onPress={scrollToBottom}
            >
              <Ionicons name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    zIndex: 20000,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height, // 모달이 올라올 때 화면 전체를 꽉 채우도록 설정
    top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
  },

  selectedDateInfoContainer: {
    marginTop: -15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },

  totalSalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e74c3c",
  },

  monthlySalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#27ae60",
  },

  calendar: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  modalContainer: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "white",
    flex: 1,
    paddingBottom: 50,
  },

  modalContentContainer: {
    paddingBottom: 50, // 수정 가능: 닫기 버튼이 화면 하단에 더 많이 표시되도록 조절
  },

  searchContainerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  searchInputModal: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },

  searchButtonModal: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },

  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },

  orderBackground: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },

  orderText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  lineStyle: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  menuItemContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#ecf0f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center", // 수평으로 컨테이너를 가운데 정렬
    marginVertical: Platform.OS === "ios" ? 5 : 10, // 상하 여백 조정 (iOS와 Android에 따라 다르게 설정)
  },

  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItemDetail: {
    fontSize: 16,
  },

  scrollToTopButton: {
    backgroundColor: "skyblue",
    padding: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollToBottomButton: {
    backgroundColor: "skyblue",
    padding: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    flexDirection: "column", // column으로 변경하여 수직으로 배치
    alignItems: "center", // 가운데 정렬
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  buttonContainerModal: {
    marginTop: 0,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
  },
});

export default CalendarComp;
