import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";

const Complete = () => {
  const dispatch = useDispatch();
  const readyOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.complete
  );
  console.log(readyOrders);

  const [orders, setOrders] = useState([]);
  const buttonPress = (data) => {
    // if (data.name === "ready") {
    //   dispatch(onReady({ id: data.id }));
    // }
  };
  useEffect(() => {
    setOrders(readyOrders);
  }, [orders, readyOrders]);
  return (
    <View style={styles.container}>
      {orders.length === 0 && <EmptyOrders name="Complete" />}
      <OrdersNumbers length={orders.length} />
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
