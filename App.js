import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider, useAuth } from './AuthContext'; // AuthProvider 추가

import Fix from "./screens/Fix";
import LoginScreen from "./screens/LoginScreen"; 
import Home from "./screens/Home"; // Home 추가
import Manager_fix from "./screens/Manager_fix";

const Stack = createNativeStackNavigator(); // 스택 네비게이터

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}

//AppContent 은 (Login , Fix , Orders , Manager_fix)
function AppContent() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={Home}
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
        
        {/* Orders.js를 HomeTabs로 변경 */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Orders"
          component={Home}
        />

        <Stack.Screen
          name="Manager_fix"
          component={Manager_fix}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
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