import React from "react";
import { StyleSheet } from "react-native"; // View, Text 추가
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider, useAuth } from "./auth/AuthContext"; // AuthProvider 추가

import SettingStack from "./SettingStack/SettingStack";
import Orders from "./Bottom_screens/Orders";
import Current from "./Bottom_screens/Current";
import Complete from "./Bottom_screens/Complete";
import { SocketProvider } from "./Socket/SocketContext";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <SocketProvider>
        <AuthProvider> 
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
                    name="account-cog-outline"
                    color="black"
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
                    color="black"
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
                    color="black"
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
                    color="black"
                    size={26}
                  />
                ),
              }}
              name="Complete"
              component={Complete}
            />
          </Tab.Navigator>
        </AuthProvider>
        </SocketProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
