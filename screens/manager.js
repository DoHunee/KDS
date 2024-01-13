// Manager.js

import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logout from "../components/Logout";
import Fix from "../components/Fix";

const Manager = () => {
  const navigation = useNavigation();
  const fixRef = useRef();

  useEffect(() => {
    // Fix 컴포넌트 로드 후에 updateExampleValues 호출
    if (fixRef.current) {
      fixRef.current.updateExampleValues();
    }
  }, []);

  const handleLogout = () => {
    // HomeStack으로 이동 _ 이렇게 순차적으로 이동해야해!!
    navigation.navigate("homeStack");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logout 버튼을 눌렀을 때 handleLogout 함수 실행 */}
      <Logout onPress={handleLogout} />
      <Fix ref={fixRef} />
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