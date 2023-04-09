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
import Profile from "./screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="orders"
          component={Orders}
        />
        <Stack.Screen
          // options={{ headerShown: false }}
          name="profile"
          component={Profile}
        />
      </Stack.Navigator>
    );
  };

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
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          activeColor={colors.tertiary}
          inactiveColor={colors.lightGray}
          barStyle={{ backgroundColor: colors.secondary }}
        >
          <Tab.Screen
            options={{
              tabBarLabel: "Pending",
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name="clipboard-list-outline"
                  color={focused ? colors.secondary : color}
                  size={26}
                />
              ),
            }}
            name="homeStack"
            component={HomeStack}
          />
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
