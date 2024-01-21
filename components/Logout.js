import React from "react";
import { TouchableOpacity, Text, StyleSheet , SafeAreaView ,Alert,Button , setIsLoggedIn} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { CommonActions } from "@react-navigation/native"; //reset을 위해 가져옴
import AsyncStorage from "@react-native-async-storage/async-storage";



const Logout = () => {

  const navigation = useNavigation();
  const { logout } = useAuth();
  const { dispatch } = navigation;
  

  const handleLogout =async ()  => {
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
            // Get the modified employee ID from AsyncStorage
            const modifiedEmployeeID = await AsyncStorage.getItem("modifiedEmployeeID");
            logout();
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoToFix = () => {
    navigation.navigate("Fix");
  };

  const handleGoToOrders = () => {
    navigation.navigate("Orders");
  };

  // 관리자만 접근할 수 있도록 비밀번호 설정!!
  const handleGoToManagerFix = () => {
    const correctPassword = "0000"; // 여기에 특정 4자리 비밀번호를 설정합니다.
  
    // 비밀번호 입력을 받는 Prompt 창을 띄웁니다.
    Alert.prompt(
      "비밀번호 확인",
      "비밀번호를 입력하세요:",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: (password) => {
            // 입력된 비밀번호가 4자리인지 확인합니다.
            if (password.length === 4) {
              // 입력된 비밀번호가 올바른지 확인합니다.
              if (password === correctPassword) {
                // 올바를 경우 "Manager_fix" 화면으로 이동합니다.
                navigation.navigate("Manager_fix");
              } else {
                // 틀린 경우 알림을 표시합니다.
                Alert.alert("비밀번호가 올바르지 않습니다.");
              }
            } else {
              // 4자리가 아닌 경우 알림을 표시합니다.
              Alert.alert("비밀번호는 4자리여야 합니다.");
            }
          },
        },
      ],
      "secure-text", // 입력을 숨깁니다.
      null, // 기본값은 null입니다.
      "numeric", // 키패드를 숫자 전용으로 설정합니다.
      4 // 최대 길이를 4로 설정합니다.
    );
  };

  return (
    <SafeAreaView >
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.buttonText}>로그아웃</Text>
    </TouchableOpacity>
    <Button title="접수대기 목록으로!" onPress={handleGoToOrders} />
    <Button title="식별번호 수정" onPress={handleGoToFix} />
    <Button title="매장,포스 번호 수정" onPress={handleGoToManagerFix} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
});
export default Logout;