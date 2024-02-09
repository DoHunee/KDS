// CalendarComp.js
import React from "react";
import { Calendar } from "react-native-calendars";
import { commonStyles } from "./style";
import { LocaleConfig } from "react-native-calendars";
import { TouchableOpacity, Text , StyleSheet , View} from "react-native";

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
  handleCalenderDay,
  handleSelectToday,
}) => {
  return (
    <View>
    
      {/* <TouchableOpacity style={styles.TodayButton} onPress={handleSelectToday}>
        <Text style={styles.buttonText}>오늘</Text>
      </TouchableOpacity> */}

      <Calendar
        style={commonStyles.calendar}
        markedDates={markedDates}
        onDayPress={(day) => {
          handleCalenderDay(day);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
 
  TodayButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
 
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CalendarComp;
