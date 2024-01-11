import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text, TouchableOpacity, RefreshControl, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import colors from "../refs/colors";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";
import { handlePending, onConfirm, onDecline, onSchedule, onImmediateReceipt } from "../store/store-slice";
import RefreshComponent from '../components/Refresh'; // 새로고침

// 상수 정의
const REASONS = ["재료소진", "품절", "딴거 드셈"];
const BUTTON_COLORS = {
  primary: colors.primary,
  secondary: colors.secondary,
};


const Orders = ({ navigation }) => {
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
      dispatch(onImmediateReceipt({ id: data.id })); // 새로 추가된 부분
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

  


 

  

  useEffect(() => {
    dispatch(handlePending());
  }, []);

  useEffect(() => {
    setOrders(pendingOrders);
  }, [pendingOrders]);

  //새로고침
  const handleRefresh = async () => {
    await dispatch(handlePending());
  };

  // 주문 모두승인
  const handleAcceptAllOrders = () => {
    orders.forEach((order) => {
      dispatch(onConfirm({ id: order.id }));
    });
    setOrders([]);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <RefreshComponent onRefresh={handleRefresh}>
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
                      backgroundColor: selectedReasons.includes(item) ? BUTTON_COLORS.secondary : BUTTON_COLORS.primary,
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
      </RefreshComponent>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    backgroundColor: BUTTON_COLORS.secondary,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  reasonButton: {
    backgroundColor: BUTTON_COLORS.primary,
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
});
export default Orders;