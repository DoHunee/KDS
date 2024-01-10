import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "../assets/data/orders.json";
import OrderCard from "./OrderCard";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 중간부 주문 리스트 보여주는 부분!!!
// "OrderList" 컴포넌트는 부모 컴포넌트에서 전달받은 itemsData, buttons, 그리고 buttonPress 프롭스를 기반으로 주문 목록을 표시합니다.
// useEffect 훅을 사용하여 itemsData가 변경될 때마다 listItems를 업데이트합니다.
// FlatList 컴포넌트를 사용하여 주문 목록을 효율적으로 표시합니다.
// renderItem 속성을 통해 OrderCard 컴포넌트를 렌더링하고, 해당 컴포넌트에 필요한 데이터를 전달합니다.
// keyExtractor 속성을 통해 각 항목의 고유 키를 지정합니다.
// "OrderCard" 컴포넌트에서 사용되는 함수를 전달하고, 해당 함수는 부모 컴포넌트의 buttonPress 함수를 호출합니다.

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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
