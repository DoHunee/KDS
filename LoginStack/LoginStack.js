// LoginStack.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../AuthContext";
import { StatusBar } from "expo-status-bar";

import Fix from "./Fix";
import LoginScreen from "./LoginScreen";
import Orders from "../Bottom_screens/Orders";

const Stack = createNativeStackNavigator();

function LoginStack() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Orders"
            component={Orders}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}

        <Stack.Screen
          name="Fix"
          component={Fix}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default LoginStack;
