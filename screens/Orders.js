import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import colors from "../refs/colors";
import OrderList from "../components/OrderList";
import EmptyOrders from "../components/EmptyOrders";
import OrdersNumbers from "../components/OrdersNumbers";
import CalenderComp from "../components/CalenderComp";
import {
  handlePending,
  onConfirm,
  onDecline,
  onSchedule,
} from "../store/store-slice";


const Orders = ({ navigation }) => {
  const [showCalender, setShowCalender] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const dispatch = useDispatch();
  const pendingOrders = useSelector((state) => state.OrdersDistrubutionSclie.pending);
  const [orders, setOrders] = useState([]);

  const buttonPress = (data) => {
    if (data.action === "accept") {
      dispatch(onConfirm({ id: data.id }));
    } else if (data.action === "decline") {
      setScheduleId(data.id);
      setModalVisible(true);
    } else if (data.action === "schedule") {
      setShowCalender(true);
      setScheduleId(data.id);
    }
  };

  const handleCalenderDay = (date) => {
    setShowCalender(false);
    dispatch(onSchedule({ id: scheduleId, schedule: date?.dateString }));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDecline = () => {
    if (selectedReasons.length > 0) {
      dispatch(onDecline({ id: scheduleId, reasons: selectedReasons }));
      setModalVisible(false);
      setSelectedReasons([]); // Done 버튼을 누른 후에는 선택한 이유 초기화
    } else {
      alert("거절 사유를 선택해주세요.");
    }
  };

  // 선택한 이유를 추가하거나 제거하는 함수
  const toggleSelectedReason = (reason) => {
    const isSelected = selectedReasons.includes(reason);
    if (isSelected) {
      setSelectedReasons(selectedReasons.filter((selectedReason) => selectedReason !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  useEffect(() => {
    dispatch(handlePending());
  }, []);

  useEffect(() => {
    setOrders(pendingOrders);
  }, [orders, pendingOrders]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {orders.length === 0 && <EmptyOrders name="Pending" />}

        {showCalender && <CalenderComp onPress={handleCalenderDay} />}

        <OrdersNumbers length={orders.length} />

        <OrderList
          buttons={["Accept", "Decline", "Pick up immediately", "Schedule"]}
          itemsData={orders}
          buttonPress={buttonPress}
        />

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            <FlatList
              data={["재료소진", "품절", "딴거 드셈"]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.reasonButton,
                    {
                      backgroundColor: selectedReasons.includes(item)
                        ? colors.secondary
                        : colors.primary,
                    },
                  ]}
                  onPress={() => toggleSelectedReason(item)}
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
      </SafeAreaView>
    </View>
  );
};
export default Orders;

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
    backgroundColor: colors.secondary,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  reasonButton: {
    backgroundColor: colors.primary,
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
});