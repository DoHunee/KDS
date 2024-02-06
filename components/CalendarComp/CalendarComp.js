// CalendarComp.js
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import { useSelector } from "react-redux";
import { commonStyles } from "./style"; // 파일 경로는 실제 파일 위치에 따라 달라질 수 있습니다.
import ModalComp from "./ModalComp";

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

  const [selectedOrders, setSelectedOrders] = useState([]); //선택한날짜의 모든 주문 목록
  const [selecteddeclineOrders, setselecteddeclineOrders] = useState([]); //선택한날짜의 취소처리 주문목록
  const [selectedMonthOrders, setselectedMonthOrders] = useState([]); //선택한날짜가 속한 월에 해당되는 주문목록

  const [seletedtotalSales, setseletedtotalSales] = useState(0); // 선택한 날짜에 대한 전체 판매 금액을 나타내는 변수입니다.
  const [selectedMonthSales, setSelectedMonthSales] = useState(0); // 선택한 월에 대한 전체 판매 금액을 나타내는 변수입니다.
  const [selecteddeclineSales, setselecteddeclineSales] = useState(0); //선택한 날짜에 대한 전체 주문 취소 금액을 나타내는 변수입니다.

  const [modalVisible, setModalVisible] = useState(false); // 모달이 열려있으면 true, 닫혀있으면 false입니다.
  const scrollViewRef = useRef(null); // 스크롤 위치를 조작할 때 사용됩니다.
  const [searchOrder, setSearchOrder] = useState(""); // 주문 번호 검색 상태값으로, 주문 번호를 검색하는데 사용됩니다
  const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜를 나타내는 변수

  const [readyButtonTranslucent, setReadyButtonTranslucent] = useState(false);
  const [declineButtonTranslucent, setDeclineButtonTranslucent] =
    useState(false);

  // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
  const readyOrders = completeOrders.filter(
    (order) => order.status === "fast_ready" || order.status === "ready"
  );

  // 해당되는 주문목록(즉시수령과 주문처리완료만!!! 즉 소득이 있는 날짜만!!!) 날짜에 dot표시 해주는 부분
  useEffect(() => {
    const initialMarkedDates = {}; // markedDates 객체 초기화

    // 각 주문에 대해 "date" 속성 값에 해당하는 캘린더 상자에 dot 표시하기! (텍스트 표현은 할 수 없네ㅠㅠ )
    readyOrders.forEach((order) => {
      const { date } = order;
      const dateOnly = date.split(" ")[0];

      initialMarkedDates[dateOnly] = {
        marked: true,
        dotColor: order.id.toString() === searchOrder ? "red" : "blue",
      };
    });

    setMarkedDates(initialMarkedDates); // Update markedDates status
  }, [completeOrders, searchOrder]);

  //월 매출 계산하는 함수!
  const calculateSelectedMonthSales = (selectedMonth) => {
    let Month_Final_Price = 0;

    const readyOrders = completeOrders.filter(
      (order) => order.status === "fast_ready" || order.status === "ready"
    );

    readyOrders.forEach((order) => {
      const month = order.date.substring(0, 7);

      if (month === selectedMonth) {
        Month_Final_Price += order.orders.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    });

    setSelectedMonthSales(Month_Final_Price);
  };

  // 캘린더에 특정 날짜를 선택하면 실행되는 부분! (당일총액 계산,월총액 계산,선택한 날짜 강조 표시)
  const handleCalenderDay = (day) => {
    const selectedMonth = day.dateString.substring(0, 7); //선택된 날짜에서 연도와 월 정보를 추출
    calculateSelectedMonthSales(selectedMonth); // 해당 월의 매출 총액을 계산하는 부분입니다.

    // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
    const readyOrders = completeOrders.filter(
      (order) => order.status === "fast_ready" || order.status === "ready"
    );

    // "decline" 상태의 주문 목록 필터링
    const declineOrders = completeOrders.filter(
      (order) => order.status === "decline"
    );

    // "fast_ready" 및 "ready" 상태 +  선택한 날짜
    const selectedOrders = readyOrders.filter((order) => {
      const dateOnly = order.date.split(" ")[0];
      return dateOnly === day.dateString;
    });

    // "decline" 상태의 주문 목록 필터링 + 선택한 날짜
    const selecteddeclineOrders = declineOrders.filter((order) => {
      const dateOnly = order.date.split(" ")[0];
      return dateOnly === day.dateString;
    });

    // 선택된 월에 해당하는 주문들
    const selectedMonthOrders = readyOrders.filter((order) => {
      return order.date.substring(0, 7) === selectedMonth;
    });

    //선택된 날짜에 대한 "decline" 상태의 주문들의 전체 취소 금액
    const Decline_Final_Price = selecteddeclineOrders.reduce(
      (total, order) =>
        total +
        order.orders.reduce((sum, item) => sum + item.price * item.quantity, 0),
      0
    );

    //선택된 날짜에 대한 주문 목록(selectedOrders)에서 총 주문 가격
    const Final_Price = selectedOrders.reduce(
      (total, order) =>
        total +
        order.orders.reduce((sum, item) => sum + item.price * item.quantity, 0),
      0
    );

    setSelectedOrders(selectedOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + fast-Ready + Ready
    setselectedMonthOrders(selectedMonthOrders); //당월에 해당하는 주문목록(selectedMonthOrders) 업데이트
    setselecteddeclineOrders(selecteddeclineOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + decline

    setseletedtotalSales(Final_Price); // 당일총매출(Final_Price) 업데이트
    setselecteddeclineSales(Decline_Final_Price); // 당일총취소금액(totalCancellationAmount) 업데이트

    setSelectedDate(day.dateString); // Set the selected date

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

  // 모달창 내 검색 버튼을 눌렀을 때의 동작을 처리하는 함수
  const handleSearchOrder = () => {
    // 만약 주문 번호가 입력되지 않았다면, 선택한 날짜의 전체 주문 목록을 표시합니다.
    if (!searchOrder) {
      const selectedDateOrders = completeOrders.filter((order) => {
        const dateOnly = order.date.split(" ")[0];
        return dateOnly === selectedDate; // selectedDate는 선택한 날짜에 해당합니다.
      });

      // 필터링된 주문 목록 업데이트
      setSelectedOrders(selectedDateOrders);
      setselecteddeclineOrders([]); // 취소된 주문 목록을 초기화 하여 다음 검색때 중복된 값이 안나오게!!

      // 버튼 투명도 설정
      setReadyButtonTranslucent(false);
      setDeclineButtonTranslucent(false);

      return;
    }

    const foundOrder = completeOrders.find(
      (order) => order.id.toString() === searchOrder
    );

    if (foundOrder) {
      // 검색된 주문이 선택한 날짜에 해당하는 경우에만 업데이트
      if (foundOrder.date.split(" ")[0] === selectedDate) {
        setSelectedOrders([foundOrder]);
        setselecteddeclineOrders([]);

        // 버튼 투명도 설정
        if (
          foundOrder.status === "ready" ||
          foundOrder.status === "fast_ready"
        ) {
          setReadyButtonTranslucent(false);
          setDeclineButtonTranslucent(true);
        } else if (foundOrder.status === "decline") {
          setReadyButtonTranslucent(true);
          setDeclineButtonTranslucent(false);
        }
      } else {
        alert("주문을 찾을 수 없습니다.");
      }
    } else {
      // 검색된 주문이 없는 경우 알림 표시
      alert("주문을 찾을 수 없습니다.");

      // 버튼 투명도 초기화
      setReadyButtonTranslucent(false);
      setDeclineButtonTranslucent(false);
    }
  };

  // 선택한 날짜에 해당되는 주문 목록 가져오기
  const getOrdersByDate = (status) => {
    // 해당 상태의 주문 목록 필터링
    const filteredOrders = completeOrders.filter(
      (order) => order.status === status
    );

    // 선택한 날짜에 해당되는 주문 목록만 반환
    return filteredOrders.filter((order) => {
      const dateOnly = order.date.split(" ")[0];
      return dateOnly === selectedDate;
    });
  };

  // 모달창 status 필터링 버튼 클릭에 대한 처리 함수
  const handleOrderStatusButtonClick = (status) => {
    if (status === "ready") {
      setSelectedOrders(
        getOrdersByDate("fast_ready").concat(getOrdersByDate("ready"))
      );
      setselecteddeclineOrders([]);
      setDeclineButtonTranslucent(true); // "취소목록" 버튼을 투명하게 만듭니다.
      setReadyButtonTranslucent(false); // "즉시수령,완료" 버튼의 투명도를 다시 1로 변경합니다.
    } else if (status === "decline") {
      setSelectedOrders([]);
      setselecteddeclineOrders(getOrdersByDate("decline"));
      setReadyButtonTranslucent(true); // "즉시수령,완료" 버튼을 투명하게 만듭니다.
      setDeclineButtonTranslucent(false); // "취소목록" 버튼의 투명도를 다시 1로 변경합니다.
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={commonStyles.container}>
        {/* 매출 나타내는 부분 */}
        <View style={commonStyles.selectedDateInfoContainer}>
          <Text style={commonStyles.totalSalesText}>
            ■ 당일매출금액({selectedOrders.length}건):{"              "}
            {seletedtotalSales} 원
          </Text>
          <Text style={commonStyles.totalSalesText}>
            ■ 당일취소금액({selecteddeclineOrders.length}건):
            {"              "}
            {selecteddeclineSales} 원
          </Text>
          <Text style={commonStyles.monthlySalesText}>
            ■ 당월매출금액({selectedMonthOrders.length}건):{"              "}
            {selectedMonthSales} 원
          </Text>
          <View style={commonStyles.lineStyle}></View>
          <Button title="상세보기!" onPress={handleModal} />
        </View>

        {/* 캘린더 부분 */}
        <Calendar
          style={commonStyles.calendar}
          markedDates={markedDates} // 변경된 markedDates 객체 전달
          onDayPress={(day) => {
            handleCalenderDay(day); //선택한 날짜의 handleCalenderDay함수 실행
          }}
        />

        {/* 모달창을 나타내는 부분 */}
        <ModalComp
          modalVisible={modalVisible}
          closeModal={closeModal}
          scrollViewRef={scrollViewRef}
          searchOrder={searchOrder}
          setSearchOrder={setSearchOrder}
          handleSearchOrder={handleSearchOrder}
          readyButtonTranslucent={readyButtonTranslucent}
          declineButtonTranslucent={declineButtonTranslucent}
          handleOrderStatusButtonClick={handleOrderStatusButtonClick}
          selectedOrders={selectedOrders}
          selecteddeclineOrders={selecteddeclineOrders}
          scrollToBottom={scrollToBottom}
          scrollToTop={scrollToTop}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default CalendarComp;
