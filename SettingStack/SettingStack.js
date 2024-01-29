// SettingStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar } from "expo-status-bar";
import Sales from "./Sales";
import colors from "../refs/colors"; // colors 추가

import PasswordScreen from "./ManagerStack/PasswordScreen";
import ManagerScreen from "./ManagerStack/ManagerScreen";
import ManagerFix from "./ManagerStack/ManagerFix";
import ManagerStack from "./ManagerStack/ManagerStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginStack from "./LoginStack/LoginStack";
import Complete from "./Complete";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const SettingTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="사용자"
      activeColor={"black"} //selected icon
      inactiveColor={"black"} // unselected icon
      barStyle={{ backgroundColor: "white" }} // background
    >
      <Tab.Screen
        options={{
          tabBarLabel: "사용자",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? colors.secondary : color}
              size={26}
            />
          ),
        }}
        name="LoginStack"
        component={LoginStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "처리 완료",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              color={focused ? colors.secondary : color}
              size={26}
            />
          ),
        }}
        name="Complete"
        component={Complete}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "매출",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="timetable"
              color={focused ? colors.secondary : color}
              size={26}
            />
          ),
        }}
        name="Schedule"
        component={Sales}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "관리자",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account-lock"
              color={focused ? colors.secondary : color}
              size={26}
            />
          ),
        }}
        name="ManagerStack"
        component={ManagerStack}
      />
    </Tab.Navigator>
  );
};

export default function SettingStack() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="PasswordScreen">
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
         */}
        <Stack.Screen
          name=" SettingTabs"
          component={SettingTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManagerStack"
          component={ManagerStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
