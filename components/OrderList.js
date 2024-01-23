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
    setListItems(itemsData);
  }, [listItems, itemsData]);

  const handleOnPress = (data) => {
    buttonPress(data);
  };

  return (
    <View>
      <FlatList
        data={itemsData}
        // renderItem={OrderCard}
        renderItem={({ item }) => (
          <OrderCard
            name={item.name}
            number={item.number}
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
        keyExtractor={(item) => item.id}  //고유키 추출 
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
