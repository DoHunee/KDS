import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderList from "../components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import { onReady, onCancel } from "../store/storeSlice";
import EmptyOrders from "../components/EmptyOrders";
import Length from "../RightUpBar/Length";

const Current = ({ navigation }) => {
  const dispatch = useDispatch(); // Redux의 useDispatch를 사용하여 액션을 디스패치
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentOrders = useSelector(
    (state) => state.OrdersDistrubutionSlice.current
  ); // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 currentOrders를 업데이트
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


  // currentOrders가 업데이트될 때마다 orders를 업데이트
  // 여기 24.02.19에 수정됐다!
  useEffect(() => {
    setOrders(currentOrders);
  }, [currentOrders]); // 'currentOrders'의 변화에만 반응하도록 설정

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  const buttonPress = async (data) => {
    if (data.action === "준비완료") {
      try {
        // API 요청
        const response = await fetch('http://211.54.171.41:3000/api/order/orderProcessUpdateforAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "OrderKey": data.OrderKey, // 주문 키 동적 할당
            "ProcessCode": "D"
          }),
        });
  
        const result = await response.json();
  
        // 응답 로그 출력
        console.log('API 응답:', result);
  
        // 응답 코드 확인
        if (result.res_cd === '00') {
          // 성공 응답 처리
          console.log('성공:',result.res_msg);
          dispatch(onReady({ STSeq: data.STSeq,res_cd: result.res_cd, }));
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
    else if (data.action === "주문취소") {
      try {
        // API 요청
        const response = await fetch('http://211.54.171.41:3000/api/order/orderProcessUpdateforAdmin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            OrderKey: data.OrderKey, // 주문 키 동적 할당
            ProcessCode: "V", // 취소는 무조건 "V"
            CancleCode: "A", // 조건에 따라 결정된 CancleCode 사용
          }),
        });
  
        const result = await response.json();
  
        // 응답 로그 출력
        console.log('API 응답:', result);
  
        // 응답 코드 확인
        if (result.res_cd === '00') {
          // 성공 응답 처리
          console.log('성공:',result.res_msg);
          dispatch(onReady({ STSeq: data.STSeq,res_cd: result.res_cd, }));
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
      setSelectedOrderId(data.STSeq);
      // setIsModalVisible(true);
    }
  };

   // 주문 취소 사유를 소켓으로 전달!
  const handleCancelReason = (reason) => {
    dispatch(onCancel({ STSeq: selectedOrderId, cancellationReason: reason }));
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {/* 주문이 없는 경우 EmptyOrders 컴포넌트를 표시 */}
          {orders.length === 0 && <EmptyOrders name="Current" />}
          {/* OrdersNumbers 컴포넌트를 사용하여 주문 개수를 표시 */}
          <Length length={orders.length} />
          {/* 주문 목록을 표시하는 OrderList 컴포넌트 */}
          <SafeAreaView>
            <OrderList
              buttons={["준비완료", "주문취소"]}
              itemsData={orders}
              buttonPress={buttonPress}
            />
          </SafeAreaView>
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
            <Text style={styles.modalText}>주문 취소 사유를 선택해주세요</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleCancelReason("고객 요청에 따른 취소")}>
              <Text style={styles.textStyle}>고객 요청에 따른 취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleCancelReason("가게 사정에 따른 취소")}>
              <Text style={styles.textStyle}>가게 사정에 따른 취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.textStyle}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
      height: 2
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

export default Current;