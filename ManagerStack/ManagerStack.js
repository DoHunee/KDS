// ManagerStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';

import PasswordScreen from "./PasswordScreen";
import ManagerScreen from "./ManagerScreen";
import ManagerFix from "./ManagerFix";

const Stack = createNativeStackNavigator();

export default function ManagerStack() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="PasswordScreen">
        <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerScreen" component={ManagerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ManagerFix" component={ManagerFix} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
}