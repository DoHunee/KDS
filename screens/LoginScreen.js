import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const LoginScreen = ({ navigation, route }) => {
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

  // Example values ​​to be stored
  const storedNumberExample = "1234";
  const storedCategoryNumberExample = "5";
  const storedEmployeeIDExample = "6789012";

  // Called when a number is entered, stores the entered number in an array, and moves the focus to the next input box as needed.
  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;

    setStoredNumber(newStoredNumber);

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // Login success failure logic!
  const handleLogin = () => {
    if (validateCredentials()) {
      Alert.alert("Login successful", "Welcome!");
      navigation.replace("orders");
    } else {
      Alert.alert("Login failed", "The information you entered is incorrect.");
    }
  };

  // Combine the entered numbers into one string, compare it with the value stored as an example, and return whether there is a match.
  const validateCredentials = () => {
    const storedNumberString = storedNumber.join("");
    const enteredNumber = storedNumberString + categoryNumber + employeeID;

    return (
      storedNumberString === storedNumberExample &&
      categoryNumber === storedCategoryNumberExample &&
      employeeID === storedEmployeeIDExample
    );
  };

  useEffect(() => {
    // Initialize values when the component mounts
    initializeValues();
  }, []);

  // Example usage: call initialization or modification function
  const initializeValues = () => {
    setStoredNumber(["", "", "", ""]);
    setCategoryNumber("");
    setEmployeeID("");
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
        placeholder="직원식별번호(7자리)"
        keyboardType="numeric"
        maxLength={7}
        value={employeeID}
        onChangeText={(text) => setEmployeeID(text)}
        ref={employeeIDRef}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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