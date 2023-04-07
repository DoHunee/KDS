import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../components/OrderCard";
import colors from "../refs/colors";
import OrderList from "../components/OrderList";

const Current = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <OrderList />
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
