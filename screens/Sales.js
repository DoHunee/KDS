// Sales.js
import React, { useEffect } from "react";
import { Text} from "react-native-paper";
import { SafeAreaView, StyleSheet ,Alert,View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../refs/colors";
import EmptyOrders from "../components/EmptyOrders";
import CalendarComp from "../components/CalendarComp"
import CalendarScreen from "../components/CalendarScreen"; 
import { OrdersDistrubutionSclie } from "../store/storeSlice";


const Salse = () => {

  // useSelector를 사용하여 complete 상태 가져오기
  const completeOrders = useSelector((state) => state.OrdersDistrubutionSclie.complete);
  
    // useEffect를 사용하여 completeOrders의 변경을 계속 확인
      useEffect(() => {
        // completeOrders 배열의 각 항목에서 필요한 정보만 출력
        completeOrders.forEach(order => {
          const { date, name, sumPrice, status } = order;
          console.log("Order Details:", { date, name, sumPrice, status });
          console.log("----------------------------------------------------------")
        });
      }, [completeOrders]);

  
    
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);


  return (
    <View style={styles.container}>
    {isLoggedIn ? (
      <>
    <EmptyOrders name="Sales" />
    <CalendarComp completeOrders={completeOrders} />
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

export default Salse;