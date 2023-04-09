import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../assets/data/orders.json";
import OrderCard from "./OrderCard";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrderList = ({ itemsData, buttons, buttonPress }) => {
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    setListItems(itemsData);
  }, [listItems, itemsData]);
  const handleOnPress = (data) => {
    buttonPress(data);
  };
  return (
    <View>
      <FlatList
        data={itemsData}
        // renderItem={OrderCard}
        renderItem={({ item }) => (
          <OrderCard
            name={item.name}
            number={item.number}
            orderNumber={item.orderNumber}
            orders={item.orders}
            confirmTime={item.confirmTime}
            status={item.status}
            id={item.id}
            timeRequire={item.timeRequire}
            buttons={buttons}
            onPress={handleOnPress}
            readyTime={item.readyTime}
            scheduleFor={item.scheduleFor}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
