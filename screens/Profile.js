import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import colors from "../refs/colors";
import Button from "../components/Button";

const Profile = ({ navigation, name, role }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.secondary,
      },
      headerTintColor: colors.white,
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Hellow, <Text style={{ fontWeight: "bold" }}>Name</Text>
      </Text>
      <Text style={styles.text}>Role : Role</Text>
      <View style={{ marginTop: 5 }}>
        <Button>Logout</Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 25,
    margin: 10,
  },
});
