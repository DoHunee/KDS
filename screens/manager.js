// Manager.js

import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet ,Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logout from "../components/Logout";


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

  const handleGoToFix = () => {
    navigation.navigate("fix");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logout 버튼을 눌렀을 때 handleLogout 함수 실행 */}
      <Logout onPress={handleLogout} />

       {/* Fix.js로 이동하는 버튼 추가 */}
       <Button title="식별번호변경" onPress={handleGoToFix} />
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