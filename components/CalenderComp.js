import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";   //캘린더 렌더링

// CalenderComp 함수 선언
const CalenderComp = ({ onPress }) => {
  const handleCalenderDay = (day) => {
    onPress(day);
  };


  return (
    <View
      style={{
        padding: 10,
        zIndex: 20000,
        position: "absolute",
        width: Dimensions.get("window").width,
        top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
      }}
    >
      <Calendar
        style={{ borderRadius: 30 }}   // 조금만 둥글게
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />
    </View>
  );
};

export default CalenderComp;

const styles = StyleSheet.create({});
