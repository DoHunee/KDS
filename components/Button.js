import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Button = (props) => {
  return (
    <View style={[styles.container]}>

      <TouchableOpacity
        onPress={props.onPress}
        style={props.outline ? styles.outline : styles.filled}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 16,
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
    borderColor: "skyblue",
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 10,
  },
  filled: {
    backgroundColor: "skyblue",
    padding: 8,
    borderRadius: 10,
  },
});
