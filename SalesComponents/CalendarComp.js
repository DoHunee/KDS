// CalendarComp.js
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
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
  setMarkedDates,
  current,
  calendarKey,
  isDatePickerVisible,
  handleCalenderDay,
  handleSelectToday,
  showDatePicker,
  hideDatePicker,
  handleConfirm,
}) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 시작 날짜와 종료 날짜 초기화 함수
  const resetDates = () => {
    setStartDate("");
    setEndDate("");
    // markedDates 상태도 초기화해야 한다면 여기에 로직 추가
  };

  return (
    <View>
      <View style={styles.dateContainer}>
        {/* 시작 날짜 선택 텍스트 입력 필드 */}
        <TouchableOpacity
          onPress={() => setStartDatePickerVisibility(true)}
          style={styles.dateInput}
        >
          <TextInput
            style={styles.input}
            placeholder="시작 날짜"
            editable={false} // 사용자가 직접 텍스트를 입력하지 못하도록 설정
            value={startDate ? startDate : "시작 날짜"} // startDate 상태를 표시
          />
        </TouchableOpacity>

        {/* 종료 날짜 선택 텍스트 입력 필드 */}
        <TouchableOpacity
          onPress={() => setEndDatePickerVisibility(true)}
          style={styles.dateInput}
        >
          <TextInput
            style={styles.input}
            placeholder="종료 날짜"
            editable={false} // 사용자가 직접 텍스트를 입력하지 못하도록 설정
            value={endDate ? endDate : "종료 날짜"} // endDate 상태를 표시
          />
        </TouchableOpacity>

        {/* 날짜 초기화 버튼 */}
        <TouchableOpacity onPress={resetDates} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>날짜 초기화</Text>
        </TouchableOpacity>
      </View>

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

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  resetButton: {
    backgroundColor: "skyblue",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },

  dateContainer: {
    flexDirection: "row", // 자식 컴포넌트를 가로로 배치
    justifyContent: "space-between", // 자식 컴포넌트 사이의 공간을 균등하게 분배
    padding: 10, // 적당한 패딩으로 레이아웃을 조정
  },
  dateInput: {
    flex: 1, // 사용 가능한 공간을 두 입력 필드가 균등하게 나누어 가짐
    marginHorizontal: 5, // 입력 필드 사이의 수평 마진
  },
});

export default CalendarComp;
