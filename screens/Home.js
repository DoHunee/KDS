import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AuthProvider } from "../AuthContext";
import colors from "../refs/colors"; // colors 추가

import Orders from "../screens/Orders";
import Current from "../screens/Current";
import Complete from "../screens/Complete";
import Schedule from "../screens/Schedule";
import User from "./User"

import PasswordScreen from "../screens/PasswordScreen";
import ManagerStackScreen from "../Stack/ManagerStackScreen";
import Manager from "./Manager";  

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
              name="current"
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
              name="complete"
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
              name="schedule"
              component={Schedule}
            />

            <Tab.Screen
              options={{
                tabBarLabel: "사용자",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="account-plus-outline"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="User"
              component={User}
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
              component={ManagerStackScreen}
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