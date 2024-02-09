// SettingStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StatusBar} from "expo-status-bar";
import Sales from "./Sales";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ManagerStack from "../ManagerStack/ManagerStack";
import LoginStack from "../LoginStack/LoginStack";
import Stock from "./Stock";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const SettingTabs = () => {
  return (
    <>
    <StatusBar hidden />  
    <Tab.Navigator
      initialRouteName="사용자"
      activeColor={"black"} //selected icon
      inactiveColor={"black"} // unselected icon
      barStyle={{ backgroundColor: "white" }} // 상단 탭의 배경색 조정
    >
      <Tab.Screen
        options={{
          tabBarLabel: "사용자",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color="black"
              size={26}
            />
          ),
        }}
        name="LoginStack"
        component={LoginStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "품절처리",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="basket-off-outline"
              color="black"
              size={26}
            />
          ),
        }}
        name="Stock"
        component={Stock}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "매출",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="timetable"
              color="black"
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
              color="black"
              size={26}
            />
          ),
        }}
        name="ManagerStack"
        component={ManagerStack}
      />
    </Tab.Navigator>
    </>
  );
};

export default function SettingStack() {
  return (
    <>
      <StatusBar style="auto" />
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
