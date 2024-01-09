import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// OrdersNumbers 컴포넌트는 length라는 프롭을 받아와 주문 아이템의 수를 나타냅니다.
// 주문 아이템의 수에 따라 "Item" 또는 "Items"로 표시됩니다.
// 마지막으로, 화살표 아이콘은 "chevron-down"으로 지정되었으며 크기는 24로 설정되고 색상은 흰색입니다.
// 주문 아이템의 수를 클릭하면 Accept All 버튼이 나타납니다.
const OrdersNumbers = ({ length }) => {
  const [showAcceptAll, setShowAcceptAll] = useState(false);

  const handlePress = () => {
    setShowAcceptAll(true);
  };

  return (
    <TouchableOpacity
      style={styles.listMetaData}
      onPress={handlePress}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>{length}</Text> :
          Item{length > 1 ? "s" : ""}{" "}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color={colors.white}
        />
      </View>
      {showAcceptAll && (
        <TouchableOpacity
          style={styles.acceptAllButton}
          onPress={() => {
            // Accept All 버튼 동작 구현
            setShowAcceptAll(false);
          }}
        >
          <Text style={styles.acceptAllButtonText}>Accept All</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default OrdersNumbers;

const styles = StyleSheet.create({
  listMetaData: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: colors.secondary,
    padding: 5,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  acceptAllButton: {
    backgroundColor: colors.primary,
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  acceptAllButtonText: {
    color: colors.white,
    fontSize: 12,
  },
});