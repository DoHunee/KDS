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

  const handleGoToManagerFix = () => {
    navigation.navigate("Manager_fix");
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