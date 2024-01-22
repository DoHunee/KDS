// PassWordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PasswordScreen = ({ }) => {

  const navigation = useNavigation();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const correctPassword = "0000"; // 여기에 실제 관리자 비밀번호를 입력하세요

    if (password === correctPassword) {
      Alert.alert("비밀번호가 맞슴당.");
      navigation.navigate("ManagerScreen");
      
    } else {
      Alert.alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <View style={styles.container}>
      <Text>비밀번호를 입력하세요:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="확인" onPress={handleLogin} />
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PasswordScreen;