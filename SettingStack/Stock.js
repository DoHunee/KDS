// Stock.js
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Switch,
} from "react-native";
// import menuData from "../assets/data/SoldoutMenu.json"; // 메뉴 데이터 가져오기
import axios from "axios";
import { io } from "socket.io-client";

const Stock = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux 스토어에서 로그인 상태 가져오기
  const { stCode } = useSelector((state) => state.auth);
  const [menuItems, setMenuItems] = useState([]);
  const socket = useRef(null);

  // 로그인 상태 접근
  useEffect(() => {
    if (isLoggedIn) {
      fetchMenuData(); //API로 데이터 가져오기!!
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행

  useEffect(() => {
    // 컴포넌트 마운트 시 소켓 연결 생성
    socket.current = io("http://211.54.171.41:8025/admin");

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);
  
  // 메뉴 데이터를 서버로부터 가져오는 함수
  const fetchMenuData = async () => {
    if (!isLoggedIn) return;
    try {
      const response = await axios.post(
        "http://211.54.171.41:3000/api/store/findAllItems",
        { STCode: stCode },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // 여기서 data 구조를 확인하고, 필요한 부분만 추출하여 상태에 저장합니다.
      // console.log(response);
      setMenuItems(response.data); // 예를 들어 response.data.Menu 등으로 접근해야 할 수도 있습니다.
    } catch (error) {
      console.error("메뉴 데이터 요청 중 오류 발생:", error);
    }
  };

  // 스위치 토글 핸들러
  const toggleSoldOut = (item, isSideMenu = false, parentMICode = null) => {
    const updatedMenuItems = menuItems.map((menuItem) => {
      if (isSideMenu && menuItem.MICode === parentMICode) {
        // 부메뉴 아이템 처리
        const updatedSideMenus = menuItem.SideMenus.map((sideMenu) => {
          if (sideMenu.SMCode === item.SMCode) {
            const newStatus = sideMenu.SSoldOutYN === "Y" ? "N" : "Y";
            // 서브 메뉴 품절 처리 소켓 이벤트 발송
            socket.current.emit("sideMenuSoldOut", {
              SMCode: sideMenu.SMCode,
              SSoldOutYN: newStatus,
            });
            return { ...sideMenu, SSoldOutYN: newStatus };
          }
          return sideMenu;
        });
        return { ...menuItem, SideMenus: updatedSideMenus };
      } else if (!isSideMenu && menuItem.MICode === item.MICode) {
        const newStatus = menuItem.SoldOutYN === "Y" ? "N" : "Y";
        // 메인 메뉴 품절 처리 소켓 이벤트 발송
        socket.current.emit("mainMenuSoldOut", {
          MICode: menuItem.MICode,
          SoldOutYN: newStatus,
        });
        return { ...menuItem, SoldOutYN: newStatus };
      }
      return menuItem;
    });
    setMenuItems(updatedMenuItems); // 상태 업데이트
  };

  // 렌더링 하는 부분!
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
