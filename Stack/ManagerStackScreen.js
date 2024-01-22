// ManagerStackScreen.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Manager } from "../screens/Manager";
import {Manager_fix} from "../screens/Manager_fix";
import PasswordScreen from "../screens/PasswordScreen";

const Stack = createNativeStackNavigator();

const ManagerStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Manager"
        component={Manager}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Manager_fix"
        component={Manager_fix}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ManagerStackScreen;