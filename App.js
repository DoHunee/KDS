import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native"; // View, Text 추가
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider, useAuth } from "./AuthContext"; // AuthProvider 추가
import colors from "./refs/colors"; // colors 추가

import Orders from "./Bottom_screens/Orders";
import Current from "./Bottom_screens/Current";
import Complete from "./Bottom_screens/Complete";
import LoginStack from "./SettingStack/LoginStack/LoginStack";
import ManagerStack from "./SettingStack/SettingStack";
import SettingStack from "./SettingStack/SettingStack";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <AuthProvider>
          <StatusBar style="white" />

          {/* Color when clicking on the bottom tab navigator */}
          <Tab.Navigator
            initialRouteName="SettingStack"
            activeColor={"black"} //selected icon
            inactiveColor={"black"} // unselected icon
            barStyle={{ backgroundColor: "white" }} // background
          >
            <Tab.Screen
              options={{
                tabBarLabel: "설정",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="account-cog"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="SettingStack"
              component={SettingStack}
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
