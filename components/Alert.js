// Alert.js
import React from "react";
import { Alert as RNAlert } from "react-native";

const Alert = ({ message }) => {
  return RNAlert.alert("알림", message);
};

export default Alert;

// PassWordScreen.js
// ... (previous imports)

import Alert from "./Alert"; // Update the import statement with the correct path to Alert.js

const PasswordScreen = ({ isLoggedIn }) => {
  // ... (previous code)

  const handleLogin = () => {
    const correctPassword = "0000"; // Enter the actual administrator password
    const enteredPassword = passwordDigits.join("");

    if (enteredPassword === correctPassword) {
      Alert({ message: "비밀번호가 올바릅니다." });
      navigation.navigate("ManagerScreen");
    } else {
      Alert({
        message: "비밀번호가 올바르지 않습니다. 관리자만 접근 가능합니다.",
      });
    }
  };

  // ... (remaining code)
};

export default PasswordScreen;