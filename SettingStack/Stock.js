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

const Stock = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux 스토어에서 로그인 상태 가져오기
  const { stCode } = useSelector((state) => state.auth);
  const [menuItems, setMenuItems] = useState([]);

  // 로그인 상태 접근 , //API로 데이터 가져오기!!
  useEffect(() => {
    if (isLoggedIn) {
      fetchMenuData(); //API로 데이터 가져오기!!
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행

  // 메뉴 데이터를 API로 서버로부터 가져오는 함수
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
  const toggleSoldOut = async (
    item,
    isSideMenu = false,
    parentMICode = null
  ) => {
    const updatedMenuItems = await Promise.all(
      menuItems.map(async (menuItem) => {
        // 사이드 메뉴! => (세트 안의 메뉴!)
        if (isSideMenu && menuItem.MICode === parentMICode) {
          const updatedSideMenus = await Promise.all(
            menuItem.SideMenus.map(async (sideMenu) => {
              if (sideMenu.SMCode === item.SMCode) {
                const newStatus = sideMenu.SSoldOutYN === "Y" ? "N" : "Y";
                const requestData = {
                  STCode: stCode,
                  MICode: menuItem.MICode,
                  SMCode: sideMenu.SMCode,
                  SoldOutYN: newStatus,
                };
                console.log("API 요청 데이터:", requestData); // API 요청 데이터 로깅
                try {
                  const response = await axios.post(
                    "http://211.54.171.41:3000/api/store/updateStoreItemSoldOutforAdmin",
                    requestData,
                    {
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  // API 호출 성공 로직...
                  console.log(response);
                  return { ...sideMenu, SSoldOutYN: newStatus };
                } catch (error) {
                  console.error("메뉴 데이터 요청 중 오류 발생:", error);
                  // 에러 처리 로직...
                  return sideMenu; // 에러가 발생한 경우 원래 상태를 유지
                }
              }
              return sideMenu;
            })
          );
          return { ...menuItem, SideMenus: updatedSideMenus };
        } 
        // 메인메뉴
        else if (!isSideMenu && menuItem.MICode === item.MICode) {
          const newStatus = menuItem.SoldOutYN === "Y" ? "N" : "Y";
          const requestData = {
            MICode: menuItem.MICode,
            STCode: stCode,
            SoldOutYN: newStatus,
          };
          console.log("API 요청 데이터:", requestData); // API 요청 데이터 로깅
          // 메인 메뉴 아이템의 품절 상태를 업데이트하는 API 호출 로직 추가...
          try {
            const response = await axios.post(
              "http://211.54.171.41:3000/api/store/updateStoreItemSoldOut",
              requestData,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            // API 호출 성공 로직...
            console.log("메인메뉴 API 응답:", response.data); // API 응답 로깅
          } catch (error) {
            console.error("메인 메뉴 품절 상태 업데이트 중 오류 발생:", error);
            // 에러 처리 로직...
          }

          return { ...menuItem, SoldOutYN: newStatus };
        }
        return menuItem;
      })
    );

    setMenuItems(updatedMenuItems); // 모든 비동기 작업이 완료된 후에 상태 업데이트
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
