import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Current from "./screens/Current";
import Orders from "./screens/Orders";
import Complete from "./screens/Complete";
import Schedule from "./screens/Schedule";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "./refs/colors";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  // const [date, newData] = useState("");
  // let d = new Date();
  // let time = d.getTime();
  // useEffect(() => {
  //   let timeout = setInterval(() => {
  //     newData(time);
  //   }, 1000);
  //   return () => clearInterval(timeout);
  // }, [date]);
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="current"
        activeColor={colors.tertiary}
        inactiveColor={colors.lightGray}
        barStyle={{ backgroundColor: colors.secondary }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: "Current",
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
            tabBarLabel: "Orders",
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                color={focused ? colors.secondary : color}
                size={26}
              />
            ),
          }}
          name="orders"
          component={Orders}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Complete",
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
            tabBarLabel: "Schedule",
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
      </Tab.Navigator>
    </NavigationContainer>
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
