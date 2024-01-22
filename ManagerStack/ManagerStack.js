// ManagerStack.js

import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';


import { PasswordScreen } from "./PasswordScreen";
import { ManagerScreen } from "./ManagerScreen";
import { ManagerFix } from "./ManagerFix";

const Stack = createNativeStackNavigator();

const ManagerStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 isLoggedIn을 자동으로 true로 변경
    setIsLoggedIn(true);
  }, []);

  if (isLoggedIn) {
  return (
    <>
      <StatusBar style="light" /> {/* StatusBar가 Stack.Navigator의 일부로 변경됨 */}
      <Stack.Navigator initialRouteName="PasswordScreen">  {/* 초기 화면을 PasswordScreen으로 설정 */}
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerFix" component={ManagerFix} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
  } else {
    // 로그인이 필요한 화면에 접근하지 못할 경우 Alert 띄우기
    Alert.alert("로그인하고 접근해주세요");
    return null; // 렌더링하지 않음
  }
};

export default ManagerStack;
