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
import { onReady } from "../store/store-slice";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";

const Current = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.current
  );

  const [orders, setOrders] = useState([]);
  const buttonPress = (data) => {
    console.log(data);
    if (data.action === "ready") {
      dispatch(onReady({ id: data.id }));
    }
  };
  useEffect(() => {
    setOrders(currentOrders);
  }, [orders, currentOrders]);
  console.log(currentOrders);
  return (
    <View style={styles.container}>
      {orders.length === 0 && <EmptyOrders name="Current" />}
      <OrdersNumbers length={orders.length} />
      <SafeAreaView>
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
