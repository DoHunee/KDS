// User.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";


const User = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>User </Text>
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

export default User;