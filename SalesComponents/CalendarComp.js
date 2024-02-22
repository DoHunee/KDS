// CalendarComp.js
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

//한국어 세팅
LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
};
LocaleConfig.defaultLocale = "ko"; // set default language

const CalendarComp = ({
  markedDates,
  current,
  calendarKey,
  handleCalenderDay,
  handleSelectToday,
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.TodayButton} onPress={handleSelectToday}>
        <Text style={styles.buttonText}>Today</Text>
      </TouchableOpacity>

      <Calendar
        style={styles.calendar}
        key={calendarKey} // 캘린더 컴포넌트에 키를 할당
        current={current} // 현재 보여질 월을 current 상태로 설정
        markedDates={markedDates}
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  TodayButton: {
    backgroundColor: "white",
    paddingVertical: 10, // 상하 여백을 작게 조정합니다.
    paddingHorizontal: 20, // 좌우 여백을 작게 조정합니다.
    borderRadius: 8, // 둥근 모서리의 반경을 작게 조정합니다.
    marginTop: 30,
    alignSelf: "flex-end", // 오른쪽 정렬합니다.
    marginRight: 20, // 오른쪽 여백을 추가합니다.
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CalendarComp;
