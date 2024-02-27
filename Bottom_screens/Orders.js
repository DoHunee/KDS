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


const Orders = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pendingOrders = useSelector((state) => state.OrdersDistrubutionSlice.pending);
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);



  // 수락,거절 ,즉시수령 버튼 눌렀을대 event
  const handleButtonPress = async (data) => {
    console.log("data 객체:", data); // data 객체의 내용을 콘솔에 출력
    
    if (data.action === "수락") {
      try {
        // API 요청
        const response = await fetch('http://211.54.171.41:3000/api/order/orderProcessUpdateforAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "OrderKey": data.OrderKey, // 주문 키 동적 할당
            "ProcessCode": "B"
          }),
        });
  
        const result = await response.json();
  
        // 응답 로그 출력
        console.log('API 응답:', result);
  
        // 응답 코드 확인
        if (result.res_cd === '00') {
          // 성공 응답 처리
          console.log('성공:',result.res_msg);
          dispatch(onConfirm({ STSeq: data.STSeq,res_cd: result.res_cd, }));
          // 필요한 추가 처리 작성
        } else {
          // 실패 응답 처리
          console.error('실패:', result.res_msg);
          // 필요한 에러 처리 작성
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        // 네트워크 에러 처리
      }
    } 
    
    // 거절인 경우!!
    else if (data.action === "거절") {
      setSelectedOrderId(data.STSeq);
      setIsModalVisible(true);
    } 

    // 즉시수령인 경우!
    else if (data.action === "즉시수령") {
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
            onPress: async () => {
              try {
                // API 요청
                const response = await fetch('http://211.54.171.41:3000/api/order/orderProcessUpdateforAdmin', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    "OrderKey": data.OrderKey, // 주문 키 동적 할당
                    "ProcessCode": "C"
                  }),
                });
          
                const result = await response.json();
          
                // 응답 로그 출력
                console.log('API 응답:', result);
          
                // 응답 코드 확인
                if (result.res_cd === '00') {
                  // 성공 응답 처리
                  console.log('성공:',result.res_msg);
                  dispatch(onImmediateReceipt({ STSeq: data.STSeq,res_cd: result.res_cd, }));
                  // 필요한 추가 처리 작성
                } else {
                  // 실패 응답 처리
                  console.error('실패:', result.res_msg);
                  // 필요한 에러 처리 작성
                }
              } catch (error) {
                console.error('API 요청 중 오류 발생:', error);
                // 네트워크 에러 처리
              }
              
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleDeclineReason = (reason) => {
    dispatch(onDecline({ STSeq: selectedOrderId, declineReason: reason }));  //여기에 OrderKey를 보내야곘네!
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