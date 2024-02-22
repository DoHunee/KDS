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
  // // useEffect를 사용하여 completeOrders의 변경을 계속 확인
  // useEffect(() => {
  //   if (completeOrders && completeOrders.length > 0) {
  //     // completeOrders 배열의 각 항목에서 필요한 정보만 출력
  //     completeOrders.forEach((order) => {
  //       const { SDDate, name, sumPrice, ProcessCode } = order;
  //       console.log("Order Details:", { SDDate, name, sumPrice, ProcessCode });
  //       console.log(
  //         "----------------------------------------------------------"
  //       );
  //     });
  //   }
  // }, [completeOrders]);

  const completeOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.complete
  ); // useSelector를 사용하여 complete 상태 가져오기
  const [markedDates, setMarkedDates] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]); //선택한날짜의 모든 주문 목록
  const [selectedcancelOrders, setselectedcancelOrders] = useState([]); //선택한날짜의 취소처리 주문목록
  const [selectedMonthOrders, setselectedMonthOrders] = useState([]); //선택한날짜가 속한 월에 해당되는 주문목록

  const [seletedtotalSales, setseletedtotalSales] = useState(0); // 선택한 날짜에 대한 전체 판매 금액을 나타내는 변수입니다.
  const [selectedMonthSales, setSelectedMonthSales] = useState(0); // 선택한 월에 대한 전체 판매 금액을 나타내는 변수입니다.
  const [selectedcancelSales, setselectedcancelSales] = useState(0); //선택한 날짜에 대한 전체 주문 취소 금액을 나타내는 변수입니다.

  const scrollViewRef = useRef(null); // 스크롤 위치를 조작할 때 사용됩니다.
  const [searchOrder, setSearchOrder] = useState(""); // 주문 번호 검색 상태값으로, 주문 번호를 검색하는데 사용됩니다
  const [selectedDate, setSelectedDate] = useState(""); // 선택한 날짜를 나타내는 변수

  const [modalVisible, setModalVisible] = useState(false); // 모달이 열려있으면 true, 닫혀있으면 false입니다.
  const [readyButtonTranslucent, setReadyButtonTranslucent] = useState(false);
  const [cancelButtonTranslucent, setDeclineButtonTranslucent] =useState(false);
  const readyOrders = completeOrders.filter(
    (order) =>
      order.ProcessCode === "fast_ready" ||
      order.ProcessCode === "ready" ||
      order.ProcessCode === "cancel"
  ); // "fast_ready" 및 "ready" 상태의 주문 목록 필터링
  // 모든 주문이 "cancel" 상태인지 확인합니다.
  const hasOnlyCancelOrders = completeOrders.every((order) => order.ProcessCode === "cancel");
  //cancel 목록만!
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [current, setCurrent] = useState(); // 현재 캘린더의 월을 관리하는 상태
  const [calendarKey, setCalendarKey] = useState("calendar"); // 캘린더 컴포넌트의 키를 관리하는 상태

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
          hasOnlyCancelOrders && order.ProcessCode === "cancel" ? "red" : "blue",
      };
    });

    setMarkedDates(initialMarkedDates); // Update markedDates ProcessCode
  }, [completeOrders]);

  //월 매출 계산하는 함수!
  const calculateSelectedMonthSales = (selectedMonth) => {
    let Month_Final_Price = 0;

    const readyOrders = completeOrders.filter(
      (order) => order.ProcessCode === "fast_ready" || order.ProcessCode === "ready"
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
      (order) => order.ProcessCode === "fast_ready" || order.ProcessCode === "ready"
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
        total +
        order.Details.reduce((sum, item) => sum + item.TotPrice, 0),
      0
    );

    //선택된 날짜에 대한 주문 목록(selectedOrders)에서 총 주문 가격
    const Final_Price = selectedOrders.reduce(
      (total, order) =>
        total +
        order.Details.reduce((sum, item) => sum + item.TotPrice, 0),
      0
    );

    setSelectedOrders(selectedOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + fast-Ready + Ready
    setselectedMonthOrders(selectedMonthOrders); //당월에 해당하는 주문목록(selectedMonthOrders) 업데이트
    setselectedcancelOrders(selectedcancelOrders); //당일에 해당하는 주문목록(selectedOrders) 업데이트 + cancel

    setseletedtotalSales(Final_Price); // 당일총매출(Final_Price) 업데이트
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
      selectedColor: "black",
    };

    setMarkedDates(updatedMarkedDates);
  };

  // 모달창 띄우기!!
  const handleModal = (day) => {
    setModalVisible(true); //모달창이 뜨게 된다!!
  };

  // 선택한 날짜에 해당되는 주문 목록 가져오기
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

  // 모달창 내 검색 버튼을 눌렀을 때의 동작을 처리하는 함수
  const handleSearchOrder = () => {
    // 만약 주문 번호를 입력하지 않았다면 선택한 날짜에 해당하는 모든 주문 목록을 표시합니다.
    if (!searchOrder) {
      const selectedDateOrders = completeOrders.filter((order) => {
        const dateOnly = order.SDDate.split(" ")[0];
        return dateOnly === selectedDate; // 선택한 날짜에 해당하는 주문만 필터링합니다.
      });

      // 필터링된 주문 목록을 업데이트합니다.
      setSelectedOrders(selectedDateOrders);
      setselectedcancelOrders([]); // 다음 검색에서 중복 값을 피하기 위해 취소된 주문 목록을 초기화합니다.

      // 버튼의 투명도를 설정합니다.
      setReadyButtonTranslucent(false);
      setDeclineButtonTranslucent(false);

      return;
    }

    // 입력된 주문 번호를 찾습니다.
    const foundOrders = completeOrders.filter((order) =>
      order.STSeq.toString().includes(searchOrder)
    );

    if (foundOrders.length > 0) {
      // 만약 검색된 주문이 있다면
      // 검색된 주문이 선택한 날짜에 해당하는 것인지 확인하여 업데이트합니다.
      const selectedDateOrders = foundOrders.filter((order) => {
        const dateOnly = order.SDDate.split(" ")[0];
        return dateOnly === selectedDate;
      });

      setSelectedOrders(selectedDateOrders);
      setselectedcancelOrders([]);

      // 주문 상태에 따라 버튼의 투명도를 설정합니다.
      const hasReadyOrder = selectedDateOrders.some(
        (order) => order.ProcessCode === "ready" || order.ProcessCode === "fast_ready"
      );
      const hasCancelOrder = selectedDateOrders.some(
        (order) => order.ProcessCode === "cancel"
      );

      setReadyButtonTranslucent(!hasReadyOrder);
      setDeclineButtonTranslucent(!hasCancelOrder);
    } else {
      // 만약 검색된 주문이 없다면
      alert("주문을 찾을 수 없습니다.");

      // 버튼의 투명도를 리셋합니다.
      setReadyButtonTranslucent(false);
      setDeclineButtonTranslucent(false);
    }
  };

  // 모달창 ProcessCode 필터링 버튼 클릭에 대한 처리 함수
  const handleOrderStatusButtonClick = (ProcessCode) => {
    if (ProcessCode === "ready") {
      setSelectedOrders(
        getOrdersByDate("fast_ready").concat(getOrdersByDate("ready"))
      );
      setselectedcancelOrders([]);
      setDeclineButtonTranslucent(true); // "취소목록" 버튼을 투명하게 만듭니다.
      setReadyButtonTranslucent(false); // "즉시수령,완료" 버튼의 투명도를 다시 1로 변경합니다.
    } else if (ProcessCode === "cancel") {
      setSelectedOrders([]);
      setselectedcancelOrders(getOrdersByDate("cancel"));
      setReadyButtonTranslucent(true); // "즉시수령,완료" 버튼을 투명하게 만듭니다.
      setDeclineButtonTranslucent(false); // "취소목록" 버튼의 투명도를 다시 1로 변경합니다.
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        {isLoggedIn ? (
          <>
            {/* 캘린더 부분 */}
            <CalendarComp
              markedDates={markedDates}
              current={current}
              calendarKey ={calendarKey}
              handleCalenderDay={handleCalenderDay}
              handleSelectToday={handleSelectToday}
            />
            
            
            {/* 매출 나타내는 부분 */}
            <SalesComp
              selectedOrders={selectedOrders}
              selectedcancelOrders={selectedcancelOrders}
              seletedtotalSales={seletedtotalSales}
              selectedcancelSales={selectedcancelSales}
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

const styles = StyleSheet.create(
  {
  container: {
    flex : 1,
  },

});

export default Sales;
