import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";

const Complete = () => {
  
  const readyOrders = useSelector((state) => state.OrdersDistrubutionSclie.complete); // Redux에서 상태를 가져오기 위해 useSelector를 사용  
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 readyOrders를 업데이트


  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    // 만약에 추가적인 동작이 필요하다면 여기에 추가
  };

  // readyOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(readyOrders);
  }, [orders, readyOrders]);

  const handleRefresh = async () => {
    await dispatch(handlePending());
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 && <EmptyOrders name="Complete" />} {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
      <OrdersNumbers length={orders.length} /> {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}

      {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
      <SafeAreaView>
        <OrderList buttons={[]} itemsData={orders} buttonPress={buttonPress} />
      </SafeAreaView>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});