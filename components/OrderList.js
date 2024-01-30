import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ itemsData, buttons, buttonPress }) => {
  
  const [listItems, setListItems] = useState([]);
  
  useEffect(() => {
    // itemsData를 날짜 기준으로 정렬
    const sortedItems = itemsData.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // 날짜가 같으면 id를 비교하여 정렬
      if (dateA.getTime() === dateB.getTime()) {
        return a.id - b.id;
      }

      // 날짜가 다르면 날짜를 기준으로 정렬
      return dateA.getTime() - dateB.getTime();
    });

    setListItems(sortedItems);
  }, [itemsData]);

  const handleOnPress = (data) => {
    buttonPress(data);
  };

  return (
    <View>
      <FlatList
        data={listItems} // 수정된 listItems를 사용
        renderItem={({ item }) => (
          <OrderCard
            name={item.name}
            hp={item.hp}
            orderNumber={item.orderNumber}
            orders={item.orders}
            confirmTime={item.confirmTime}
            status={item.status}
            id={item.id}
            timeRequire={item.timeRequire}
            buttons={buttons}
            onPress={handleOnPress}
            readyTime={item.readyTime}
            scheduleFor={item.scheduleFor}
          />
        )}
        keyExtractor={(item) => item.id.toString()} // 고유한 키 추출  //고유키 추출 
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
