import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";
import { useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";

const Schedule = () => {
  const scheduleOrder = useSelector(
    (state) => state.OrdersDistrubutionSclie.schedule
  );
  const buttonPress = () => {};
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(scheduleOrder);
  }, [orders, scheduleOrder]);
  return (
    <View style={styles.container}>
      {orders.length === 0 && <EmptyOrders name="Schedule" />}
      <OrdersNumbers length={orders.length} />
      <SafeAreaView>
        <OrderList buttons={[]} itemsData={orders} buttonPress={buttonPress} />
      </SafeAreaView>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
