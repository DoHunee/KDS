import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";


const Order = () => {
  return (
    <View style={styles.container}>
      {/* SafeAreaView를 사용하여 안전한 영역에 텍스트를 표시 */}
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