// CalendarView.js
import React from "react";
import { Calendar } from "react-native-calendars";
import { commonStyles } from "./style";

const CalendarView = ({ markedDates, handleCalenderDay }) => {
  return (
    <Calendar
      style={commonStyles.calendar}
      markedDates={markedDates}
      onDayPress={(day) => {
        handleCalenderDay(day);
      }}
    />
  );
};

export default CalendarView;