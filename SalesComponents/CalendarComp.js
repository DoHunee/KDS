// CalendarComp.js
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

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
  isDatePickerVisible,
  handleCalenderDay,
  handleSelectToday,
  handleDateChange,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
}) => {

  return (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.Button, styles.firstButton]}
          onPress={handleSelectToday}
        >
          <Text style={styles.buttonText}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>날짜 선택</Text>
        </TouchableOpacity>
      </View>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

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
  buttonContainer: {
    flexDirection: "row", // 가로로 나열
    justifyContent: "flex-end", // 컨테이너의 오른쪽 끝에 자식 요소들을 정렬
    marginTop: 20,
    marginBottom: 10,
  },

  calendar: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  Button: {
    // 기존 스타일을 유지하되, marginRight과 alignSelf 제거
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  // 첫 번째 버튼의 스타일을 수정하여 오른쪽에 간격 추가
  firstButton: {
    marginRight: 10, // 첫 번째 버튼과 두 번째 버튼 사이의 간격
  },
});

export default CalendarComp;
