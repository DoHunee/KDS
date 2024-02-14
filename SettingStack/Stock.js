import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Switch,
  Modal,
  TouchableOpacity,
} from "react-native";
import menuData from "../assets/data/menu.json"; // 메뉴 데이터 가져오기

const Stock = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Redux store에서 로그인 상태 가져오기

  useEffect(() => {
    if (!isLoggedIn) {
      // 만약 로그인 상태가 아니라면
      // Alert.alert("Login required", "Login is required before use."); // 로그인이 필요하다는 알림 표시 (주석 처리됨)
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행

  const [menuItems, setMenuItems] = useState([]); // 메뉴 아이템 상태 변수 및 설정 함수
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부 상태 변수 및 설정 함수
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // 선택된 메뉴 아이템 상태 변수 및 설정 함수

  useEffect(() => {
    setMenuItems(menuData.Menu); // 메뉴 아이템 초기화
  }, []);

  const setSoldOut = (menuItem, isSoldOut) => {
    // 품절 여부 설정 함수
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

  const handleToggleSwitch = (menuItem) => {
    // 스위치 토글 핸들러
    setSelectedMenuItem(menuItem);
    setIsModalVisible(true); // 모달 표시
  };

  const confirmSoldOut = () => {
    // 품절 여부 확인 핸들러
    setIsModalVisible(false);
    const isSoldOut = selectedMenuItem.data.SoldOutYN === "Y" ? false : true;
    setSoldOut(selectedMenuItem, isSoldOut); // 품절 여부 업데이트
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
            onValueChange={() =>
              handleToggleSwitch({ FCName: item.FCName, data: menu })
            }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {selectedMenuItem && selectedMenuItem.data.SoldOutYN === "Y"
                ? "다시 판매하시겠습니까?" // 품절 상태인 경우
                : "정말로 품절 처리하시겠습니까?"} 
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmSoldOut}
              >
                <Text style={styles.textStyle}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f0f8ff", // 화려한 연한 파란색 배경
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: "skyblue", // 화려한 파란색 테두리
    borderWidth: 2,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "#333333",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "45%",
    backgroundColor: "#007bff", // 화려한 파란색 배경
  },
  buttonClose: {
    backgroundColor: "skyblue", // 화려한 빨간색 배경
  },
  buttonConfirm: {
    backgroundColor: "skyblue", // 화려한 초록색 배경
  },
  textStyle: {
    color: "black", // 흰색 텍스트
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Stock;