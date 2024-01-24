import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ordersData from "../assets/data/orders.json";

const CalendarScreen = () => {

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getSumPriceForSelectedDate = () => {
    const selectedOrder = ordersData.find(order => order.date === selectedDate);  //selectedOrder정의
    return selectedOrder ? selectedOrder.sumPrice : null;
  };


  return (
    <View>
      {/* 선택한 날짜를 나타내는 부분 */}
      <Text>선택한 날짜: {selectedDate}</Text>

      {/* 달력이나 DatePicker와 같은 컴포넌트를 사용하여 날짜를 선택하는 부분 */}
      {/* 이 부분은 실제로 사용되는 DatePicker 컴포넌트로 대체되어야 합니다 */}
      <TouchableOpacity onPress={() => handleDateSelect("2024-01-02")}>
        <Text>2024년 1월 2일 선택</Text>
      </TouchableOpacity>

      {/* 선택한 날짜에 해당하는 "sumPrice"를 표시하는 부분 */}
      <Text>선택한 날짜의 합계 가격: {getSumPriceForSelectedDate()}</Text>
    </View>
  );
};
export default CalendarScreen;