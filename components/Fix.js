import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle ,ref } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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

  const [exampleValues, setExampleValues] = useState({
    storedNumber: "1234",
    categoryNumber: "5",
    employeeID: "6789012",
  });

  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;

    setStoredNumber(newStoredNumber);

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  useEffect(() => {
    initializeValues();
  }, []);

  useEffect(() => {
    // navigation 객체가 초기화된 후에 호출되도록 useEffect 사용
    if (navigation) {
      updateExampleValues();
    }
  }, [navigation]); // navigation이 변경될 때마다 useEffect가 다시 실행되도록 설정

  const initializeValues = () => {
    setStoredNumber(["", "", "", ""]);
    setCategoryNumber("");
    setEmployeeID("");
  };

  const updateExampleValues = () => {
    if (navigation && navigation.setParams) {
      navigation.setParams({
        storedNumberExample: "5678",
        storedCategoryNumberExample: "3",
        storedEmployeeIDExample: "9876543",
      });
    }
  };

  useImperativeHandle(ref, () => ({
    updateExampleValues,
  }));


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
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
          placeholder="Employee identification number (7 digits)"
          keyboardType="numeric"
          maxLength={7}
          value={employeeID}
          onChangeText={(text) => setEmployeeID(text)}
          ref={employeeIDRef}
        />

        <TouchableOpacity style={styles.updateButton} onPress={updateExampleValues}>
          <Text style={styles.buttonText}>Update Example Values</Text>
        </TouchableOpacity>
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