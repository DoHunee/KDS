// PassWordScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const PasswordScreen = ({}) => {
  const navigation = useNavigation();
  const [passwordDigits, setPasswordDigits] = useState(["", "", "", ""]); // 각 자리의 비밀번호를 저장하는 배열
  const passwordRefs = [useRef(), useRef(), useRef(), useRef()]; // 각 TextInput의 ref를 저장하는 배열

  const handleLogin = () => {
    const correctPassword = "0000"; // 실제 관리자 비밀번호를 입력하세요

    const enteredPassword = passwordDigits.join(""); // 배열의 값을 문자열로 결합

    if (enteredPassword === correctPassword) {
      Alert.alert("비번이 맞슴당.");
      navigation.navigate("ManagerScreen");
    } else {
      Alert.alert("WARNING", "관리자만 접근 가능합니다.");
    }
  };

  const handleDigitInput = (text, index, nextRef) => {
    const newDigits = [...passwordDigits];
    newDigits[index] = text;

    setPasswordDigits(newDigits);

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}> 관리자 비밀번호를 입력하세요!! </Text>
        <View style={styles.inputContainer}>
          {passwordDigits.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.digitInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) =>
                handleDigitInput(text, index, passwordRefs[index + 1])
              }
              ref={passwordRefs[index]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  digitInput: {
    height: 40,
    width: 60,
    borderColor: "#61dafb",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "black",
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PasswordScreen;
