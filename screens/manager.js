import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logout from "../components/Logout";

const Manager = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // HomeStack으로 이동 _ 이렇게 순차적으로 이동해야해!!
    navigation.navigate("homeStack");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logout 버튼을 눌렀을 때 handleLogout 함수 실행 */}
      <Logout onPress={handleLogout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Manager;