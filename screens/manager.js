// Manager.js
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Button ,Alert ,TouchableWithoutFeedback} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native"; 
import { useNavigation } from '@react-navigation/native';




const Manager = () => {

  // 사용자가 입력한 identification number를 저장할 state
  const [storedNumberExample, setStoredNumberExample] = useState("");
  const [storedCategoryNumberExample, setStoredCategoryNumberExample] = useState("");

  // AsyncStorage에서 값을 가져와서 상태에 반영
  const fetchStoredValues = async () => {
    try {
      const storedNumberExampleValue = await AsyncStorage.getItem("storedNumberExample");
      const storedCategoryNumberExampleValue = await AsyncStorage.getItem("storedCategoryNumberExample");

      if (storedNumberExampleValue) {
        setStoredNumberExample(storedNumberExampleValue);
      }

      if (storedCategoryNumberExampleValue) {
        setStoredCategoryNumberExample(storedCategoryNumberExampleValue);
      }
    } catch (error) {
      console.error("AsyncStorage 에러:", error);
      // 에러 처리 로직 추가
    }
  };

    // 컴포넌트가 마운트될 때 AsyncStorage에서 값을 불러옴
    useEffect(() => {
      fetchStoredValues();
    }, []);

    //매장번호를 수정하는 함수 
    const handlestoredNumber = async () => {
      try {
        await AsyncStorage.setItem("storedNumberExample", storedNumberExample);
        console.log("AsyncStorage에 변환된 매장번호를 저장했습니다!", storedNumberExample);
        Alert.alert("매장번호가 변경되었습니다");
    
        setStoredNumberExample(""); // 입력란 초기화
    
        // AsyncStorage에 값을 저장한 후에, fetchStoredValues 함수를 호출하여 상태에 반영
        fetchStoredValues();
      } catch (error) {
        console.error("AsyncStorage error:", error);
      }
    };

    // 포스번호를 수정하는 함수 
    const handleCategoryNumberExample = async () => {
      try {
        await AsyncStorage.setItem("storedCategoryNumberExample", storedCategoryNumberExample);
        console.log("AsyncStorage에 변환된 포스번호를 저장했습니다!", storedCategoryNumberExample);
        Alert.alert("포스번호가 변경되었습니다");
    
        setStoredCategoryNumberExample(""); // 입력란 초기화
    
        // AsyncStorage에 값을 저장한 후에, fetchStoredValues 함수를 호출하여 상태에 반영
        fetchStoredValues();
      } catch (error) {
        console.error("AsyncStorage error:", error);
      }
    };

    const navigation = useNavigation();  // useNavigation 훅을 통해 navigation 객체를 가져옴

    
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
          <Text style={styles.title}>🚀 관리자 페이지 🚀</Text>
  
  
          <TextInput
            style={styles.input}
            placeholder="매장번호 (4 자리)"
            keyboardType="numeric"
            maxLength={4}
            value={storedNumberExample}
            onChangeText={(text) => setStoredNumberExample(text)}
          />

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handlestoredNumber}
          >
            <Text style={styles.buttonText}>매장번호수정 </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="포스번호 (1~2자리)"
            keyboardType="numeric"
            maxLength={2}
            value={storedCategoryNumberExample}
            onChangeText={(text) => setStoredCategoryNumberExample(text)}
          />
          

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleCategoryNumberExample}
          >
            <Text style={styles.buttonText}>포스번호수정 </Text>
          </TouchableOpacity>
  
  
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


export default Manager;