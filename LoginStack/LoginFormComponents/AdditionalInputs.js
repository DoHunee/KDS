import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const AdditionalInputs = ({
  categoryNumber,
  setCategoryNumber,
  employeeID,
  setEmployeeID,
}) => {
  const categoryNumberRef = useRef();
  const employeeIDRef = useRef();

  return (
    <View>
      {/* 포스번호 입력란 */}
      <TextInput
        style={[styles.digitInput, { alignSelf: "center" }]}
        keyboardType="numeric"
        maxLength={2}
        value={categoryNumber}
        onChangeText={(text) => setCategoryNumber(text)}
        ref={categoryNumberRef}
      />

      {/* 사원 식별 번호 입력란 */}
      <TextInput
        style={[styles.input, { alignSelf: "center" }]}
        placeholder="사원 식별 번호 (7자리)"
        keyboardType="numeric"
        maxLength={7}
        value={employeeID}
        onChangeText={(text) => setEmployeeID(text)}
        ref={employeeIDRef}
      />

      {/* 예시 값 */}
      <Text
        style={{
          color: "gray",
          fontSize: 14,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        예시 값: {storedNumberExample} - {storedCategoryNumberExample} -{" "}
        {storedEmployeeIDExample}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  digitInput: {
    height: 40,
    width: 60,
    borderColor: "#61dafb",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "black",
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#61dafb",
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: "black",
  },
});

export default AdditionalInputs;