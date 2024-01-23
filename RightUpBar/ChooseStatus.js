// ChooseStatus.js
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Platform, StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const ChooseStatus = ({ length, onSelectStatus }) => {
  
  const [selectedStatus, setSelectedStatus] = useState(null); //초기값은 null로 설정합니다. 이 상태는 드롭다운이 열려있는지 닫혀있는지를 나타냅니다.
  
  const toggleSelectedStatus = () => {  //드롭다운을 토글하는 함수!!
    setSelectedStatus((prev) => !prev);
  };

  return (
    // 토글을 누르면!
    <TouchableOpacity style={styles.container} onPress={toggleSelectedStatus}>  
      <View style={styles.metadataContainer}>
        <Text style={styles.metadataText}>
          <Text style={styles.boldText}>{length}</Text> : Item{length > 1 ? "s" : ""}
        </Text>
        <MaterialCommunityIcons name={selectedStatus ? "chevron-up" : "chevron-down"} size={20} color={"black"} />
      </View>
      {selectedStatus && (
        <View style={styles.buttonsContainer}>
          <Button onPress={() => onSelectStatus("ready")}style={styles.customButton}>주문처리완료</Button>
          <Button onPress={() => onSelectStatus("fast_ready")}style={styles.customButton}>즉시수령</Button>
          <Button onPress={() => onSelectStatus("decline")}style={styles.customButton}>취소처리</Button>
        </View>
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
    flexDirection: "column",
  },
  metadataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metadataText: {
    color: "black",
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: "column",
    backgroundColor: "skyblue",
    padding: 1,
    marginTop: 2,
    marginRight: 4,
    borderRadius: 4,
    alignSelf: "flex-end", // 우측 정렬
  },

  customButton: {
    backgroundColor: "skyblue",
    alignItems: "center",
    padding: 0,
    marginTop: 2,
    marginRight : 4,
    borderRadius: 4,
  },
});

export default ChooseStatus;