// Sales.js
import React, { useEffect } from "react";
import { Text} from "react-native-paper";
import { SafeAreaView, StyleSheet ,Alert,View } from "react-native";
import { useSelector } from "react-redux";
import colors from "../refs/colors";
import EmptyOrders from "../components/EmptyOrders";
import CalendarComp from "../components/CalendarComp"


const Salse = () => {

  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     Alert.alert("로그인 필요", "사용하기 전에 로그인이 필요합니다.");
  //   }
  // }, [isLoggedIn]);


  return (
    <View style={styles.container}>
    {/* {isLoggedIn ? (
      <> */}
    <EmptyOrders name="Sales" />
    <CalendarComp></CalendarComp>

    {/* </>
    ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
 
});

export default Salse;