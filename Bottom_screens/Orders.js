import React, { useEffect, useState } from "react";
import {StyleSheet,SafeAreaView,Alert,} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../RightUpBar/OrdersNumbers";
import {handlePending,onConfirm,onDecline,onImmediateReceipt,} from "../store/storeSlice";


const Orders = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pendingOrders = useSelector(
    (state) => state.OrdersDistrubutionSclie.pending
  );
  const [orders, setOrders] = useState([]);

  // Accept,Decline,즉시수령 버튼 눌렀을대 event
  const handleButtonPress = (data) => {
    if (data.action === "수락") {
      dispatch(onConfirm({ id: data.id }));
    } else if (data.action === "거절") {
      declineOrder(data.id);
    } else if (data.action === "즉시수령") {
      // "즉시수령" 버튼을 눌렀을 때 알림 표시
      Alert.alert(
        "즉시 수령 확인",
        "정말로 즉시 수령하시겠습니까?",
        [
          {
            text: "아니오",
            style: "cancel",
          },
          {
            text: "예",
            onPress: () => {
              dispatch(onImmediateReceipt({ id: data.id }));
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  // 주문 거절 처리 함수
  const declineOrder = (orderId) => {
    Alert.alert(
      "거절 이유 선택", // 알림 창 제목
      "거절 사유를 선택해주세요:", // 알림 창 메시지
      [
        {
          text: "재료소진", // 첫 번째 버튼 텍스트
          onPress: () =>
            dispatch(
              onDecline({
                id: orderId,
                declineReason: "재료소진",
              })
            ),
        },
        {
          text: "품절", // 두 번째 버튼 텍스트
          onPress: () =>
            dispatch(
              onDecline({
                id: orderId,
                declineReason: "품절",
              })
            ),
        },
        {
          text: "취소", // 취소 버튼 텍스트
          style: "cancel", // 취소 버튼 스타일
        },
      ],
      { cancelable: false } // 알림 창이 뒤로 버튼으로 닫히지 않도록 설정
    );
  };

  // 주문 모두승인
  const handleAcceptAllOrders = () => {
    orders.forEach((order) => {
      dispatch(onConfirm({ id: order.id }));
    });
    setOrders([]);
  };

  //isLoggined = false일때 로그인하세요!!
  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(handlePending());
  }, []);

  useEffect(() => {
    setOrders(pendingOrders);
  }, [pendingOrders]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <>
          {orders.length === 0 && <EmptyOrders name="Pending" />}
          <OrdersNumbers
            length={orders.length}
            onAcceptAll={handleAcceptAllOrders}
          />
          <OrderList
            buttons={["수락", "거절", "즉시수령"]}
            itemsData={orders}
            buttonPress={handleButtonPress}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#694fad",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  reasonButton: {
    backgroundColor: "#AFA8BA",
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
  },

  logoutButton: {
    backgroundColor: "#61dafb",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 30,
  },
});
export default Orders;
