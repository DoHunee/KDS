// soldout.js

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";

const Soldout = () => {
  // 메뉴 데이터 초기화
  const MENU_DATA = {
    Menu: [
      { name: "Cheeseburger", isSoldOut: false },
      { name: "Hamburger", isSoldOut: false },
      { name: "Coca-Cola", isSoldOut: false },
      { name: "Pizza", isSoldOut: false },
      { name: "Potato Pizza", isSoldOut: false },
    ],
  };

  // State that manages whether it is out of stock or not
  const [soldOutItems, setSoldOutItems] = useState({});

  // Set menu data when component is mounted
  useEffect(() => {
    const uniqueMenuList = MENU_DATA.Menu;
    setSoldOutItems(
      uniqueMenuList.reduce(
        (acc, { name, isSoldOut }) => ({ ...acc, [name]: isSoldOut }),
        {}
      )
    );
  }, [MENU_DATA]);

  // Function to update whether out of stock
  const handleSoldOut = (menu) => {
    Alert.alert(
      `Out of stock processing`,
      `Would you like to process the menu "${menu}" as out of stock?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => confirmSoldOut(menu),
        },
      ]
    );
  };

  const confirmSoldOut = (menu) => {
    setSoldOutItems((prevSoldOutItems) => ({
      ...prevSoldOutItems,
      [menu]: true,
    }));

    Alert.alert(
      `${menu} out of stock information`,
      `The item ${menu} is out of stock.`,
      [
        {
          text: "OK",
          onPress: () => console.log("Alert OK"),
        },
      ]
    );
  };

  // Function to render each menu
  const renderMenu = ({ name, isSoldOut }) => (
    <TouchableOpacity
      key={name}
      onPress={() => handleSoldOut(name)}
      disabled={isSoldOut} // Disable if out of stock
      style={[
        styles.menuItem,
        isSoldOut && styles.soldOutItemDisabled, // Apply style when out of stock
      ]}
    >
      <View style={styles.menuRow}>
        <Text style={styles.menuText}>{name}</Text>
        <TouchableOpacity
          onPress={() => handleSoldOut(name)}
          style={[
            styles.soldOutButton,
            isSoldOut && styles.soldOutActiveButton,
          ]}
          disabled={isSoldOut} // Disable if out of stock
        >
          <Text style={styles.stockButtonText}>Sold out</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu list</Text>
      {MENU_DATA.Menu.map((menu) => (
        <View key={menu.name} style={styles.menuContainer}>
          {renderMenu(menu)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuContainer: {
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    opacity: 1, // 초기에는 불투명
  },
  soldOutItemDisabled: {
    opacity: 0.5, // 품절 상태에서는 반투명
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    color: "black",
  },
  soldOutButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  soldOutActiveButton: {
    backgroundColor: 'green',
  },
  stockButtonText: {
    color: 'white',
  },
});

export default Soldout;