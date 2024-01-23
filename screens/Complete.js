import { ScrollView, StyleSheet, Text, View,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import ChooseStatus from "../RightUpBar/ChooseStatus"


const Complete = () => {
  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //로그인 전 후 접근제한을 위해
  const readyOrders = useSelector((state) => state.OrdersDistrubutionSclie.complete);
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 readyOrders를 업데이트

  
  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    // 만약에 추가적인 동작이 필요하다면 여기에 추가
  };
  
  // readyOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(readyOrders);
  }, [orders, readyOrders]);


  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  
// onSelectStatus 함수 정의
const onSelectStatus = (status) => {
  // readyOrders 배열을 필터링하여 선택한 주문 상태와 일치하는 주문만 남깁니다.
  const filteredOrders = readyOrders.filter((order) => order.status.toLowerCase() === status.toLowerCase());
  
  // 콘솔에 필터링된 주문 목록을 출력합니다.
  console.log("Filtered Orders:", filteredOrders);
  
  // 로컬 상태인 orders를 필터링된 주문 목록으로 업데이트합니다.
  setOrders(filteredOrders);
  
  // 선택한 주문 상태를 콘솔에 출력합니다.
  console.log(`Selected status: ${status}`);
};


  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {orders.length === 0 && <EmptyOrders name="Complete" />}
          <ChooseStatus length={orders.length} onSelectStatus={onSelectStatus} />
          <SafeAreaView>
            <OrderList buttons={[]} itemsData={orders} buttonPress={buttonPress} />
          </SafeAreaView>
        </>
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default Complete;
