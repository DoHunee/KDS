import { StyleSheet, View, TouchableOpacity , ScrollView } from "react-native";
import React, { useEffect, useState , useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import ChooseStatus from "../RightUpBar/ChooseStatus";
import { Ionicons } from "@expo/vector-icons";

const Complete = () => {
  // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); //로그인 전 후 접근제한을 위해
  const readyOrders = useSelector((state) => state.OrdersDistrubutionSlice.complete);
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 readyOrders를 업데이트
  const scrollViewRef = useRef(null); // 스크롤 위치를 조작할 때 사용됩니다.

  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    // 만약에 추가적인 동작이 필요하다면 여기에 추가
  };

  // readyOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(readyOrders);
  }, [readyOrders]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  // onSelectStatus 함수 정의
  const onSelectStatus = (ProcessCode) => {
    const filteredOrders = readyOrders.filter(
      (order) => order.ProcessCode.toLowerCase() === ProcessCode.toLowerCase()
    );
    console.log("Filtered Orders:", filteredOrders);
    setOrders(filteredOrders); // 필터링된 주문 목록을 로컬 state에 업데이트
    console.log(`Selected ProcessCode: ${ProcessCode}`);
  };

  // 스크롤 내리는 함수 정의
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // 스크롤 위로 이동하는 함수
  const scrollToTop = () => {
    scrollViewRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {orders.length === 0 && <EmptyOrders name="Complete" />}
          <ChooseStatus
            length={orders.length}
            onSelectStatus={onSelectStatus}
          />
          <SafeAreaView style={{ flex: 1 }}>
            <OrderList
              ref={scrollViewRef}
              buttons={[]}
              itemsData={orders}
              buttonPress={buttonPress}
            />
          </SafeAreaView>

          {/* up-down 버튼! */}
          <View style={styles.buttonContainer}>
            {/* 위로 이동하는 버튼 */}
            <TouchableOpacity
              style={styles.scrollToTopButton}
              onPress={scrollToTop}
            >
              <Ionicons name="arrow-up" size={24} color="white" />
            </TouchableOpacity>

            {/* 아래로 이동하는 버튼 */}
            <TouchableOpacity
              style={styles.scrollToBottomButton}
              onPress={scrollToBottom}
            >
              <Ionicons name="arrow-down" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA",
  },

  buttonContainer: {
    flexDirection: "column", // column으로 변경하여 수직으로 배치
    alignItems: "center", // 가운데 정렬
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  scrollToTopButton: {
    backgroundColor: "skyblue",
    padding: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollToBottomButton: {
    backgroundColor: "skyblue",
    padding: 7,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Complete;
