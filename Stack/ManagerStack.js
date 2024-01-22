// ManagerStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';


import { Manager_fix } from "../ManagerStack/ManagerFix";
import { PasswordScreen } from "../ManagerStack/PasswordScreen";
import {Manager_Screen} from "../ManagerStack/ManagerScreen";

const Stack = createNativeStackNavigator();

const ManagerStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="PasswordScreen">  {/* 초기 화면을 PasswordScreen으로 설정 */}
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Manager_Screen" component={Manager_Screen} options={{ headerShown: false }} />
        <Stack.Screen name="Manager_fix" component={Manager_fix} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="light" /> {/* StatusBar가 Stack.Navigator의 일부로 변경됨 */}
    </>
  );
}; 
export default ManagerStack;
