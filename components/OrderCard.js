import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../refs/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "./Button";
import getTimePassedSec from "../refs/getTime";

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
  buttons,
  readyTime,
  scheduleFor,
}) => {
  const [timeElapse, setTimeElapsed] = useState(0);
  const handleOnPress = (data) => {
    onPress({ action: data, id: id });
  };
  let tempOrder = ["Cheesburger", "Hamburger", "Coca-Cola", "Pizza"];
  let dynamicChange = {
    backgroundColor: "white",
    color: "black",
  };
  useEffect(() => {
    let timeout = setInterval(() => {
      setTimeElapsed(timeElapse + 1);
    }, 1000);
    return () => clearInterval(timeout);
  }, [timeElapse]);
  const timeRemaining = confirmTime + timeRequire * 60 - getTimePassedSec();
  if (timeRemaining < 300 && timeRemaining >= 0 && status === "preparing") {
    dynamicChange.backgroundColor = "orange";
  } else if (timeRemaining < 0 && status === "preparing") {
    dynamicChange.backgroundColor = "red";
    dynamicChange.color = "white";
  } else if (status === "ready") {
    dynamicChange.backgroundColor = "green";
  } else if (status === "schedule") {
    dynamicChange.backgroundColor = "pink";
  }
  let topLeft = timeRequire + " mins";
  if (status === "preparing") {
    topLeft = timeRemaining + " secs";
  } else if (status === "schedule") {
    topLeft = scheduleFor;
  }
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.timer,
            { backgroundColor: dynamicChange.backgroundColor },
          ]}
        >
          <Text style={[styles.timerText, { color: dynamicChange.color }]}>
            {topLeft}
          </Text>
          {timerIcon}
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text>{status}...</Text>
          {status === "preparing" && (
            <Text>Time Elapsed : {Math.round(timeElapse / 60)} mins</Text>
          )}
          {status === "ready" && (
            <Text style={{ color: colors.white }}>
              Completed in : {Math.round((readyTime - confirmTime) / 60)} mins
            </Text>
          )}
        </View>
      </View>

      <View style={styles.namePhone}>
        <View>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{number}</Text>
        </View>
        <View>
          <Text style={styles.orderText}>
            {orderNumber ? "#00" + orderNumber : "#000"}
          </Text>
        </View>
      </View>
      <View style={styles.orders}>
        {orders.map((order, index) => {
          return (
            <View style={styles.orderItem} key={index}>
              <Text style={{ color: colors.white }}>- {order}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.buttons}>
        {buttons.map((name, index) => {
          return (
            <Button
              onPress={() => handleOnPress(name?.toLowerCase())}
              key={index}
              filled={index % 2 === 0}
              outline={index % 2 !== 0}
            >
              {name}
            </Button>
          );
        })}
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
