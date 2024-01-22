// LoginStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../AuthContext';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native"; // 추가

import Fix from "../screens/Fix";
import LoginScreen from "../screens/LoginScreen"; 
import Home from "../screens/Home"; // Home 추가

const Stack = createNativeStackNavigator();

function LoginStack() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="Fix" component={Fix} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
}

export default LoginStack;

