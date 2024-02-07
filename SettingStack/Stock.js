// Stock.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, Alert, StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";

const Stock = () => {
  // 메뉴 데이터 초기화
  const MENU_DATA = {
    Menu: [
      { name: "Cheeseburger", isSoldOut: false },
      { name: "1955burger", isSoldOut: false },
      { name: "Big Mac", isSoldOut: false },
      { name: "Hamburger", isSoldOut: false },
      { name: "Supremeburger", isSoldOut: false },
      { name: "Pizza", isSoldOut: false },
      { name: "Potato Pizza", isSoldOut: false },
      { name: "sweet-Potato Pizza", isSoldOut: false },
      { name: "pepperoni Pizza", isSoldOut: false },
      { name: "Cheese Pizza", isSoldOut: false },
      { name: "Hawaiian Pizza", isSoldOut: false },
      { name: "Hot Pizza", isSoldOut: false },
      { name: "chicago Pizza", isSoldOut: false },
      { name: "Napolitana Pizza", isSoldOut: false },
      { name: "Pepsi", isSoldOut: false },
      { name: "Coca-Cola", isSoldOut: false },
      
      // ... 더 많은 데이터 추가 가능
    ],
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 로그인 관련
  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  
  const StockScreen = () => {
    const [menuData, setMenuData] = useState(MENU_DATA);

    // 진짜 판매중지할건지 Alert 띄워주는!
    const confirmSoldOut = (menuName, isSoldOut) => {
      Alert.alert(
        "확인",
        isSoldOut
        ? `'${menuName}'을(를) 다시 판매하시겠습니까?`
        : `'${menuName}'을(를) 판매 중지하시겠습니까?`,
        [
          {
            text: "취소",
            style: "cancel",
          },
          {
            text: "확인",
            onPress: () => {
              // 판매 중지 상태를 토글합니다
              const updatedMenuData = {
                ...menuData,
                Menu: menuData.Menu.map((item) =>
                  item.name === menuName
                    ? { ...item, isSoldOut: !isSoldOut }
                    : item
                ),
              };
              setMenuData(updatedMenuData);
            },
          },
        ],
        { cancelable: false }
      );
    };

    // 여기서 색 변환 다 되는거야!!
    const renderItem = ({ item }) => (
      <View
        style={[
          styles.menuItem,
          { borderColor: item.isSoldOut ? "red" : "skyblue" },
        ]}
      >
        <Text
          style={[
            styles.menuName,
            { color: item.isSoldOut ? "red" : "black" },
          ]}
        >
          {item.name}
        </Text>
        <Button
          title={item.isSoldOut ? "품절" : "판매중"}
          color={item.isSoldOut ? "red" : "blue"}
          onPress={() => confirmSoldOut(item.name, item.isSoldOut)}
        />
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        {isLoggedIn ? (
          <FlatList
            data={menuData.Menu}
            keyExtractor={(item) => item.name}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        ) : null}
        </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    listContainer: {
      flexGrow: 1, // FlatList가 화면 크기에 맞게 늘어나도록 수정
      backgroundColor: "white", // 흰색 배경 추가
      overflow: "hidden", // 자식 컴포넌트를 프레임 내에 유지
    },

    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15, // 여백을 더 늘렸습니다
      borderBottomWidth: 2, // 더 굵은 하단 경계선으로 변경했습니다
      borderRadius: 10, // 둥근 모서리를 추가했습니다
      marginVertical: 5, // 수직 마진을 추가하여 항목 간격을 더 조절했습니다
    },
    menuName: {
      fontSize: 18, // 폰트 크기를 더 크게 조절했습니다
      fontWeight: "bold", // 굵은 폰트로 변경했습니다
    },
  });

  return <StockScreen />;
};

export default Stock;