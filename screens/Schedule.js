// Schedule.js
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";


const Schedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text> 매출 페이지!</Text>
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

export default Schedule;