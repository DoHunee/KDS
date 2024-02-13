import { StyleSheet,View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import ChooseStatus from "../RightUpBar/ChooseStatus";

const Complete = () => {
  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //로그인 전 후 접근제한을 위해
  const readyOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.complete
  );
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 readyOrders를 업데이트

  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    // 만약에 추가적인 동작이 필요하다면 여기에 추가
  };

  // readyOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(readyOrders);
  }, [readyOrders]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  // onSelectStatus 함수 정의
  const onSelectStatus = (status) => {
    const filteredOrders = readyOrders.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
    console.log("Filtered Orders:", filteredOrders);
    setOrders(filteredOrders); // 필터링된 주문 목록을 로컬 state에 업데이트
    console.log(`Selected status: ${status}`);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {orders.length === 0 && <EmptyOrders name="Complete" />}
          <ChooseStatus
            length={orders.length}
            onSelectStatus={onSelectStatus}
          />
          <SafeAreaView>
            <OrderList
              buttons={[]}
              itemsData={orders}
              buttonPress={buttonPress}
            />
          </SafeAreaView>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA",
  },
});

export default Complete;
