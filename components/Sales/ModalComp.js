import React from "react";
import {
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { commonStyles } from "./style";
import { Ionicons } from "@expo/vector-icons";

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
  declineButtonTranslucent,
  handleOrderStatusButtonClick,
  selectedOrders,
  selecteddeclineOrders,
}) => {
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
        style={commonStyles.modalContainer}
        contentContainerStyle={commonStyles.modalContentContainer}
      >
        {/* 검색 상자 및 검색 버튼 추가 */}
        <View style={commonStyles.searchContainerModal}>
          <TextInput
            style={commonStyles.searchInputModal}
            placeholder="주문 번호를 입력하세요."
            placeholderTextColor="rgba(0, 0, 0, 0.5)" // 투명한 검정 색상으로 설정
            value={searchOrder}
            onChangeText={(text) => setSearchOrder(text)}
          />
          <TouchableOpacity
            style={commonStyles.searchButtonModal}
            onPress={() => handleSearchOrder()}
          >
            <Text style={commonStyles.searchButtonText}>검색</Text>
          </TouchableOpacity>
        </View>

        {/* 각 주문목록을 볼 수 있는 버튼 생성 */}
        <View style={commonStyles.switchButtonContainerModal}>
          <TouchableOpacity
            onPress={() => handleOrderStatusButtonClick("ready")}
            style={[
              commonStyles.switchButton1Text,
              readyButtonTranslucent && { opacity: 0.5 }, // 버튼이 투명할 때의 스타일
            ]}
          >
            <Text style={commonStyles.switchButton1Text}>즉시수령,완료</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOrderStatusButtonClick("decline")}
            style={[
              commonStyles.switchButton2Text,
              declineButtonTranslucent && { opacity: 0.5 }, // 버튼이 투명할 때의 스타일
            ]}
          >
            <Text style={commonStyles.switchButton2Text}>취소목록</Text>
          </TouchableOpacity>
        </View>

        {/* 모달창안에 주문내역을 나타내는 부분!! */}
        {selectedOrders.concat(selecteddeclineOrders).map((order) => (
          <View
            key={order.id}
            //  주문내역 배경을 설정하는 부분!!
            style={[
              commonStyles.orderContainer,
              {
                backgroundColor:
                  order.status === "decline"
                    ? "red"
                    : order.status === "ready" || order.status === "fast_ready"
                    ? "green"
                    : "lightgreen",
              },
            ]}
          >
            <View style={commonStyles.orderBackground}>
              <Text style={commonStyles.orderText}>
                이름: {order.name} [{order.hp}]
              </Text>
              <View style={commonStyles.lineStyle}></View>
              <Text style={commonStyles.orderText}>주문번호 : {order.id} </Text>
              <Text style={commonStyles.orderText}>
                판매시간 : {order.date}{" "}
              </Text>
              <Text style={commonStyles.orderText}>
                주문상태 : {order.status}{" "}
              </Text>
              <View style={commonStyles.lineStyle}></View>

              <Text style={commonStyles.orderText}>
                [주문 목록]:{"\n\n"}
                {order.orders.map((item, index) => (
                  <View key={item.name} style={commonStyles.menuItemContainer}>
                    <Text style={commonStyles.menuItemName}>
                      메뉴명: {item.name}
                    </Text>
                    <Text style={commonStyles.menuItemDetail}>
                      수량: {item.quantity} | 금액: {item.price * item.quantity}{" "}
                      원
                    </Text>
                  </View>
                ))}
              </Text>

              <View style={commonStyles.lineStyle}></View>
              <Text style={commonStyles.orderText}>
                총 가격 :{" "}
                {order.orders.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                )}{" "}
                원
              </Text>
            </View>
          </View>
        ))}

        {/* 모달 닫는 버튼 */}
        <View style={commonStyles.buttonContainerModal}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={commonStyles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* up-down 버튼! */}
      <View style={commonStyles.buttonContainer}>
        {/* 위로 이동하는 버튼 */}
        <TouchableOpacity
          style={commonStyles.scrollToTopButton}
          onPress={scrollToTop}
        >
          <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>

        {/* 아래로 이동하는 버튼 */}
        <TouchableOpacity
          style={commonStyles.scrollToBottomButton}
          onPress={scrollToBottom}
        >
          <Ionicons name="arrow-down" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalComp;
