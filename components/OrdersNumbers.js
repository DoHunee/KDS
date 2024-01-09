// OrdersNumbers.js

import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar } from "react-native";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrdersNumbers = ({ length, onAcceptAll }) => {
  const [showAcceptAll, setShowAcceptAll] = useState(false);

  const handlePress = () => {
    setShowAcceptAll(true);
  };

  const handleAcceptAll = () => {
    setShowAcceptAll(false);
    onAcceptAll(); // 수정된 부분: Accept All 버튼 클릭 시 콜백 호출
  };

  return (
    <TouchableOpacity style={styles.listMetaData} onPress={handlePress}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.white, fontSize: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 13 }}>{length}</Text> : Item{length > 1 ? "s" : ""}{" "}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color={colors.white} />
      </View>
      {showAcceptAll && (
        <TouchableOpacity style={styles.acceptAllButton} onPress={handleAcceptAll}>
          <Text style={styles.acceptAllButtonText}>Accept All</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

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
    backgroundColor: colors.secondary,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: "flex-end", // align right
  },
  acceptAllButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OrdersNumbers;