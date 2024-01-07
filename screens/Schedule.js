import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";

const Schedule = () => {
  // Redux에서 useSelector를 사용하여 예약된 일정에 대한 주문을 가져옴
  const scheduleOrder = useSelector(
    (state) => state.OrdersDistrubutionSclie.schedule
  );

  // 주문 목록 및 버튼 동작을 처리하는 함수
  const buttonPress = () => {};

  // 로컬 상태 orders를 사용하여 scheduleOrder를 업데이트
  const [orders, setOrders] = useState([]);

  // useEffect를 사용하여 scheduleOrder가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(scheduleOrder);
  }, [orders, scheduleOrder]);

  return (
    <View style={styles.container}>
      {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
      {orders.length === 0 && <EmptyOrders name="Schedule" />}

      {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}
      <OrdersNumbers length={orders.length} />

      <SafeAreaView>
        {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
        <OrderList buttons={[]} itemsData={orders} buttonPress={buttonPress} />
      </SafeAreaView>
    </View>
  );
};

export default Schedule;

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});