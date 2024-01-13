import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert,
} from "react-native";

const Fix = ({ navigation, route }) => {
  const [storedNumber, setStoredNumber] = useState(["", "", "", ""]);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  const storedNumberRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const categoryNumberRef = useRef();
  const employeeIDRef = useRef();

  // 사용자가 입력한 값을 저장하는 변수
  const [userInput, setUserInput] = useState({
    storedNumber: ["", "", "", ""],
    categoryNumber: "",
    employeeID: "",
  });

  // 사용자가 숫자를 입력할 때 호출되며, 입력된 숫자를 배열에 저장하고 필요에 따라 다음 입력란으로 포커스를 이동합니다.
  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;
    setStoredNumber(newStoredNumber);

    // 사용자가 입력한 값을 업데이트
    setUserInput({
      storedNumber: newStoredNumber,
      categoryNumber,
      employeeID,
    });

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  
// 값을 업데이트하는 함수
const updateExampleValues = () => {
  // 사용자가 입력한 값들을 exampleValues로 업데이트
  const updatedExampleValues = {
    storedNumber: storedNumber.join(""),
    categoryNumber,
    employeeID,
  };

  if (navigation && navigation.setParams) {
    navigation.setParams({
      exampleValues: updatedExampleValues,
    });

    Alert.alert("예제 값이 업데이트되었습니다!");
    console.log(updatedExampleValues);
  }
};

  const handleGoToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>🚀 식별번호 변경 🚀</Text>

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
          placeholder="직원식별번호 (7자리)"
          keyboardType="numeric"
          maxLength={7}
          value={employeeID}
          onChangeText={(text) => setEmployeeID(text)}
          ref={employeeIDRef}
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={updateExampleValues}
        >
          <Text style={styles.buttonText}>예제 값 업데이트</Text>
        </TouchableOpacity>

        <Button title="로그인 페이지로 이동" onPress={handleGoToLogin} />
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 20,
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
  updateButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Fix;