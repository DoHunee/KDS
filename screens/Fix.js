//Fix.js
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

  // Variable to store the value entered by the user
  const [userInput, setUserInput] = useState({
    storedNumber: ["", "", "", ""],
    categoryNumber: "",
    employeeID: "",
  });

  // Called when the user enters a number, stores the entered number in an array and moves focus to the next input box as needed.
  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;
    setStoredNumber(newStoredNumber);

    // Update the value entered by the user
    setUserInput({
      storedNumber: newStoredNumber,
      categoryNumber,
      employeeID,
    });

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // Function to update the value
  const updateExampleValues = () => {
    // Update the values entered by the user to exampleValues
    const updatedExampleValues = {
      storedNumber: storedNumber.join(""),
      categoryNumber,
      employeeID,
    };

      // 초기화
  navigation.setParams({
    exampleValues: null,
  });

    if (navigation && navigation.setParams) {
      navigation.setParams({
        exampleValues: updatedExampleValues,
      });

      Alert.alert("식별번호가 수정되었습니다");
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
      <View style={styles.container}>
        <Text style={styles.title}>🚀 식별번호 수정 🚀</Text>

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
          placeholder="식별번호 (7 자리)"
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
          <Text style={styles.buttonText}>식별번호 수정</Text>
        </TouchableOpacity>

        <Button title="로그인 페이지로!" onPress={handleGoToLogin} />
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
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Fix;