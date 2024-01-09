import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Current from "./screens/Current";
import Orders from "./screens/Orders";
import Complete from "./screens/Complete";
import Schedule from "./screens/Schedule";
import manager from "./screens/manager"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "./refs/colors";
import Profile from "./screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/authActions';  // 사용자 인증 액션을 dispatch 하는 액션 생성자 함수



const Tab = createMaterialBottomTabNavigator();  //하단 네비게이션 탭 생성 
const Stack = createNativeStackNavigator();  //스택 네비게이터

export default function App() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("아이디와 패스워드를 입력하세요.");
      return;
    }

    dispatch(loginUser({ username, password }));
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="orders"
          component={Orders}
        />
        <Stack.Screen
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
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="아이디"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="패스워드"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Button title="로그인" onPress={handleLogin} />

          <Tab.Navigator
            activeColor={colors.tertiary}
            inactiveColor={"black"}
            barStyle={{ backgroundColor: "white" }}
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
              name="homeStack"
              component={HomeStack}
            />
            <Tab.Screen
              options={{
                tabBarLabel: " 접수완료",
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
                tabBarLabel: "처리완료",
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
                tabBarLabel: "예약",
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
                tabBarLabel: "관리자",
                tabBarIcon: ({ color, focused }) => (
                  <MaterialCommunityIcons
                    name="account-plus-outline"
                    color={focused ? colors.secondary : color}
                    size={26}
                  />
                ),
              }}
              name="manager"
              component={manager}
            />
          </Tab.Navigator>
        </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
  },
});