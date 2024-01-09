import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/actions/authActions';  // 사용자 인증 액션을 dispatch 하는 액션 생성자 함수
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { store } from "./store/store";
import colors from "./refs/colors";

const Tab = createMaterialBottomTabNavigator();  //하단 네비게이션 탭 생성 
const Stack = createNativeStackNavigator();  //스택 네비게이터

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <TextInput
        label="사용자 이름"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title="로그인"
        onPress={() => onLogin(username, password)}
      />
    </View>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogin = (username, password) => {
    // 여기에서 실제 사용자 인증 로직을 구현합니다.
    // 사용자가 유효하다면 Redux 액션을 디스패치하여 로그인 상태를 변경합니다.
    if (username === 'user' && password === 'password') {
      dispatch(loginUser());
    } else {
      alert('로그인 실패. 다시 시도하세요.');
    }
  };

  if (isAuthenticated) {
    // 로그인이 성공한 경우 메인 화면을 표시
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator
            activeColor={colors.tertiary}
            inactiveColor={"black"}
            barStyle={{ backgroundColor: "white" }}
          >
            {/* 기존 코드... */}
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

  // 로그인이 되지 않은 경우 로그인 화면을 표시
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          activeColor={colors.tertiary}
          inactiveColor={"black"}
          barStyle={{ backgroundColor: "white" }}
        >
          {/* 기존 코드... */}

          {/* 새로 추가된 로그인 화면 */}
          <Tab.Screen
            options={{
              tabBarLabel: "로그인",
              tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons
                  name="login"
                  color={focused ? colors.secondary : color}
                  size={26}
                />
              ),
            }}
            name="login"
          >
            {() => (
              <LoginScreen
                onLogin={(username, password) => handleLogin(username, password)}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginVertical: 8,
  },
});