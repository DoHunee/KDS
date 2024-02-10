// SalesComp.js
import React from "react";
import { Text, View, Button , StyleSheet } from "react-native";

const SalesComp = ({
  selectedOrders,
  selectedcancelOrders,
  seletedtotalSales,
  selectedcancelSales,
  selectedMonthOrders,
  selectedMonthSales,
  handleModal,
}) => {
  return (
    // 매출 나타내는 부분!
    <View style={styles.selectedDateInfoContainer}>
      <Text style={styles.totalSalesText}>
        ■ 실매출액({selectedOrders.length}건):{"              "}
        {seletedtotalSales} 원
      </Text>
      <Text style={styles.totalSalesText}>
        ■ 주문취소({selectedcancelOrders.length}건):
        {"              "}
        {selectedcancelSales} 원
      </Text>
      <Text style={styles.monthlySalesText}>
        ■ 당월매출금액({selectedMonthOrders.length}건):{"              "}
        {selectedMonthSales} 원
      </Text>
      <View style={styles.lineStyle}></View>
      <Button title="상세보기!" onPress={handleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  selectedDateInfoContainer: {
    marginTop: -15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },

  totalSalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e74c3c",
  },

  monthlySalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#27ae60",
  },

  lineStyle: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default SalesComp;
