import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

// 한국어 설정 추가
LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토']
};

LocaleConfig.defaultLocale = 'ko'; // 기본 언어 설정


const CalendarComp = ({ onPress }) => {
  
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
        style={{ borderRadius: 10 }}
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({});


export default CalendarComp;