//Fix.js
import React, { useState, useEffect } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";

const Fix = ({ route, navigation }) => {
  
  const [modifiedEmployeeID, setModifiedEmployeeID] = useState("");  // 사용자가 입력한 identification number를 저장할 state
  const [originalEmployeeID, setOriginalEmployeeID] = useState("");  // 이전 식별 번호 저장하는 state 추가


  // AsyncStorage에 저장된 값을 가져와서 state에 반영하는 함수
  const fetchModifiedEmployeeID = async () => {
    try {
      const storedModifiedEmployeeID = await AsyncStorage.getItem(
        "modifiedEmployeeID"
      );
      if (storedModifiedEmployeeID) {
        setModifiedEmployeeID(storedModifiedEmployeeID);
        setOriginalEmployeeID(storedModifiedEmployeeID);
      }
    } catch (error) {
      console.error("AsyncStorage error:", error);
      // 에러 처리 로직 추가
    }
  };

  // 컴포넌트가 처음 마운트될 때 AsyncStorage에서 값을 가져와서 state에 반영
  useEffect(() => {
    fetchModifiedEmployeeID();
  }, []);

  // 수정된 identification number를 AsyncStorage에 저장하고 state에 반영하는 함수
  // 식별번호를 수정하는 함수!
  const handleUpdateEmployeeID = async () => {
    try {
      if (modifiedEmployeeID === originalEmployeeID) {
        Alert.alert("알림", "이전과 동일한 식별 번호입니다.");
        return;
      }
      
      await AsyncStorage.setItem("modifiedEmployeeID", modifiedEmployeeID);
      console.log(
        "AsyncStorage에 변환된 식별번호를 저장했습니다!",
        modifiedEmployeeID
      );
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
  
          <View style={styles.inputRow}>
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
              <Text style={styles.buttonText}>식별번호 수정</Text>
            </TouchableOpacity>
          </View>
  
          <Button title="로그인 페이지로!" onPress={handleGoToLogin} />
        </View>
      </KeyboardAvoidingView>
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
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
      color: "black",
      textAlign: "center",
    },
    inputRow: {
      flexDirection: 'row', // 가로 배치
      alignItems: 'center', // 세로 중앙 정렬
      marginBottom: 20, // 하단 요소와의 간격
    },
    input: {
      height: 40,
      flex: 1, // 수정: width 속성 제거, flex 추가
      borderColor: "#61dafb",
      borderBottomWidth: 2,
      marginBottom: 10,
      paddingHorizontal: 15,
      color: "black",
    },
    updateButton: {
      backgroundColor: "#61dafb",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginLeft: 10, 
    },
    buttonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default Fix;
