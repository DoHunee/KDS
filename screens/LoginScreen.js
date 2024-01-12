import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";


const LoginScreen = ({ navigation }) => {
  const [storedNumber, setStoredNumber] = useState(["", "", "", ""]);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  let storedNumberRefs = [useRef(), useRef(), useRef(), useRef()];
  let categoryNumberRef = useRef();
  let employeeIDRef = useRef();


  // 로그인 성공 실패 로직!
  const handleLogin = () => {
    if (validateCredentials()) {
      Alert.alert("로그인 성공", "환영합니다!");
      navigation.replace("orders");
    } else {
      Alert.alert("로그인 실패", "입력한 정보가 올바르지 않습니다.");
    }
  };

  const validateCredentials = () => {
    const storedNumberString = storedNumber.join("");
    const enteredNumber = storedNumberString + categoryNumber + employeeID;

    // 예시로 저장된 값
    const storedNumberExample = "1234";
    const storedCategoryNumberExample = "5";
    const storedEmployeeIDExample = "6789012";

    return (
      storedNumberString === storedNumberExample &&
      categoryNumber === storedCategoryNumberExample &&
      employeeID === storedEmployeeIDExample
    );
  };

  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;

    setStoredNumber(newStoredNumber);

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Open 🚀</Text>

      <View style={styles.inputContainer}>
        {storedNumber.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.digitInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) =>
              handleDigitInput(text, index, storedNumberRefs[index + 1])
            }
            ref={storedNumberRefs[index]}
          />
        ))}
      </View>

      <TextInput
        style={styles.digitInput}
        keyboardType="numeric"
        maxLength={1}
        value={categoryNumber}
        onChangeText={(text) => setCategoryNumber(text)}
        ref={categoryNumberRef}
      />

      <TextInput
        style={styles.input}
        placeholder="직원 식별 번호 (7자리)"
        keyboardType="numeric"
        maxLength={7}
        value={employeeID}
        onChangeText={(text) => setEmployeeID(text)}
        ref={employeeIDRef}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#61dafb",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  digitInput: {
    height: 40,
    width: 60,
    borderColor: "#61dafb",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "black",
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom : 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#61dafb",
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: "black",
  },
  loginButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;