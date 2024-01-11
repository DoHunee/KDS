// LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 간단한 로그인 로직
    if (validateCredentials()) {
      // 로그인 성공 시
      Alert.alert("로그인 성공", "환영합니다!");
      navigation.replace("profile"); // "MainApp"은 App.js에서 정의한 네비게이션의 이름
    } else {
      // 로그인 실패 시
      Alert.alert("로그인 실패", "아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const validateCredentials = () => {
    // 실제 로그인 로직을 구현해야 합니다.
    // 예시: 간단하게 "user"와 "password"가 맞으면 로그인 성공으로 가정합니다.
    return username === "User" && password === "pwd";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>개점</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen