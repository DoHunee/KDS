import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../RightUpBar/OrdersNumbers";
import { handlePending, onConfirm, onDecline, onSales, onImmediateReceipt } from "../store/storeSlice";

// 상수 정의
const REASONS = ["재료소진", "품절", "딴거 드셈"];

const Orders = ({ navigation }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [scheduleId, setScheduleId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const dispatch = useDispatch();
  const pendingOrders = useSelector((state) => state.OrdersDistrubutionSclie.pending);
  const [orders, setOrders] = useState([]);

  // Accept,Decline,즉시수령 버튼 눌렀을대 event
  const handleButtonPress = (data) => {
    if (data.action === "accept") {
      dispatch(onConfirm({ id: data.id }));
    } else if (data.action === "decline") {
      setScheduleId(data.id);
      setModalVisible(true);
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

   //경고 알람!
   const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
    Alert.alert(
      title,
      message,
      buttons,
      { cancelable: false }
    );
  };

  // 거절 사유 하나만 선택할 수 있게 설정
  const toggleSelectedReason = (reason) => {
    // 선택된 이유가 이미 배열에 있는지 확인합니다.
    const isSelected = selectedReasons.includes(reason);
  
    // 만약 선택된 이유가 이미 있다면, 해당 이유를 배열에서 제거합니다.
    if (isSelected) {
      setSelectedReasons([]);
      // console.log("거절 이유 제거: " + reason);
    } else {
      // 선택된 이유가 없다면, 배열에 해당 이유만 추가하고 기존 선택된 이유는 모두 제거합니다.
      setSelectedReasons([reason]);
      // console.log("거절 이유 추가: " + reason);
    }
  };
  

    //모달창 => 거절사유 띄울때!!
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // decline 눌렀을때 => 거절 사유 선택!!
  const handleDecline = () => {
    if (selectedReasons.length > 0) {
      dispatch(onDecline({ id: scheduleId, reasons: selectedReasons }));
      setModalVisible(false);
      setSelectedReasons([]);
    } else {
      showAlert("거절 사유를 선택해주세요.");
    }
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
      Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
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
        <OrdersNumbers length={orders.length} onAcceptAll={handleAcceptAllOrders} />
        <OrderList
          buttons={["Accept", "Decline", "즉시수령" ]}
          itemsData={orders}
          buttonPress={handleButtonPress}
        />
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <FlatList
              data={REASONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.reasonButton,
                    {
                      backgroundColor: selectedReasons.includes(item) ? "#694fad" : "#AFA8BA",
                    },
                  ]}
                  onPress={() => toggleSelectedReason(item)}  // 거절사유 선택하는 부분!!!
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={handleDecline} style={styles.button}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>  
        </>
      ) : null}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA" 
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