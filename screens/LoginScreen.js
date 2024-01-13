import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";

const LoginScreen = ({ navigation, route }) => {
    // 저장할 값들의 초기값 설정
    const [storedNumber, setStoredNumber] = useState(["", "", "", ""]);
    const [categoryNumber, setCategoryNumber] = useState("");
    const [employeeID, setEmployeeID] = useState("");

    // Fix.js에서 전달된 exampleValues 받아오기
    const exampleValues = route.params?.exampleValues;
    console.log("Current route.params:", route.params);

    // 예제 값들을 useState로 관리
    const [storedNumberExample, setStoredNumberExample] = useState("1234");
    const [storedCategoryNumberExample, setStoredCategoryNumberExample] = useState("5");
    const [storedEmployeeIDExample, setStoredEmployeeIDExample] = useState("6789012");
  
    // storedNumberRefs 정의
    const storedNumberRefs = [
      useRef(),
      useRef(),
      useRef(),
      useRef(),
    ];
    const categoryNumberRef = useRef();
    const employeeIDRef = useRef();





    // 숫자를 입력할 때 호출되며, 입력된 숫자를 배열에 저장하고 필요에 따라 다음 입력란으로 포커스를 이동합니다.
  const handleDigitInput = (text, index, nextRef) => {
    const newStoredNumber = [...storedNumber];
    newStoredNumber[index] = text;

    setStoredNumber(newStoredNumber);

    if (text.length === 1 && nextRef && nextRef.current) {
      nextRef.current.focus();
    }
  };

  // 입력된 숫자들을 하나의 문자열로 결합하고, 예시 값과 일치하는지 여부를 반환합니다.
  const validateCredentials = () => {
    const storedNumberString = storedNumber.join("");
    const enteredNumber = storedNumberString + categoryNumber + employeeID;

    return (
      storedNumberString === storedNumberExample &&
      categoryNumber === storedCategoryNumberExample &&
      employeeID === storedEmployeeIDExample
    );
  };

  // 로그인이 성공했는지 확인하는 로직
  const handleLogin = () => {
    if (validateCredentials()) {
      Alert.alert("로그인 성공", "환영합니다!");
      console.log("현재 식별번호 : ",storedNumberExample,"+",storedCategoryNumberExample,"+",storedEmployeeIDExample)
      navigation.replace("orders");
    } else {
      Alert.alert("로그인 실패", "입력한 정보가 올바르지 않습니다.");
      console.log("현재 식별번호 : ",storedNumberExample,"+",storedCategoryNumberExample,"+",storedEmployeeIDExample)
    }
  };


  const updateExampleValues = (values) => {
    setStoredNumberExample(values.storedNumber);
    setStoredCategoryNumberExample(values.categoryNumber);
    setStoredEmployeeIDExample(values.employeeID);
  };
  

  useEffect(() => {
    if (route.params?.exampleValues) {
      console.log("Received exampleValues:", route.params.exampleValues);
      updateExampleValues(route.params.exampleValues);
    }
  }, [route.params?.exampleValues]);




return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
   >
    <View style={styles.container}>
      <Text style={styles.title}>🚀 오픈 🚀</Text>

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
        placeholder="사원 식별 번호 (7자리)"
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