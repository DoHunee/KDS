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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

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
  selectedcancelOrders,
}) => {
  useEffect(() => {
    handleSearchOrder(); // searchOrder가 변경될 때마다 주문을 검색하고 업데이트합니다.
  }, [searchOrder]); // searchOrder가 변경될 때마다 useEffect가 실행됩니다.

  const [paymentDetails, setPaymentDetails] = useState(null); // 결제 내역을 저장할 상태
  const [showPaymentDetails, setShowPaymentDetails] = useState({}); //상세결제내역 보였다 안보였다 하게!

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
      // 여기에 결제 내역을 표시하는 로직을 추가할 수 있습니다 (예: 모달 열기)
    } catch (error) {
      console.error("결제 내역 조회 중 오류 발생:", error);
    }
  };

  // 결제 내역 섹션을 렌더링하는 함수
  const renderPaymentDetails = (orderKey) => {
    if (!paymentDetails || !showPaymentDetails[orderKey]) return null; // 해당 주문의 결제 내역 데이터가 없거나 표시 상태가 false일 경우 렌더링하지 않음

    // 결제 내역 데이터를 렌더링하는 UI 구성
    return (
      <View style={styles.paymentDetailsContainer}>
        <Text style={styles.paymentDetailsTitle}>결제 상세 정보:</Text>
        {paymentDetails.map((detail, index) => (
          <View key={index} style={styles.paymentDetailItem}>
            <Text style={styles.paymentDetailText}>
              금액: {detail.Amount}원
            </Text>
            <Text style={styles.paymentDetailText}>
              카드명: {detail.CardName}
            </Text>
            <Text style={styles.paymentDetailText}>
              카드번호: {detail.CardNo}
            </Text>
            <Text style={styles.paymentDetailText}>
              승인번호: {detail.AppNo}
            </Text>
            <Text style={styles.paymentDetailText}>
              결제시간: {detail.AppTime}
            </Text>
            {/* 필요에 따라 더 많은 결제 정보를 추가할 수 있음 */}
          </View>
        ))}
      </View>
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
        {selectedOrders.concat(selectedcancelOrders).map((order) => (
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
              {renderPaymentDetails(order.OrderKey)}
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
});

export default ModalComp;
