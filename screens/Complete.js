import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../refs/colors";

const Complete = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Text>Complete</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
