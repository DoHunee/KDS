// ModalComp.js
import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onCancelCompleteOrder } from "../store/storeSlice";

const ModalComp = ({
  modalVisible,
  closeModal,
  scrollViewRef,
  scrollToTop,
  scrollToBottom,
  searchOrder,
  setSearchOrder,
  handleSearchOrder,
  readyButtonTranslucent,
  cancelButtonTranslucent,
  handleOrderStatusButtonClick,
  selectedOrders,
  selectedCancelOrders,
}) => {
  const dispatch = useDispatch();
  const [paymentDetails, setPaymentDetails] = useState(null); // 결제 내역을 저장할 상태
  const [showPaymentDetails, setShowPaymentDetails] = useState({}); //상세결제내역 보였다 안보였다 하게!
  const [isPaymentDetailsModalVisible, setIsPaymentDetailsModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      // 모달이 보이는 상태일 때만 경고창을 띄웁니다.
      Alert.alert(
        "안내", // 경고창의 제목
        "원활한 조회를 위해 주문번호 없이 검색 버튼을 2~3번 누르고 시작해주세요 :)", // 경고창의 내용
        [{ text: "확인", onPress: () => console.log("확인 버튼 클릭") }], // 버튼 배열
        { cancelable: false } // 밖을 눌러서 닫을 수 없게 설정
      );
    }
  }, [modalVisible]); // modalVisible이 변경될 때마다 useEffect가 실행됩니다.

  useEffect(() => {
    handleSearchOrder(); // searchOrder가 변경될 때마다 주문을 검색하고 업데이트합니다.
  }, [searchOrder]); // searchOrder가 변경될 때마다 useEffect가 실행됩니다.

  useEffect(() => {
    if (paymentDetails) {
      setIsPaymentDetailsModalVisible(true);
    }
  }, [paymentDetails]); // paymentDetails가 변경될 때마다 실행됩니다. => 모달창 바로바로 뜨게!

  // API로 결제내역 가져오는 코드!
  const fetchPaymentDetails = async (orderKey) => {
    try {
      const response = await axios.post(
        "http://211.54.171.41:3000/api/order/orderPaymentListbyOrderKey",
        { OrderKey: orderKey },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("결제 내역 응답:", response.data); // 응답 로깅
      setPaymentDetails(response.data); // 응답 데이터를 상태에 저장
      setIsPaymentDetailsModalVisible(true); // 모달을 표시하기 위해 상태 업데이트
    } catch (error) {
      console.error("결제 내역 조회 중 오류 발생:", error);
    }
  };

  // API 결제취소 함수 정의
  const handleCancelPayment = async (orderKey) => {
    try {
      // selectedOrders에서 주문 상태 확인
      const selectedOrder = selectedOrders.find(
        (order) => order.OrderKey === orderKey
      );

      if (
        selectedOrder &&
        (selectedOrder.ProcessCode === "cancel" ||
          selectedOrder.ProcessCode === "decline")
      ) {
        // 이미 "cancel" 상태인 경우 사용자에게 알림 표시
        Alert.alert("알림", "이미 결제취소된 주문입니다");
        return; // 함수 종료
      }

      // 기존의 API 요청 로직 유지
      const response = await fetch(
        "http://211.54.171.41:3000/api/order/orderProcessUpdateforAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            OrderKey: orderKey,
            ProcessCode: "V", // 취소는 무조건 V
            cancleCode: "C", // 결제 후 취소하는 거니까 C로 보내!
          }),
        }
      );

      const result = await response.json();

      // 응답 코드 확인 및 추가 로직 처리
      if (result.res_cd === "00") {
        console.log("결제 취소 성공:", result.res_msg);
        // 성공적으로 처리되었음을 사용자에게 알림
        Alert.alert("결제 취소 성공", "결제가 성공적으로 취소되었습니다.");
        // console.log("디스패치에 쓰이는 값 !!!",result.res_cd); //  48 00 고객 요청에 따른 취소
        dispatch(
          onCancelCompleteOrder({
            STSeq: selectedOrder.STSeq,
            res_cd: result.res_cd,
            cancellationReason: "주문처리완료 후 주문취소",
          })
        );
      } else {
        console.error("결제 취소 실패:", result.res_msg);
        Alert.alert("결제 취소 실패", `사유: ${result.res_msg}`);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      Alert.alert(
        "오류 발생",
        "네트워크 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  };

  // 결제 내역 섹션을 렌더링하는 함수
  const renderPaymentDetailsModal = (orderKey) => {
    
    if (!paymentDetails || !showPaymentDetails[orderKey]) return null;

    // orderKey를 사용하여 현재 주문 객체 찾기
    const currentOrder =
      selectedOrders.find((order) => order.OrderKey === orderKey) ||
      selectedCancelOrders.find((order) => order.OrderKey === orderKey);

    if (!currentOrder) return null; // 주문을 찾을 수 없는 경우 null 반환

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPaymentDetailsModalVisible}
        onRequestClose={() => setIsPaymentDetailsModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>결제 상세 정보</Text>
            {paymentDetails.map((detail, index) => (
              <View key={index} style={styles.paymentDetailItem}>
                {/* 결제 상세 정보 항목 렌더링 */}
                <Text>금액: {detail.Amount}원</Text>
                <Text>카드명: {detail.CardName}</Text>
                <Text style={styles.paymentDetailText}>
                  카드번호: {detail.CardNo}
                </Text>
                <Text style={styles.paymentDetailText}>
                  승인번호: {detail.AppNo}
                </Text>
                <Text style={styles.paymentDetailText}>
                  결제시간: {detail.AppTime}
                </Text>
                {/* 필요한 정보 추가 */}
              </View>
            ))}
            {/* 주문 상태가 "decline" 또는 "cancel"이 아닐 경우에만 결제 취소 버튼 렌더링 */}
            {!(
              currentOrder.ProcessCode === "decline" ||
              currentOrder.ProcessCode === "cancel"
            ) && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelPayment(currentOrder.OrderKey)}
              >
                <Text style={styles.cancelButtonText}>결제취소</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setIsPaymentDetailsModalVisible(false)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    //  모달창을 나타내는 부분
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.modalContainer}
        contentContainerStyle={styles.modalContentContainer}
      >
        {/* 검색 상자 및 검색 버튼 추가 */}
        <View style={styles.searchContainerModal}>
          <TextInput
            style={styles.searchInputModal}
            placeholder="주문 번호를 입력하세요."
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // 투명한 검정 색상으로 설정
            value={searchOrder}
            onChangeText={(text) => setSearchOrder(text)}
          />
          <TouchableOpacity
            style={styles.searchButtonModal}
            onPress={() => handleSearchOrder()}
          >
            <Text style={styles.searchButtonText}>검색</Text>
          </TouchableOpacity>
        </View>

        {/* 각 주문목록을 볼 수 있는 버튼 생성 */}
        <View style={styles.switchButtonContainerModal}>
          <TouchableOpacity
            onPress={() => handleOrderStatusButtonClick("ready")}
            style={[
              styles.switchButton1Text,
              readyButtonTranslucent && { opacity: 0.5 }, // 버튼이 투명할 때의 스타일
            ]}
          >
            <Text style={styles.switchButton1Text}>즉시수령,완료</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOrderStatusButtonClick("cancel")}
            style={[
              styles.switchButton2Text,
              cancelButtonTranslucent && { opacity: 0.5 }, // 버튼이 투명할 때의 스타일
            ]}
          >
            <Text style={styles.switchButton2Text}>취소목록</Text>
          </TouchableOpacity>
        </View>

        {/* 모달창안에 주문내역을 나타내는 부분!! */}
        {selectedOrders.concat(selectedCancelOrders).map((order) => (
          <View
            key={order.STSeq}
            //  주문내역 배경을 설정하는 부분!!
            style={[
              styles.orderContainer,
              {
                backgroundColor:
                  order.ProcessCode === "cancel"
                    ? "red"
                    : order.ProcessCode === "ready" ||
                      order.ProcessCode === "fast_ready"
                    ? "green"
                    : "lightgreen",
              },
            ]}
          >
            <View style={styles.orderBackground}>
              <Text style={styles.orderText}>
                이름: {order.UserName} [{order.UserHp}]
              </Text>
              <Text style={styles.orderText}>OrderKey : {order.OrderKey}</Text>

              <View style={styles.lineStyle}></View>
              <Text style={styles.orderText}>주문번호 : {order.STSeq} </Text>
              <Text style={styles.orderText}>판매날짜 : {order.SDDate} </Text>
              <Text style={styles.orderText}>판매시간 : {order.SDTime} </Text>
              <Text style={styles.orderText}>
                주문상태 : {order.ProcessCode}{" "}
              </Text>
              {/* 주문 상태가 "cancel"일 때만 취소 이유를 표시하는 부분 */}
              {order.ProcessCode === "cancel" && (
                <>
                  <Text style={styles.orderText}>
                    취소사유: {order.cancellationReason}
                  </Text>
                  <View style={styles.lineStyle}></View>
                </>
              )}
              <Text style={styles.orderText}>
                [주문 목록]:{"\n\n"}
                {order.Details.map((item, index) => (
                  <View
                    key={item.MISimpleName}
                    style={styles.menuItemContainer}
                  >
                    <Text style={styles.menuItemName}>
                      메뉴명: {item.MISimpleName}
                    </Text>
                    <Text style={styles.menuItemDetail}>
                      수량: {item.MICnt} | 금액: {item.TotPrice} 원
                    </Text>
                  </View>
                ))}
              </Text>

              <View style={styles.lineStyle}></View>
              <Text style={styles.orderText}>
                총 가격 :{" "}
                {order.Details.reduce((sum, item) => sum + item.TotPrice, 0)} 원
              </Text>

              <TouchableOpacity
                onPress={() => {
                  fetchPaymentDetails(order.OrderKey); // 결제 내역 조회
                  setShowPaymentDetails((prevState) => ({
                    ...prevState,
                    [order.OrderKey]: !prevState[order.OrderKey], // 해당 주문의 상태 토글
                  }));
                }}
                style={styles.paymentDetailsButton}
              >
                <Text style={styles.paymentDetailsButtonText}>
                  결제 상세 보기
                </Text>
              </TouchableOpacity>
              {showPaymentDetails[order.OrderKey] &&
                renderPaymentDetailsModal(order.OrderKey)}
            </View>
          </View>
        ))}

        {/* 모달 닫는 버튼 */}
        <View style={styles.buttonContainerModal}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "white",
    flex: 1,
    paddingBottom: 50,
  },

  modalContentContainer: {
    paddingBottom: 50, // 수정 가능: 닫기 버튼이 화면 하단에 더 많이 표시되도록 조절
  },

  searchContainerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  searchInputModal: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },

  searchButtonModal: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },

  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  switchButtonContainerModal: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },

  switchButton1Text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "green",
    marginRight: 10,
  },
  switchButton2Text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "red",
    marginLeft: 10,
  },

  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },

  orderBackground: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },

  orderText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },

  lineStyle: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  menuItemContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#ecf0f1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center", // 수평으로 컨테이너를 가운데 정렬
    marginVertical: Platform.OS === "ios" ? 5 : 10, // 상하 여백 조정 (iOS와 Android에 따라 다르게 설정)
  },

  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItemDetail: {
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "column", // column으로 변경하여 수직으로 배치
    alignItems: "center", // 가운데 정렬
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContainerModal: {
    marginTop: 0,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
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

  paymentDetailsButton: {
    marginTop: 10,
    backgroundColor: "#3498db", // 버튼 배경 색상
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // 버튼 내 텍스트 가운데 정렬
  },
  paymentDetailsButtonText: {
    color: "white", // 텍스트 색상
    fontWeight: "bold", // 텍스트 굵기
  },

  paymentDetailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  paymentDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentDetailItem: {
    marginBottom: 10,
  },
  paymentDetailText: {
    fontSize: 14,
  },
  // 결제취소 버튼 스타일
  cancelButton: {
    marginTop: 10, // 버튼 상단 여백
    backgroundColor: "#FF6347", // 버튼 배경색
    paddingVertical: 10, // 수직 패딩
    paddingHorizontal: 20, // 수평 패딩
    borderRadius: 5, // 버튼 모서리 둥글기
    borderWidth: 1, // 테두리 두께
    borderColor: "#FF6347", // 테두리 색상
    alignSelf: "center", // 컨테이너 중앙에 배치
    marginBottom: 20,
  },
  cancelButtonText: {
    color: "#FFFFFF", // 텍스트 색상
    fontSize: 14, // 텍스트 크기
    fontWeight: "bold", // 텍스트 굵기
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 2, // 선의 두께를 더 두껍게 설정
    borderColor: "#000", // 선의 색상을 검정색으로 설정
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // 그림자의 세로 오프셋을 더 크게 설정하여 그림자가 더 길게 보이도록 함
    },
    shadowOpacity: 0.5, // 그림자의 투명도를 더 낮추어 그림자를 더 진하게 함
    shadowRadius: 6, // 그림자의 블러 반경을 더 크게 설정하여 그림자가 더 넓게 퍼지도록 함
    elevation: 10, // 안드로이드에서의 그림자 깊이를 더 크게 설정하여 그림자가 더 뚜렷하게 보이도록 함
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalComp;
