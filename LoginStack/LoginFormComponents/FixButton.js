// FixButton.js
import React from 'react';
import { Button, StyleSheet } from 'react-native';

const FixButton = ({ onPress }) => {
  return (
    <Button
      title="식별번호 수정"
      onPress={onPress}
      style={styles.fixButton}
    />
  );
};

const styles = StyleSheet.create({
  fixButton: {
    backgroundColor: '#61dafb',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default FixButton;