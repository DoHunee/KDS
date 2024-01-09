
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RefreshButton = ({ onRefresh }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onRefresh}>
      <Text style={styles.buttonText}>Refresh</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RefreshButton;