import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from "react-native";
import Logout from "../components/Logout";  // 수정이 필요한 부분
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 추가

const LoginScreen = ({ navigation, route }) => {
  // 저장할 값들의 초기값 설정
  const [storedNumber, setStoredNumber] = useState(["", "", "", ""]);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  


  // 예제 값들을 useState로 관리
  const [storedNumberExample, setStoredNumberExample] = useState("1234");
  const [storedCategoryNumberExample, setStoredCategoryNumberExample] = useState("5");
  const [storedEmployeeIDExample, setStoredEmployeeIDExample] = useState("6789012");

    // storedNumber 및 categoryNumber 초기값 설정 => 다시 로그인할때도 매장번호와 포스번호는 고정되게 세팅
    useEffect(() => {
      setStoredNumber([...storedNumberExample]);
      setCategoryNumber(storedCategoryNumberExample);
    }, [storedNumberExample, storedCategoryNumberExample]);
  

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
      setIsLoggedIn(true);
      
      // 추가: 로그인 성공 시 사용자가 입력한 값을 초기화
      setStoredNumber(["", "", "", ""]);
      setCategoryNumber("");
      setEmployeeID("");
      setStoredEmployeeIDExample(employeeID); //사원번호를 update하는 부분!
     
    } else {
      Alert.alert("로그인 실패", "입력한 정보가 올바르지 않습니다.");
      
    }
  };

 
// Fix.js,Manage.js에서 받아온 수정된 식별번호들을 해당하는값에 할당
const handleUpdateValues = async (key, value, stateUpdater) => {
  try {
    stateUpdater(value);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("AsyncStorage error:", error);
    // 에러 처리 로직 추가
  }
};

 // Fix.js에서 업데이트된 값들이 존재하면 값 끌어오기
 // Fix.js에서 받아온 modifiedEmployeeID(수정된 식별번호)를  할당
// 예시: handleUpdateValues("modifiedEmployeeID", modifiedEmployeeID, setStoredEmployeeIDExample);
// Manager.js에서 받아온 storedNumberExample(수정된 매장번호)를  할당
// 예시: handleUpdateValues("storedNumberExample", storedNumberExample, setStoredNumberExample);
// Manager.js에서 받아온 storedCategoryNumberExample(수정된 포스번호)를 할당
// 예시: handleUpdateValues("storedCategoryNumberExample", storedCategoryNumberExample, setStoredCategoryNumberExample);

 useEffect(() => {
  // 로그인 여부 확인:
  if (isLoggedIn) {
    navigation.navigate("Orders");
    console.log("로그인 후 isLoggedIn:", isLoggedIn);
  }


  // AsyncStorage에서 수정된 값을 가져와서 반영
  const fetchModified = async () => {
    try {
      const modifiedEmployeeID = await AsyncStorage.getItem("modifiedEmployeeID");
      const storedNumberExample = await AsyncStorage.getItem("storedNumberExample");
      const storedCategoryNumberExample = await AsyncStorage.getItem("storedCategoryNumberExample");
      
      if (modifiedEmployeeID) {
        handleUpdateValues("modifiedEmployeeID", modifiedEmployeeID, setStoredEmployeeIDExample);
      }

      if (storedNumberExample) {
        handleUpdateValues("storedNumberExample", storedNumberExample, setStoredNumberExample);
      }

      if (storedCategoryNumberExample) {
        handleUpdateValues("storedCategoryNumberExample", storedCategoryNumberExample, setStoredCategoryNumberExample);
      }
    } catch (error) {
      console.error("AsyncStorage 에러:", error);
      // 에러 처리 로직 추가
    }
  };

  fetchModified();
}, [isLoggedIn, navigation]);


  // 키보드 내리기
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.container}>
          <Text style={styles.title}>🚀 OPen 🚀</Text>
  
          {isLoggedIn ? (
            // 로그인 후 화면
           <View>
            {/* 로그아웃 + 식별번호 수정 버튼 */}
            <SafeAreaView style={styles.container}>
            <Logout navigation={navigation} />
            </SafeAreaView>         
          </View>
          ) : (
            // 로그인 전 화면
            <View>
              <View style={styles.inputContainer}>
                {/* 여러 개의 TextInput으로 이루어진 입력란 */}
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
  
              {/* 추가 입력란들 */}
              <TextInput
                style={[styles.digitInput, { alignSelf: 'center' }]}
                keyboardType="numeric"
                maxLength={2}
                value={categoryNumber}
                onChangeText={(text) => setCategoryNumber(text)}
                ref={categoryNumberRef}
              />
  
              <TextInput
                style={[styles.input, { alignSelf: 'center' }]}
                placeholder="사원 식별 번호 (7자리)"
                keyboardType="numeric"
                maxLength={7}
                value={employeeID}
                onChangeText={(text) => setEmployeeID(text)}
                ref={employeeIDRef}
              />

              <Text style={{ color: 'gray', fontSize: 14, alignSelf: 'center', marginTop: 10 }}>
                예시 값: {storedNumberExample} - {storedCategoryNumberExample} - {storedEmployeeIDExample}
              </Text>
  
              {/* 로그인 버튼 */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
              </TouchableOpacity>

              

            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
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
    color: "black",
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
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#FF4500", // 예시 색상 (눈에 띄는 색상으로 변경 가능)
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20, // 수정된 부분: 기존보다 더 큰 간격으로 조정
  },

  logoutButton: {
    backgroundColor: "#61dafb", // 로그아웃 버튼과 비슷한 색상
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },

  updateButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
});

export default LoginScreen; 