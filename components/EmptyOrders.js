import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../refs/colors";

// flex: 1을 사용하여 화면 전체를 차지합니다.
// 텍스트 내용은 {name} 주문이 비어 있습니다 !!!로 동적으로 결정되며
// , name은 부모 컴포넌트에서 전달된 프롭입니다.


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
