import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";

const Schedule = () => {
  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>🚀 관리자 페이지 🚀</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const handleDismissKeyboard = () => {
  // 키보드 dismiss 로직 추가
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

export default Schedule;