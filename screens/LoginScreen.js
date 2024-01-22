import React, { useState, useEffect, useRef  } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 추가
import { useAuth } from '../AuthContext';  // useAuth import 추가

const LoginScreen = ({ navigation, route }) => {

  const { logout } = useAuth();  // useAuth 훅을 통해 logout 함수 가져오기

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

// Fix.js,Manager.js에서 받아온 수정된 식별번호들을 해당하는값에 할당
 // Fix.js에서 업데이트된 값들이 존재하면 값 끌어오기
 // Fix.js에서 받아온 modifiedEmployeeID(수정된 식별번호)를  할당
// 예시: handleUpdateValues("modifiedEmployeeID", modifiedEmployeeID, setStoredEmployeeIDExample);
// Manager.js에서 받아온 storedNumberExample(수정된 매장번호)를  할당
// 예시: handleUpdateValues("storedNumberExample", storedNumberExample, setStoredNumberExample);
// Manager.js에서 받아온 storedCategoryNumberExample(수정된 포스번호)를 할당
// 예시: handleUpdateValues("storedCategoryNumberExample", storedCategoryNumberExample, setStoredCategoryNumberExample);
const handleUpdateValues = async (key, value, stateUpdater) => {
  try {
    stateUpdater(value);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("AsyncStorage error:", error);
    // 에러 처리 로직 추가
  }
};

  // 로그인 로직
  const handleLogin = () => {
    if (validateCredentials()) {
      Alert.alert("로그인 성공", "환영합니다!");
      setIsLoggedIn(true);
      
      // 추가: 로그인 성공 시 사용자가 입력한 값을 초기화
      setStoredNumber(["", "", "", ""]);
      setCategoryNumber("");
      setEmployeeID("");
      setStoredEmployeeIDExample(employeeID); //사원번호를 update하는 부분!
      console.log("로그인 상태 : ",isLoggedIn);

      navigation.navigate("Orders"); // 여기서  orders로 이동!
     
    } else {
      Alert.alert("로그인 실패", "입력한 정보가 올바르지 않습니다.");
      
    }
  };

  // 로그아웃 로직
  const handleLogout = async () => {
    Alert.alert(
      "로그아웃",
      "정말로 로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "로그아웃",
          onPress: async () => {
            const modifiedEmployeeID = await AsyncStorage.getItem("modifiedEmployeeID");
            logout();
            setIsLoggedIn(false); // 로그아웃 후에 isLoggedIn 상태를 false로 설정
            navigation.navigate("Login")
          },
        },
      ],
      { cancelable: false }
    );
  };

// 로그인,로그아웃 시 isLoggedIn 확인:
 useEffect(() => {
  if (isLoggedIn) {
    // navigation.navigate("Orders"); //여기에 코드가 있어도 로그인시 orders로 이동
    console.log("로그인 후 isLoggedIn:", isLoggedIn);
  }else{
    console.log("로그아웃 후 isLoggedIn:", isLoggedIn);
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


  // Fix.js(식별번호 수정)으로 이동!!
   const handleGoToFix = () => {
    navigation.navigate("Fix");
  };

  // Orders.js(주문목록)으로 이동!!
  const handleGoToOrders = () => {
    navigation.navigate("Orders");
  };

  // 키보드 내리기
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };


// Return 부분  
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
            <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
            <Button title="접수대기 목록으로!" onPress={handleGoToOrders} />
            <Button title="식별번호 수정" onPress={handleGoToFix} />
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
  logoutButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
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