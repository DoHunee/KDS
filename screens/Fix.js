//Fix.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Button ,Alert ,TouchableWithoutFeedback} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native"; 
import Refresh from "../components/Refresh";

const Fix = ({ route, navigation }) => {

  const { employeeID } = route.params || {}; // route.params가 없을 경우 빈 객체로 초기화
 

  // 사용자가 입력한 identification number를 저장할 state
  const [modifiedEmployeeID, setModifiedEmployeeID] = useState("");

  // AsyncStorage에 저장된 값을 가져와서 state에 반영하는 함수
  const fetchModifiedEmployeeID = async () => {
    try {
      const storedModifiedEmployeeID = await AsyncStorage.getItem("modifiedEmployeeID");
      if (storedModifiedEmployeeID) {
        setModifiedEmployeeID(storedModifiedEmployeeID);
      }
    } catch (error) {
      console.error("AsyncStorage error:", error);
      // 에러 처리 로직 추가
    }
  };

  // 컴포넌트가 처음 마운트될 때 AsyncStorage에서 값을 가져와서 state에 반영
  useEffect(() => {
    fetchModifiedEmployeeID();
  }, [])


  // 수정된 identification number를 AsyncStorage에 저장하고 state에 반영하는 함수
const handleUpdateEmployeeID = async () => {
  try {
    await AsyncStorage.setItem("modifiedEmployeeID", modifiedEmployeeID);
    console.log("AsyncStorage에 변환된 식별번호를 저장했습니다!", modifiedEmployeeID);
    Alert.alert("식별번호가 변경되었습니다");

    setModifiedEmployeeID(""); // 입력란 초기화

    // AsyncStorage에 값을 저장한 후에, fetchModifiedEmployeeID 함수를 호출하여 상태에 반영
    fetchModifiedEmployeeID();
  } catch (error) {
    console.error("AsyncStorage error:", error);
  }
};


  

  // LoginScreen으로 이동하는 함수
  const handleGoToLogin = () => {
    navigation.navigate("Login");
  };

    // 키보드 내리기
    const handleDismissKeyboard = () => {
      Keyboard.dismiss();
    };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🚀 식별번호 수정 🚀</Text>


        <TextInput
          style={styles.input}
          placeholder="식별번호 (7 자리)"
          keyboardType="numeric"
          maxLength={7}
          value={modifiedEmployeeID}
          onChangeText={(text) => setModifiedEmployeeID(text)}
        />
          
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateEmployeeID}
        >
          <Text style={styles.buttonText}>식별번호수정 </Text>
        </TouchableOpacity>

        <Button title="로그인 페이지로!" onPress={handleGoToLogin} />
      </View>
      
    </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
};


// 스타일 정의
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
    color: "black",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: 200,
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
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Fix;