import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// 총 주문 갯수 나타내주는!!!
// rdersNumbers 컴포넌트는 length라는 prop을 받아와서 주문 아이템의 수를 나타냅니다.
// 길이에 따라 "Item" 또는 "Items"로 표시됩니다.
//마지막으로, 화살표 아이콘은 "chevron-down"으로 지정되어 있고, 크기는 24, 색상은 흰색으로 설정되어 있습니다
const OrdersNumbers = ({ length }) => {
  return (
    <TouchableOpacity style={styles.listMetaData}>
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
    </TouchableOpacity>
  );
};

export default OrdersNumbers;


// top: Platform.OS === "android" ? StatusBar.currentHeight : 50: 
// 화면 상단으로부터의 거리를 설정합니다. 
// 안드로이드 플랫폼인 경우 상태 바의 높이(StatusBar.currentHeight)로, 
// 아닌 경우 50으로 설정합니다.
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
});
