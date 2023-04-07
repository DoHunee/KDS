import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import data from "../assets/data/orders.json";
import OrderCard from "./OrderCard";
import colors from "../refs/colors";

const OrderList = ({}) => {
  const [listItems, setListItems] = useState([]);
  useEffect(() => {
    setListItems(data.orders);
  }, []);
  return (
    <View>
      <View style={styles.listMetaData}>
        <Text style={{ color: colors.white, fontSize: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>
            {listItems.length}
          </Text>{" "}
          : Items
        </Text>
      </View>
      <FlatList
        data={listItems}
        renderItem={OrderCard}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  listMetaData: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: colors.secondary,
    padding: 5,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
