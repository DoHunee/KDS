import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from 'react-native';  // View, Text 추가
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider, useAuth } from './AuthContext'; // AuthProvider 추가
import colors from "./refs/colors"; // colors 추가

import Orders from "./LoginStack/Orders";
import Current from './screens/Current';
import Complete from './screens/Complete';
import Schedule from './screens/Schedule';

import LoginStack from './LoginStack/LoginStack';
import ManagerStack from './ManagerStack/ManagerStack';




const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <AuthProvider>
          <StatusBar style="white" />

          {/* Color when clicking on the bottom tab navigator */}
          <Tab.Navigator
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
              name="User"
              component={LoginStack}
            />

            <Tab.Screen
              options={{
                tabBarLabel: "접수대기",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="clipboard-list-outline"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="Orders"
              component={Orders}
            />
            <Tab.Screen
              options={{
                tabBarLabel: "접수 완료",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="bell-ring-outline"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="Current"
              component={Current}
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
              component={Schedule}
            />
            

            <Tab.Screen
              options={{
                tabBarLabel: "관리자",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="lock"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="Manager"
              component={ManagerStack}
            />
          </Tab.Navigator>
        </AuthProvider> 
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});