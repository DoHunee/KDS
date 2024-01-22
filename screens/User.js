// User.js
import React from "react";
import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import Logout from "../components/Logout";


const User = () => {
  const navigation = useNavigation();



  return (
    <SafeAreaView style={styles.container}>
      <Text>User인데 </Text>
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