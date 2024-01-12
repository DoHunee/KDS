import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Manager = () => {
  return (
    <View style={styles.container}>
      <Text>관리자 화면</Text>
      {/* 관리자 탭 화면의 내용 추가 가능 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Manager;