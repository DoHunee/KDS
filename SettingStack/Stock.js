import React, { useEffect, useState, useRef } from "react";
import {  useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Switch,
} from "react-native";
import menuData from "../assets/data/menu.json"; // 메뉴 데이터 가져오기
import { io } from "socket.io-client";

const Stock = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux store에서 로그인 상태 가져오기
  const [menuItems, setMenuItems] = useState([]); // 메뉴 아이템 상태 변수 및 설정 함수
  const socket = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // 만약 로그인 상태가 아니라면
      // Alert.alert("Login required", "Login is required before use."); // 로그인이 필요하다는 알림 표시 (주석 처리됨)
    }
    socket.current = io("http://10.1.1.13:8025/admin");
    socket.current.emit("soldOutMenuList", { stCode: "0093" }); //서버에 연결 시도!!
    setMenuItems(menuData.Menu); // 로그인시!메뉴 아이템 초기화
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행



  // 품절 여부 설정 함수
  const setSoldOut = (menuItem, isSoldOut) => {
    const updatedMenuItems = menuItems.map((section) => {
      if (section.FCName === menuItem.FCName) {
        const updatedSection = {
          ...section,
          data: section.data.map((menu) => {
            if (menu.MICode === menuItem.data.MICode) {
              return {
                ...menu,
                SoldOutYN: isSoldOut ? "Y" : "N", // 품절 여부 업데이트
              };
            }
            return menu;
          }),
        };
        return updatedSection;
      }
      return section;
    });
    setMenuItems(updatedMenuItems); // 메뉴 아이템 업데이트
  };

  // 스위치 토글 핸들러
  const handleToggleSwitch = (menuItem) => {
    const isSoldOut = menuItem.data.SoldOutYN === "Y" ? false : true;
    setSoldOut(menuItem, isSoldOut); // 품절 여부 업데이트
  };

  const renderItem = ({ item }) => (
    // FlatList 아이템 렌더링 함수
    <View style={styles.sectionContainer}>
      <Text style={styles.categoryName}>{item.FCName}</Text>
      {item.data.map((menu) => (
        <View key={menu.MICode} style={styles.menuItem}>
          <Text style={styles.menuName}>{menu.MISimpleName}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={menu.SoldOutYN === "Y" ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => handleToggleSwitch({ FCName: item.FCName, data: menu })}
            value={menu.SoldOutYN === "Y"}
          />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        // 로그인 상태에 따른 화면 출력
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.FCName}
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
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#87CEEB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    backgroundColor: "#007bff", // 화려한 파란색 배경
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default Stock;