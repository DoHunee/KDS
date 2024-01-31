import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";

export const commonStyles = StyleSheet.create({
  
  container: {
    padding: 15,
    zIndex: 20000,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height, // 모달이 올라올 때 화면 전체를 꽉 채우도록 설정
    top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,

  },

  selectedDateInfoContainer: {
    marginTop: -15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },

  totalSalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e74c3c",
  },

  monthlySalesText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#27ae60",
  },

  calendar: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  modalContainer: {
    marginTop: 50,
    padding: 20,
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

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
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

  buttonContainer: {
    flexDirection: "column", // column으로 변경하여 수직으로 배치
    alignItems: "center", // 가운데 정렬
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  buttonContainerModal: {
    marginTop: 0,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
  },

  switchButtonContainerModal: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#3498db",
    marginHorizontal: 5,
  },

});

export default commonStyles;