// User.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";


const Manager = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Manager </Text>
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