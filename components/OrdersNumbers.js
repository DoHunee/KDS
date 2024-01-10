// OrdersNumbers.js

import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar } from "react-native";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OrdersNumbers = ({ length, onAcceptAll }) => {
  const [showAcceptAll, setShowAcceptAll] = useState(false);

  const toggleAcceptAll = () => {
    setShowAcceptAll((prev) => !prev);
  };

  const handleAcceptAll = () => {
    toggleAcceptAll(); // Accept All 버튼 클릭 시 상태 변경
    onAcceptAll();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleAcceptAll}>
      <View style={styles.metadataContainer}>
        <Text style={styles.metadataText}>
          <Text style={styles.boldText}>{length}</Text> : Item{length > 1 ? "s" : ""}
        </Text>
        <MaterialCommunityIcons name={showAcceptAll ? "chevron-up" : "chevron-down"} size={24} color={colors.white} />
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
  container: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: colors.secondary,
    padding: 5,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  metadataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  metadataText: {
    color: colors.white,
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  acceptAllButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: "flex-end", // 우측 정렬
  },
  acceptAllButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default OrdersNumbers;