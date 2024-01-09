import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../refs/colors";

// 버튼 누르면 흐려지는거!!! 
// accept , decline , schedule 에 정의할 것!!
const Button = (props) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={props.outline ? styles.outline : styles.filled}
      >
        <Text
          style={{
            color: props.outline ? colors.lightGray : colors.lightBlack,
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  outline: {
    borderColor: colors.action,
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 10,
  },
  filled: {
    backgroundColor: colors.action,
    padding: 8,
    borderRadius: 10,
  },
});
