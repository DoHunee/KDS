import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import colors from "../refs/colors";
import Button from "../components/Button";

const Profile = ({ navigation, name, role }) => {
  // useLayoutEffect를 사용하여 화면 상단 헤더 스타일 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTintColor: colors.white,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* 사용자 이름 및 역할을 표시하는 Text 컴포넌트 */}
      <Text style={styles.text}>
        안녕하세요, <Text style={{ fontWeight: "bold" }}>{name}</Text>
      </Text>
      <Text style={styles.text}>Role : {role}</Text>

      {/* 로그아웃 버튼을 감싼 View 및 Button 컴포넌트 */}
      <View style={{ marginTop: 5 }}>
        <Button>로그아웃</Button>
      </View>
    </View>
  );
};

export default Profile;

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 25,
    margin: 10,
  },
});