// Logout.js

import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logout } from "../store/authActions";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 로그아웃 액션 디스패치
    dispatch(logout());

    // 로그인 화면으로 이동
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Logout;