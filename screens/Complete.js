import { ScrollView, StyleSheet, Text, View,Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import Length from "../components/Length";


const Complete = () => {
  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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



  return (
    <View style={styles.container}>
     {isLoggedIn ? (
      <>
      {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
      {orders.length === 0 && <EmptyOrders name="Complete" />}
      {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}
      <Length length={orders.length} />
      {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
      <SafeAreaView>
        <OrderList buttons={[]} 
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
    backgroundColor: colors.primary,
  },
});

export default Complete;
