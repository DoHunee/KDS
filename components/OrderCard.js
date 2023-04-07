import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../refs/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";

const OrderCard = ({
  name,
  number,
  orderNumber,
  orders,
  confirmTime,
  status,
  id,
  onPress,
  timeRequire,
}) => {
  let tempOrder = ["Cheesburger", "Hamburger", "Coca-Cola", "Pizza"];
  let dynamicChange = {
    backgroundColor: "white",
    color: "black",
  };
  let timerIcon = (
    <MaterialCommunityIcons
      style={[styles.timerText, { color: dynamicChange.color }]}
      name="truck-fast"
      color={colors.white}
      size={26}
    />
  );
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity style={[styles.timer, { backgroundColor: "white" }]}>
          <Text style={[styles.timerText, { color: dynamicChange.color }]}>
            15 mins
          </Text>
          {timerIcon}
        </TouchableOpacity>
      </View>

      <View style={styles.namePhone}>
        <View>
          <Text style={styles.text}>Dhiraj Borse</Text>
          <Text style={styles.text}>9604316535</Text>
        </View>
        <View>
          <Text style={styles.orderText}>#003</Text>
        </View>
      </View>
      <View style={styles.orders}>
        {tempOrder.map((order, index) => {
          return (
            <View style={styles.orderItem} key={index}>
              <Text style={{ color: colors.white }}>- {order}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.buttons}>
        <Button filled={true}>Button</Button>
        <Button outline={true}>Button</Button>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: colors.card,
    borderRadius: 20,
  },
  timer: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 15,
  },
  timerText: {
    marginHorizontal: 5,
    fontWeight: "bold",
    // color: colors.white,
  },
  namePhone: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: colors.darkGray,
  },
  orderText: {
    color: colors.lightBlack,
    fontSize: 20,
    fontWeight: "bold",
  },
  orders: {
    borderTopColor: colors.darkGray,
    borderTopWidth: 2,
    marginTop: 5,
  },
  orderItem: {
    marginTop: 3,
  },
  buttons: {
    marginTop: 20,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
