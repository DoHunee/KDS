// Manager.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const Manager = () => {
  const navigation = useNavigation();

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Manager_fix로 이동
  const handleGoToManagerfix = () => {
    navigation.navigate("Manager_fix");
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>🚀 관리자 페이지 🚀</Text>
          <Button title="포스번호 변경 등등 !" onPress={handleGoToManagerfix} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
    textAlign: "center",
  },
});


export default Manager;