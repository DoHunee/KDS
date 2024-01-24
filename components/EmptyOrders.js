// 하단탭이 비어있으면 나타내주는 화면

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../refs/colors";

const EmptyOrders = ({ name }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.white, fontSize: 18, fontWeight: "bold" }}>
        {name} orders is Empty !!!
      </Text>
    </View>
  );
};

export default EmptyOrders;

const styles = StyleSheet.create({});
