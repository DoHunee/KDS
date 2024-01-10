import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";

const Order = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Order</Text>
      </SafeAreaView>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
