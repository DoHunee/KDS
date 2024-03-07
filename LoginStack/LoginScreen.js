// LoginScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 추가
import { login, logout } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginFormComponents/LoginForm";
import connectToServer from "../Socket/Socket";

const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // 저장할 값들의 초기값 설정
  const [storedNumber, setStoredNumber] = useState(["", "", "", ""]);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 예제 값들을 useState로 관리
  const [storedNumberExample, setStoredNumberExample] = useState("1234");
  const [CategoryNumberExample, setStoredCategoryNumberExample] = useState("5");
  const [EmployeeIDExample, setStoredEmployeeIDExample] = useState("6789012");
  // storedNumberRefs 정의
  const storedNumberRefs = [useRef(), useRef(), useRef(), useRef()];
  const categoryNumberRef = useRef();
  const employeeIDRef = useRef();
  const socket = useRef(null);

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
    return (
      storedNumberString === storedNumberExample &&
      categoryNumber === CategoryNumberExample &&
      employeeID === EmployeeIDExample
    );
  };

  // Fix.js,Manager.js에서 받아온 수정된 식별번호들 끌어오기!
  // Fix.js에서 업데이트된 값들이 존재하면 값 끌어오기
  // Fix.js에서 받아온 modifiedEmployeeID(수정된 식별번호)를  할당
  // 예시: handleUpdateValues("modifiedEmployeeID", modifiedEmployeeID, setStoredEmployeeIDExample);
  // Manager.js에서 받아온 storedNumberExample(수정된 매장번호)를  할당
  // 예시: handleUpdateValues("storedNumberExample", storedNumberExample, setStoredNumberExample);
  // Manager.js에서 받아온 CategoryNumberExample(수정된 포스번호)를 할당
  // 예시: handleUpdateValues("CategoryNumberExample", CategoryNumberExample, setStoredCategoryNumberExample);
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
      if (!isLoggedIn) {
        dispatch(
          login({
            stCode: storedNumber.join(""), // 4자리 번호
            categoryNumber, // 2자리 번호
            employeeID, // 7자리 번호
          })
        ); // 전역으로 업데이트
        setIsLoggedIn(true); // 로컬로 업데이트
        setStoredEmployeeIDExample(employeeID); //사원번호를 update하는 부분!

        Alert.alert("로그인 성공", "환영합니다!");
        // 추가: 로그인 성공 시 사용자가 입력한 값을 초기화
        setStoredNumber(["", "", "", ""]);
        setCategoryNumber("");
        setEmployeeID("");
      } else {
        // 이미 로그인 상태인 경우
        Alert.alert("로그인 성공", "이미 로그인되어 있습니다.");
      }
    } else {
      Alert.alert("로그인 실패", "입력한 정보가 올바르지 않습니다.");
    }
  };

  // 로그아웃 로직
  const handleLogout = async () => {
    Alert.alert(
      "< CLOSE >",
      "정말로 로그아웃 하시겠습니까?",
      [
        {
          text: "폐점",
          onPress: async () => {
            dispatch(logout()); // 전역으로 업데이트
            setIsLoggedIn(false); // 로컬 상태 업데이트
            if (socket.current) {
              socket.current.disconnect(); // 소켓 연결 해제
              socket.current = null; // 소켓 상태 초기화
            }
          },
        },
        {
          text: "로그아웃",
          onPress: async () => {
            dispatch(logout()); // 전역으로 업데이트
            setIsLoggedIn(false); // 로컬 상태 업데이트
          },
        },
        {
          text: "취소",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  // Fix.js(식별번호 수정)으로 이동!!
  const handleGoToFix = () => {
    navigation.navigate("Fix");
  };

  // 키보드 내리기
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // storedNumber 및 categoryNumber 초기값 설정 => 다시 로그인할때도 매장번호와 포스번호는 고정되게 세팅
  useEffect(() => {
    setStoredNumber([...storedNumberExample]); //매장번호
    setCategoryNumber(CategoryNumberExample); //포스번호
  }, [storedNumberExample, CategoryNumberExample]);
  // isLoggedIn 상태 변화에 반응하여 많은 기능을 수행하는 useEffect 부분!

  useEffect(() => {
    // 로그인 상태가 true일 때 실행되는 로직
    if (isLoggedIn) {
      navigation.navigate("Orders");
      
      // 현재 소켓 연결이 없을 때만 소켓 연결 시도
      if (!socket.current) {
        // 어차피 example 값과 맞아야 로그인이 되니까 이렇게 해도 상관없네!
        socket.current = connectToServer(storedNumberExample,CategoryNumberExample,EmployeeIDExample,dispatch);
        console.log(storedNumberExample, CategoryNumberExample, EmployeeIDExample);
       
        // // 소켓 연결 후 "open" 이벤트 전송
        // socket.current.emit("open", {
        //   stCode: storedNumberExample, // 배열 형태의 storedNumber를 문자열로 결합
        // });
        
      }
    } else {
      // console.log("로그아웃 후 isLoggedIn:", isLoggedIn);
      // 이 부분의 로직은 useEffect의 반환 함수로 이동됩니다.
    }

    // AsyncStorage에서 수정된 값을 가져와 반영하는 로직
    const fetchModified = async () => {
      try {
        const modifiedEmployeeID = await AsyncStorage.getItem(
          "modifiedEmployeeID"
        );
        const storedNumberExample = await AsyncStorage.getItem(
          "storedNumberExample"
        );
        const CategoryNumberExample = await AsyncStorage.getItem(
          "CategoryNumberExample"
        );

        if (modifiedEmployeeID) {
          handleUpdateValues(
            "modifiedEmployeeID",
            modifiedEmployeeID,
            setStoredEmployeeIDExample
          );
        }
        if (storedNumberExample) {
          handleUpdateValues(
            "storedNumberExample",
            storedNumberExample,
            setStoredNumberExample
          );
        }
        if (CategoryNumberExample) {
          handleUpdateValues(
            "CategoryNumberExample",
            CategoryNumberExample,
            setStoredCategoryNumberExample
          );
        }
      } catch (error) {
        console.error("AsyncStorage 에러:", error);
      }
    };

    fetchModified();

    // 컴포넌트 언마운트 또는 로그아웃 시 소켓 연결 해제
    // 이 부분이 로그아웃과 컴포넌트 언마운트 시 소켓 연결을 해제하는 유일한 부분입니다.
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [isLoggedIn, socket, storedNumber, categoryNumber, employeeID]);

  // Return 부분
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.container}>
          <Text style={styles.title}>🚀 Open 🚀</Text>
          {isLoggedIn ? (
            // 로그인 후 화면
            <View>
              <SafeAreaView style={styles.container}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.buttonText}>로그아웃</Text>
                </TouchableOpacity>
                <Button title="식별번호 수정" onPress={handleGoToFix} />
              </SafeAreaView>
            </View>
          ) : (
            // 로그인 전 화면
            <View>
              {/* LoginForm 컴포넌트를 렌더링합니다. */}
              <LoginForm
                storedNumber={storedNumber}
                handleDigitInput={handleDigitInput}
                storedNumberRefs={storedNumberRefs}
                categoryNumber={categoryNumber}
                setCategoryNumber={setCategoryNumber}
                employeeID={employeeID}
                setEmployeeID={setEmployeeID}
              />
              {/* 추가 입력란들 및 예시 값 */}
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                예시 값: {storedNumberExample} - {CategoryNumberExample} -{" "}
                {EmployeeIDExample}
              </Text>
              {/* 로그인 버튼 */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
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
});
export default LoginScreen;
