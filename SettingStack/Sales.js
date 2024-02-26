// Sales.js
import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

import ModalComp from "../SalesComponents/ModalComp";
import SalesComp from "../SalesComponents/SalesComp";
import CalendarComp from "../SalesComponents/CalendarComp";

const Sales = () => {
  const completeOrders = useSelector(
    (state) => state.OrdersDistrubutionSlice.complete
  ); // useSelector를 사용하여 complete 상태 가져오기
  const readyOrders = completeOrders.filter(
    (order) =>
      order.ProcessCode === "fast_ready" ||
      order.ProcessCode === "ready" ||
      order.ProcessCode === "cancel"
  ); // "fast_ready" 및 "ready" 상태의 주문 목록 필터링

  // 모든 주문이 "cancel" 상태인지 확인합니다.
  const hasOnlyCancelOrders = completeOrders.every(
    (order) => order.ProcessCode === "cancel"
  );
  //cancel 목록만!

  const [markedDates, setMarkedDates] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]); //선택한날짜의 모든 주문 목록
  const [selectedcancelOrders, setselectedcancelOrders] = useState([]); //선택한날짜의 취소처리 주문목록
  const [selectedMonthOrders, setselectedMonthOrders] = useState([]); //선택한날짜가 속한 월에 해당되는 주문목록

  const [selectedOrdersSales, setselectedOrdersSales] = useState(0); // 선택한 날짜에 대한 전체 판매 금액을 나타내는 변수입니다.
  const [selectedcancelSales, setselectedcancelSales] = useState(0); //선택한 날짜에 대한 전체 주문 취소 금액을 나타내는 변수입니다.
  const [selectedMonthSales, setSelectedMonthSales] = useState(0); // 선택한 월에 대한 전체 판매 금액을 나타내는 변수입니다.

  const scrollViewRef = useRef(null); // 스크롤 위치를 조작할 때 사용됩니다.
  const [searchOrder, setSearchOrder] = useState(""); // 주문 번호 검색 상태값으로, 주문 번호를 검색하는데 사용됩니다
  const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜를 나타내는 변수

  const [modalVisible, setModalVisible] = useState(false); // 모달이 열려있으면 true, 닫혀있으면 false입니다.
  const [readyButtonTranslucent, setReadyButtonTranslucent] = useState(false);
  const [cancelButtonTranslucent, setDeclineButtonTranslucent] =useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [current, setCurrent] = useState(); // 현재 캘린더의 월을 관리하는 상태
  const [calendarKey, setCalendarKey] = useState("calendar"); // 캘린더 컴포넌트의 키를 관리하는 상태
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // 날짜 선택 모달의 표시 상태를 관리하기 위한 상태

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // 로그인 관련
  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  // 해당되는 주문목록(즉시수령과 주문처리완료만!!! 즉 소득이 있는 날짜만!!!) 날짜에 dot표시 해주는 부분
  useEffect(() => {
    const initialMarkedDates = {}; // markedDates 객체 초기화

    // 각 주문에 대해 "SDDate" 속성 값에 해당하는 캘린더 상자에 dot 표시하기! (텍스트 표현은 할 수 없네ㅠㅠ )
    readyOrders.forEach((order) => {
      const { SDDate } = order;
      const dateOnly = SDDate.split(" ")[0];

      // 해당 날짜에 대한 주문 목록이 모두 "cancel" 상태이고 그 주문이 존재하는 경우에만 빨간색으로 설정합니다.
      initialMarkedDates[dateOnly] = {
        marked: true,
        dotColor:
          hasOnlyCancelOrders && order.ProcessCode === "cancel"
            ? "red"
            : "blue",
      };
    });

    setMarkedDates(initialMarkedDates); // Update markedDates ProcessCode
  }, [completeOrders]);

  // 날짜 범위에 해당하는 주문 목록 필터링 및 표시
  const handleCalendarSelection = (startDay, endDay = startDay) => {
    setSelectedStartDate(startDay); // 선택한 시작 날짜 상태 업데이트
    setSelectedEndDate(endDay); // 선택한 종료 날짜 상태 업데이트

    // 시작 날짜가 속한 월로 캘린더 이동
    setCurrent(startDay);
    setCalendarKey(`calendar-${new Date().getTime()}`); // 캘린더 컴포넌트의 key 업데이트

    // 선택된 날짜 범위에 해당하면서 'ready' 또는 'fast_ready' 상태의 주문 목록 필터링
    const filteredOrders = completeOrders.filter((order) => {
      const orderDate = order.SDDate.split(" ")[0]; // 주문 날짜 추출
      const isWithinRange =
        new Date(orderDate) >= new Date(startDay) &&
        new Date(orderDate) <= new Date(endDay); // 날짜 범위 비교
      const isEligibleStatus =
        order.ProcessCode === "ready" || order.ProcessCode === "fast_ready"; // 상태 필터링
      return isWithinRange && isEligibleStatus;
    });

    setSelectedOrders(filteredOrders); // 필터링된 주문 목록 상태 업데이트

    // 선택된 날짜 범위 내에서 'ready' 또는 'fast_ready' 상태의 주문 금액 합산하여 실매출액 계산
    const totalSales = filteredOrders.reduce((total, order) => {
      return (
        total + order.Details.reduce((sum, item) => sum + item.TotPrice, 0)
      ); // 주문별 금액 합산
    }, 0);

    setselectedOrdersSales(totalSales); // 계산된 실매출액 상태 업데이트

    // 선택된 날짜 범위를 캘린더에 표시하기 위해 기존에 마킹된 날짜들 중 선택된 색상 초기화
    const updatedMarkedDates = { ...markedDates };
    Object.keys(updatedMarkedDates).forEach((date) => {
      if (updatedMarkedDates[date].selected) {
        delete updatedMarkedDates[date].selected; // 'selected' 속성 제거
        delete updatedMarkedDates[date].selectedColor; // 'selectedColor' 속성 제거
      }
    });

    // 선택된 날짜 범위에 해당하는 날짜들을 캘린더에 표시
    const newMarkedDates = markDatesBetweenStartAndEnd(
      startDay,
      endDay,
      updatedMarkedDates
    );
    setMarkedDates(newMarkedDates); // 업데이트된 마킹된 날짜 상태 업데이트
  };

  // 시작일과 종료일 사이의 날짜들을 달력에 표시하는 함수
  const markDatesBetweenStartAndEnd = (startDate, endDate) => {
    const marked = { ...markedDates }; // 기존에 표시된 점 정보를 유지하기 위해 markedDates 상태를 복사합니다.
    let current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      const dateStr = current.toISOString().split("T")[0];
      // 이미 표시된 점이 있는 날짜에는 selectedColor만 추가하고, 없는 날짜에는 새로운 표시를 추가합니다.
      if (marked[dateStr]) {
        marked[dateStr] = {
          ...marked[dateStr],
          selected: true,
          selectedColor: "skyblue",
        };
      } else {
        marked[dateStr] = {
          selected: true,
          marked: false,
          selectedColor: "skyblue",
        };
      }
      current.setDate(current.getDate() + 1);
    }

    return marked;
  };

  //월 매출 계산하는 함수!
  const calculateSelectedMonthSales = (selectedMonth) => {
    let Month_Final_Price = 0;

    const readyOrders = completeOrders.filter(
      (order) =>
        order.ProcessCode === "fast_ready" || order.ProcessCode === "ready"
    );

    readyOrders.forEach((order) => {
      const month = order.SDDate.substring(0, 7);

      if (month === selectedMonth) {
        Month_Final_Price += order.Details.reduce(
          (sum, item) => sum + item.TotPrice,
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
      (order) =>
        order.ProcessCode === "fast_ready" || order.ProcessCode === "ready"
    );

    // "cancel" 상태의 주문 목록 필터링
    const cancelOrders = completeOrders.filter(
      (order) => order.ProcessCode === "cancel"
    );

    // "fast_ready" 및 "ready" 상태 +  선택한 날짜
    const selectedOrders = readyOrders.filter((order) => {
      const dateOnly = order.SDDate.split(" ")[0];
      return dateOnly === day.dateString;
    });

    // "cancel" 상태의 주문 목록 필터링 + 선택한 날짜
    const selectedcancelOrders = cancelOrders.filter((order) => {
      const dateOnly = order.SDDate.split(" ")[0];
      return dateOnly === day.dateString;
    });

    // 선택된 월에 해당하는 주문들
    const selectedMonthOrders = readyOrders.filter((order) => {
      return order.SDDate.substring(0, 7) === selectedMonth;
    });

    //선택된 날짜에 대한 "cancel" 상태의 주문들의 전체 취소 금액
    const Decline_Final_Price = selectedcancelOrders.reduce(
      (total, order) =>
        total + order.Details.reduce((sum, item) => sum + item.TotPrice, 0),
      0
    );

    //선택된 날짜에 대한 주문 목록(selectedOrders)에서 총 주문 가격
    const Final_Price = selectedOrders.reduce(
      (total, order) =>
        total + order.Details.reduce((sum, item) => sum + item.TotPrice, 0),
      0
    );

    setSelectedOrders(selectedOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + fast-Ready + Ready
    setselectedMonthOrders(selectedMonthOrders); //당월에 해당하는 주문목록(selectedMonthOrders) 업데이트
    setselectedcancelOrders(selectedcancelOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + cancel

    setselectedOrdersSales(Final_Price); // 당일총매출(Final_Price) 업데이트
    setselectedcancelSales(Decline_Final_Price); // 당일총취소금액(totalCancellationAmount) 업데이트

    setSelectedDate(day.dateString); // Set the selected SDDate

    // markedDates 객체 업데이트: 모든 날짜의 강조 해제, 선택된 날짜를 특정 색으로 표시
    const updatedMarkedDates = {};
    Object.keys(markedDates).forEach((SDDate) => {
      updatedMarkedDates[SDDate] = {
        ...markedDates[SDDate],
        selected: false,
        selectedColor: undefined,
      };
    });

    updatedMarkedDates[day.dateString] = {
      ...updatedMarkedDates[day.dateString],
      selected: true,
      selectedColor: "skyblue",
    };

    setMarkedDates(updatedMarkedDates);
  };

  // 모달창 띄우기!!
  const handleModal = (day) => {
    setModalVisible(true); //모달창이 뜨게 된다!!
  };

  // 선택한 날짜에 해당되는 주문 목록 가져오기 (단일날짜!!!)
  const getOrdersByDate = (ProcessCode) => {
    // 해당 상태의 주문 목록 필터링
    const filteredOrders = completeOrders.filter(
      (order) => order.ProcessCode === ProcessCode
    );

    // 선택한 날짜에 해당되는 주문 목록만 반환
    return filteredOrders.filter((order) => {
      const dateOnly = order.SDDate.split(" ")[0];
      return dateOnly === selectedDate;
    });
  };

  // 선택된 날짜 범위에 해당하는 주문 목록을 가져옵니다. (기간날짜!!!)
  const getOrdersByDateRange = (ProcessCode) => {
    // 해당 상태의 주문 목록을 필터링합니다.
    const filteredOrders = completeOrders.filter(
      (order) => order.ProcessCode === ProcessCode
    );

    // 선택된 날짜 범위에 해당하는 주문 목록만 반환합니다.
    return filteredOrders.filter((order) => {
      const orderDate = order.SDDate.split(" ")[0];
      return (
        new Date(orderDate) >= new Date(selectedStartDate) &&
        new Date(orderDate) <= new Date(selectedEndDate)
      );
    });
  };

  // 모달창 내 검색 버튼을 눌렀을 때의 동작을 처리하는 함수
  const handleSearchOrder = () => {
    // 이전에 필터링된 목록을 초기화
    setSelectedOrders([]);
    setselectedcancelOrders([]);
  
    let filteredOrders = [];
  
    // 날짜 범위 선택 시 단일 날짜 선택 초기화
    if (selectedStartDate && selectedEndDate) {
      setSelectedDate(null); // 단일 날짜 선택 초기화
    }
  
    // 주문 번호가 입력되지 않은 경우
    if (!searchOrder) {
      filteredOrders = completeOrders.filter((order) => {
        const orderDate = order.SDDate.split(" ")[0];
        const isWithinDateRange = selectedDate
          ? orderDate === selectedDate
          : new Date(orderDate) >= new Date(selectedStartDate) && new Date(orderDate) <= new Date(selectedEndDate);
        return isWithinDateRange;
      });
    } else {
      // 주문 번호 필터링 로직
      filteredOrders = completeOrders.filter((order) =>
        order.STSeq.toString().includes(searchOrder) &&
        (!selectedDate || order.SDDate.split(" ")[0] === selectedDate) &&
        (!selectedStartDate || new Date(order.SDDate.split(" ")[0]) >= new Date(selectedStartDate)) &&
        (!selectedEndDate || new Date(order.SDDate.split(" ")[0]) <= new Date(selectedEndDate))
      );
    }
  
    // 필터링된 주문 목록 설정
    setSelectedOrders(filteredOrders.length > 0 ? filteredOrders : []);
    setReadyButtonTranslucent(false);
    setDeclineButtonTranslucent(false);
  };

  // 모달 창에서 ProcessCode 필터링 버튼을 클릭하는 경우의 처리 함수입니다.
  const handleOrderStatusButtonClick = (ProcessCode) => {
    // 이전에 필터링된 목록을 초기화
    setSelectedOrders([]);
    setselectedcancelOrders([]);
  
    // 날짜 범위 선택 시 단일 날짜 선택 초기화
    if (selectedStartDate && selectedEndDate) {
      setSelectedDate(null); // 단일 날짜 선택 초기화
    }
  
    let filteredOrders = completeOrders.filter((order) => {
      const orderDate = order.SDDate.split(" ")[0];
      const isWithinDateRange = selectedDate
        ? orderDate === selectedDate
        : new Date(orderDate) >= new Date(selectedStartDate) && new Date(orderDate) <= new Date(selectedEndDate);
      return isWithinDateRange && order.ProcessCode === ProcessCode;
    });
  
    // 필터링된 주문 목록 설정
    if (ProcessCode === "ready" || ProcessCode === "fast_ready") {
      setSelectedOrders(filteredOrders);
      setReadyButtonTranslucent(false);
      setDeclineButtonTranslucent(true);
    } else if (ProcessCode === "cancel") {
      setselectedcancelOrders(filteredOrders);
      setReadyButtonTranslucent(true);
      setDeclineButtonTranslucent(false);
    }
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

  // 오늘의 날짜를 표시하고 캘린더를 해당 월로 이동하는 함수
  const handleSelectToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month starts from 0, so +1.
    const day = today.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    setCurrent(formattedDate); // 캘린더의 현재 월을 오늘 날짜가 속한 월로 설정
    setCalendarKey(`calendar-${new Date().getTime()}`); // 캘린더 컴포넌트의 키를 변경하여 리렌더링 강제
    handleCalenderDay({ dateString: formattedDate });
  };

  // DateTimePickerModal로 선택한 날짜를 표시하고 캘린더를 해당 월로 이동하는 함수
  const handleDateChange = (date) => {
    // 선택된 날짜를 YYYY-MM-DD 형식의 문자열로 변환
    const selectedDate = date.toISOString().split("T")[0];

    // 캘린더의 현재 월을 사용자가 선택한 날짜가 속한 월로 설정
    setCurrent(selectedDate);

    // 캘린더 컴포넌트의 키를 변경하여 리렌더링 강제
    setCalendarKey(`calendar-${new Date().getTime()}`);

    // 사용자가 선택한 날짜를 처리하는 로직 구현
    // 예: setSelectedDate(selectedDate);

    // 선택된 날짜를 기반으로 추가적인 로직 처리가 필요한 경우
    // 예를 들어, 해당 날짜에 해당하는 주문 목록을 표시하거나, 특정 이벤트를 트리거할 수 있음
    handleCalenderDay({ dateString: selectedDate });
  };

  // 날짜 선택 모달을 열기 위한 함수
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // 날짜 선택 모달을 닫기 위한 함수
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // 사용자가 날짜를 선택했을 때 실행되는 함수
  const handleConfirm = (date) => {
    hideDatePicker(); // 모달 닫기
    handleDateChange(date); // 사용자가 선택한 날짜를 처리하는 함수 호출
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        {isLoggedIn ? (
          <>
            {/* 캘린더 부분 */}
            <CalendarComp
              markedDates={markedDates}
              current={current}
              calendarKey={calendarKey}
              isDatePickerVisible={isDatePickerVisible}
              handleCalendarSelection={handleCalendarSelection}
              handleCalenderDay={handleCalenderDay}
              handleSelectToday={handleSelectToday}
              handleDateChange={handleDateChange}
              showDatePicker={showDatePicker}
              hideDatePicker={hideDatePicker}
              handleConfirm={handleConfirm}
            />

            {/* 매출 나타내는 부분 */}
            <SalesComp
              selectedOrders={selectedOrders}
              selectedOrdersSales={selectedOrdersSales}
              selectedMonthOrders={selectedMonthOrders}
              selectedMonthSales={selectedMonthSales}
              handleModal={() => setModalVisible(true)}
            />

            {/* 모달창을 나타내는 부분 */}
            <ModalComp
              modalVisible={modalVisible}
              scrollViewRef={scrollViewRef}
              searchOrder={searchOrder}
              readyButtonTranslucent={readyButtonTranslucent}
              cancelButtonTranslucent={cancelButtonTranslucent}
              selectedOrders={selectedOrders}
              selectedcancelOrders={selectedcancelOrders}
              setSearchOrder={setSearchOrder}
              handleSearchOrder={handleSearchOrder} // 모달창 내 검색 버튼을 눌렀을 때의 동작을 처리하는 함수
              handleOrderStatusButtonClick={handleOrderStatusButtonClick} // 모달창 ProcessCode 필터링 버튼 클릭에 대한 처리 함수
              closeModal={closeModal} // 모달창 close 하는 함수!
              scrollToBottom={scrollToBottom} // 스크롤 아래로 이동하는 함수
              scrollToTop={scrollToTop} // 스크롤 위로 이동하는 함수
            />
          </>
        ) : null}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Sales;
