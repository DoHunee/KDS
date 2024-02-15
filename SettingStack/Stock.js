// Stock.js
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
import menuData from "../assets/data/SoldoutMenu.json"; // 메뉴 데이터 가져오기
// import { io } from "socket.io-client";

const Stock = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux store에서 로그인 상태 가져오기
  const [menuItems, setMenuItems] = useState([]); // 메뉴 아이템 상태 변수 및 설정 함수
  // const socket = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // 만약 로그인 상태가 아니라면
      // Alert.alert("Login required", "Login is required before use."); // 로그인이 필요하다는 알림 표시 (주석 처리됨)
    }
    // socket.current = io("http://10.1.1.13:8025/admin");
    // socket.current.emit("soldOutMenuList", { stCode: "0093" }); //서버에 연결 시도!!
    setMenuItems(menuData.SoldOutMenu); // 로그인시!메뉴 아이템 초기화
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행


  // 스위치 토글 핸들러
  const toggleSoldOut = (item, isSideMenu = false, parentMICode = null) => {
    const updatedMenuItems = menuItems.map((menuItem) => {
      if (isSideMenu && menuItem.MICode === parentMICode) {
        const updatedSideMenus = menuItem.SideMenus.map((sideMenu) =>
          sideMenu.SMCode === item.SMCode ? { ...sideMenu, SSoldOutYN: sideMenu.SSoldOutYN === "Y" ? "N" : "Y" } : sideMenu
        );
        return { ...menuItem, SideMenus: updatedSideMenus };
      } else if (!isSideMenu && menuItem.MICode === item.MICode) {
        return { ...menuItem, SoldOutYN: menuItem.SoldOutYN === "Y" ? "N" : "Y" };
      }
      return menuItem;
    });
    setMenuItems(updatedMenuItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.menuName}>{item.MISimpleName}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.SoldOutYN === "Y" ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={() => toggleSoldOut(item)}
        value={item.SoldOutYN === "Y"}
      />
      {item.SideMenus && item.SideMenus.length > 0 && (
        <View style={styles.sideMenuContainer}>
          {item.SideMenus.map((sideMenu) => (
            <View key={sideMenu.SMCode} style={styles.sideMenuItem}>
              <Text style={styles.sideMenuName}>{sideMenu.SMName}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={sideMenu.SSoldOutYN === "Y" ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={() => toggleSoldOut(sideMenu, true, item.MICode)}
                value={sideMenu.SSoldOutYN === "Y"}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn && (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.MICode}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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