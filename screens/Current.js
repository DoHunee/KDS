import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../components/OrderCard";
import colors from "../refs/colors";
import OrderList from "../components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import { onReady , onCancel } from "../store/store-slice";
import EmptyOrders from "../components/EmptyOrders";
import Length from "../components/Length";


const Current = ({ navigation }) => {

  const dispatch = useDispatch();  // Redux의 useDispatch를 사용하여 액션을 디스패치
  const currentOrders = useSelector((state) => state.OrdersDistrubutionSclie.current);  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const [orders, setOrders] = useState([]);   // 로컬 상태 orders를 사용하여 currentOrders를 업데이트

  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    if (data.action === "ready") {
      dispatch(onReady({ id: data.id }));
    } else if (data.action === "cancel") {
      dispatch(onCancel({ id: data.id }));
    }
  };
  
  // currentOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(currentOrders);
  }, [orders, currentOrders]);

 


  return (
    <View style={styles.container}>
      {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
      {orders.length === 0 && <EmptyOrders name="Current" />}
      {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}
      <Length length={orders.length} />
      {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
      <SafeAreaView>
        {/* 주문 목록에 Ready와 Cancel 버튼을 추가하여 OrderList 컴포넌트 사용 */}
        <OrderList
          buttons={["Ready", "Cancel"]}
          itemsData={orders}
          buttonPress={buttonPress}
        />
      </SafeAreaView>
    </View>
  );
};
export default Current;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});