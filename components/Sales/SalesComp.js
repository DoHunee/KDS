// SalesComp.js
import React from "react";
import { Text, View, Button } from "react-native";
import { commonStyles } from "./style";

const SalesComp = ({
  selectedOrders,
  selecteddeclineOrders,
  seletedtotalSales,
  selecteddeclineSales,
  selectedMonthOrders,
  selectedMonthSales,
  handleModal,
}) => {
  return (
    // 매출 나타내는 부분!
    <View style={commonStyles.selectedDateInfoContainer}>
      <Text style={commonStyles.totalSalesText}>
        ■ 당일매출금액({selectedOrders.length}건):{"              "}
        {seletedtotalSales} 원
      </Text>
      <Text style={commonStyles.totalSalesText}>
        ■ 당일취소금액({selecteddeclineOrders.length}건):
        {"              "}
        {selecteddeclineSales} 원
      </Text>
      <Text style={commonStyles.monthlySalesText}>
        ■ 당월매출금액({selectedMonthOrders.length}건):{"              "}
        {selectedMonthSales} 원
      </Text>
      <View style={commonStyles.lineStyle}></View>
      <Button title="상세보기!" onPress={handleModal} />
    </View>
  );
};

export default SalesComp;
