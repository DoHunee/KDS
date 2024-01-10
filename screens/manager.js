import { Dimensions, StyleSheet, StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import { Calendar } from "react-native-calendars";
import {
  handlePending,
  onConfirm,
  onDecline,
  onSchedule,
} from "../store/store-slice";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";
import CalenderComp from "../components/CalenderComp";
const Orders = ({ navigation }) => {
  // 캘린더 표시 여부와 선택된 스케줄 ID를 관리하는 상태
  const [showCalender, setShowCalender] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);


  const dispatch = useDispatch();    // Redux에서 useDispatch를 사용하여 액션을 디스패치
  const pendingOrders = useSelector((state) => state.OrdersDistrubutionSclie.pending);  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 pendingOrders를 업데이트



  // 주문 목록 및 스케줄 캘린더의 동작을 처리하는 함수
  const buttonPress = (data) => {
    if (data.action === "accept") {
      dispatch(onConfirm({ id: data.id }));
    } else if (data.action === "decline") {
      dispatch(onDecline({ id: data.id }));
    } else if (data.action === "schedule") {
      // 스케줄 버튼이 눌렸을 때 캘린더 표시 및 선택된 주문 ID 설정
      setShowCalender(true);
      setScheduleId(data.id);
    }
  };
  // useEffect를 사용하여 초기에 handlePending 액션을 디스패치
  useEffect(() => {
    dispatch(handlePending());
  }, []);
  // useEffect를 사용하여 pendingOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(pendingOrders);
  }, [orders, pendingOrders]);
  // 캘린더에서 선택한 날짜에 대한 처리 함수
  const handleCalenderDay = (date) => {
    // 캘린더 숨기기 및 선택한 날짜로 스케줄 액션 디스패치
    setShowCalender(false);
    dispatch(onSchedule({ id: scheduleId, schedule: date?.dateString }));
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
        {orders.length === 0 && <EmptyOrders name="Pending" />}
        {/* 캘린더 표시 여부에 따라 CalenderComp 컴포넌트 표시 */}
        {showCalender && <CalenderComp onPress={handleCalenderDay} />}
        {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}
        <OrdersNumbers length={orders.length} />
        {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
        <OrderList
          buttons={["Accept", "Decline", "Schedule"]}
          itemsData={orders}
          buttonPress={buttonPress}
        />
      </SafeAreaView>
    </View>
  );
};
export default Orders;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});