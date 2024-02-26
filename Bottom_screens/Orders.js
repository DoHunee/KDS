import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Modal ,Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../RightUpBar/OrdersNumbers";
import {
  handlePending,
  onConfirm,
  onDecline,
  onImmediateReceipt,
} from "../store/storeSlice";
import { io } from "socket.io-client";


const Orders = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pendingOrders = useSelector((state) => state.OrdersDistrubutionSlice.pending);
  const [orders, setOrders] = useState([]);
  const socket = useRef(null);
  const { stCode } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // 소켓 여러번 접근하는 문제를 해결하기 위해!
  useEffect(() => {
    // 컴포넌트 마운트 시 소켓 연결 생성 및 자동 재접속 비활성화
    socket.current = io("http://211.54.171.41:8025/admin", {
      reconnection: false, // 자동 재접속 비활성화
    });
  
    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // 수락,거절 ,즉시수령 버튼 눌렀을대 event
  const handleButtonPress = (data) => {
    if (data.action === "수락") {
      dispatch(onConfirm({ STSeq: data.STSeq }));
      // 주문 수락 이벤트 처리
      socket.current.emit("acceptOrder", {
        stCode: stCode,
        STSeq: data.STSeq,
        message: "고객님의 주문이 접수되었습니다!",
      });
    } else if (data.action === "거절") {
      setSelectedOrderId(data.STSeq);
      setIsModalVisible(true);
    } else if (data.action === "즉시수령") {
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
              dispatch(onImmediateReceipt({ STSeq: data.STSeq }));
              socket.current.emit("test", {
                stCode: stCode,
                STSeq: data.STSeq,
                message: "주문하신 제품을 즉시 수령해주세요",
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  // 주문 거절 사유를 소켓으로 전달!
  const handleDeclineReason = (reason) => {
    dispatch(onDecline({ STSeq: selectedOrderId, declineReason: reason }));
    socket.current.emit("declineOrder", {
      stCode: stCode,
      STSeq: selectedOrderId,
      declineReason: reason,
    });
    setIsModalVisible(false);
  };

  const handleAcceptAllOrders = () => {
    orders.forEach((order) => {
      dispatch(onConfirm({ STSeq: order.STSeq }));
    });
    setOrders([]);
  };

  // 로그인 안했는데 다른 탭 접근
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  // 소켓으로 가져온 주문목록 StoreSlice.js에서 지정된 handlePending
  useEffect(() => {
    dispatch(handlePending());
  }, []);

  //pendingOrders 상태에 변경사항이 있을 때마다 orders 상태가 업데이트되고, 이는 OrderList 컴포넌트에 반영되어 UI가 업데이트되어야 합니다.
  useEffect(() => {
    // pendingOrders가 존재하고 배열이면 orders 상태를 업데이트합니다.
    if (pendingOrders && Array.isArray(pendingOrders)) {
      setOrders(pendingOrders); // pendingOrders를 orders로 업데이트합니다.
      console.log("확인해라!!!!!!",pendingOrders)
    }
  }, [pendingOrders]);


  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <>
          {orders.length === 0 && <EmptyOrders name="Pending" />}
          <OrdersNumbers length={orders.length} onAcceptAll={handleAcceptAllOrders} />
          <OrderList buttons={["수락", "거절", "즉시수령"]} itemsData={orders} buttonPress={handleButtonPress} />
        </>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>주문 거절 사유를 선택해주세요</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleDeclineReason("재료소진")}>
              <Text style={styles.textStyle}>재료소진</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDeclineReason("품절")}>
              <Text style={styles.textStyle}>품절</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.textStyle}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#694fad",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Orders;