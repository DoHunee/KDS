// OrdersNumbers.js
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar } from "react-native";
import colors from "../refs/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const OrdersNumbers = ({ length, onAcceptAll }) => {
  const [showAcceptAll, setShowAcceptAll] = useState(false);

  const toggleShowAcceptAll = () => {
    setShowAcceptAll((prev) => !prev);
  };

  const handleAcceptAll = () => {
    toggleShowAcceptAll();
    onAcceptAll();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleShowAcceptAll}>
      <View style={styles.metadataContainer}>
        <Text style={styles.metadataText}>
          <Text style={styles.boldText}>{length}</Text> : Item{length > 1 ? "s" : ""}
        </Text>
        <MaterialCommunityIcons name={showAcceptAll ? "chevron-up" : "chevron-down"} 
        size={20} 
        color={colors.white} />
      </View>
      {showAcceptAll && (
        <TouchableOpacity style={styles.acceptAllButton} onPress={handleAcceptAll}>
          <Text style={styles.acceptAllButtonText}>전체수락</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "skyblue",
    padding: 10,
    right: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  metadataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  // 좌우로 정렬 변경
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
    backgroundColor: "skyblue",
    padding: 5,
    marginTop: 10,
    borderRadius: 4,
    alignSelf: "flex-end", // 우측 정렬
  },
  acceptAllButtonText: {
    color: "white",
    fontSize: 14,
  },
});
export default OrdersNumbers;