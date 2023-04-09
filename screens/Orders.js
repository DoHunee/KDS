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
  const [showCalender, setShowCalender] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);
  const dispatch = useDispatch();
  const pendingOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.pending
  );
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(pendingOrders);
  }, [orders, pendingOrders]);
  const handleCalenderDay = (date) => {
    setShowCalender(false);

    dispatch(onSchedule({ id: scheduleId, schedule: date?.dateString }));
  };
  const buttonPress = (data) => {
    if (data.action === "accept") {
      dispatch(onConfirm({ id: data.id }));
    } else if (data.action === "decline") {
      dispatch(onDecline({ id: data.id }));
    } else if (data.action === "schedule") {
      setShowCalender(true);

      setScheduleId(data.id);
    }
  };

  useEffect(() => {
    dispatch(handlePending());
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {orders.length === 0 && <EmptyOrders name="Pending" />}
        {showCalender && <CalenderComp onPress={handleCalenderDay} />}
        <OrdersNumbers length={orders.length} />
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
