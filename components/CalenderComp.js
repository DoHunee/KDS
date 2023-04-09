import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";

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
        top: StatusBar.currentHeight + 20,
      }}
    >
      <Calendar
        style={{ borderRadius: 20 }}
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />
    </View>
  );
};

export default CalenderComp;

const styles = StyleSheet.create({});
