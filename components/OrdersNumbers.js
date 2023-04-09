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
