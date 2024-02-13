import { StyleSheet, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderList from "../components/OrderList";
import { useDispatch, useSelector } from "react-redux";
import { onReady, onCancel } from "../store/storeSlice";
import EmptyOrders from "../components/EmptyOrders";
import Length from "../RightUpBar/Length";

const Current = ({ navigation }) => {
  const dispatch = useDispatch(); // Redux의 useDispatch를 사용하여 액션을 디스패치
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentOrders = useSelector((state) => state.OrdersDistrubutionSclie.current); // Redux에서 상태를 가져오기 위해 useSelector를 사용
  const [orders, setOrders] = useState([]); // 로컬 상태 orders를 사용하여 currentOrders를 업데이트

  // 주문 상태를 업데이트하는 함수
  const buttonPress = (data) => {
    if (data.action === "준비완료") {
      dispatch(onReady({ id: data.id }));
    } else if (data.action === "주문취소") {
      cancelOrder(data.id);
    }
  };

  // currentOrders가 업데이트될 때마다 orders를 업데이트
  useEffect(() => {
    setOrders(currentOrders);
  }, [orders, currentOrders]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
    }
  }, [isLoggedIn]);

  // 주문 취소 액션을 디스패치하고 사용자로부터 취소 이유를 선택받는 함수
  const cancelOrder = (orderId) => {
    Alert.alert(
      "취소 이유 선택", // 알림 창 제목
      "취소 사유를 선택해주세요:", // 알림 창 메시지
      [
        {
          text: "고객 요청에 따른 취소 처리", // 첫 번째 버튼 텍스트
          onPress: () =>
            dispatch(
              onCancel({
                id: orderId,
                cancellationReason: "고객 요청에 따른 취소 처리",
              })
            ),
        },
        {
          text: "가게 사정에 따른 취소", // 두 번째 버튼 텍스트
          onPress: () =>
            dispatch(
              onCancel({
                id: orderId,
                cancellationReason: "가게 사정에 따른 취소",
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFA8BA",
  },
});

export default Current;
