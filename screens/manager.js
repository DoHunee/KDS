// Manager.js
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";


const Manager = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> 관리자 페이지!</Text>
    </SafeAreaView>
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