import React from "react";
import { TouchableOpacity, Text, StyleSheet , SafeAreaView ,Alert,Button , setIsLoggedIn} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { CommonActions } from "@react-navigation/native"; //reset을 위해 가져옴



const Logout = () => {

  const navigation = useNavigation();
  const { logout, isLoggedIn } = useAuth();
  const { dispatch } = navigation;
  

  const handleLogout = () => {
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
          onPress: () => {
            // 사용자가 '로그아웃'을 선택한 경우에만 로그아웃 수행
            logout();
            dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
            console.log("로그아웃 후 isLoggedIn:", isLoggedIn);
           
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleGoToFix = () => {
    navigation.navigate("fix");
  };


  return (
    <SafeAreaView >
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.buttonText}>로그아웃</Text>
    </TouchableOpacity>
    <Button title="식별번호 수정" onPress={handleGoToFix} />
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
    color: "#FFF",
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