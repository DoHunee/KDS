// LoginForm.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const LoginForm = ({ 
  storedNumber, 
  handleDigitInput, 
  storedNumberRefs, 
  categoryNumber, 
  setCategoryNumber, 
  employeeID, 
  setEmployeeID 
  }) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        {/* 여러 개의 TextInput으로 이루어진 입력란 */}
        {storedNumber.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.digitInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleDigitInput(text, index, storedNumberRefs[index + 1])}
            ref={storedNumberRefs[index]}
          />
        ))}
      </View>

      {/* 추가 입력란들 */}
      <TextInput
        style={[styles.digitInput, { alignSelf: 'center' }]}
        keyboardType="numeric"
        maxLength={2}
        value={categoryNumber}
        onChangeText={(text) => setCategoryNumber(text)}
      />

      <TextInput
        style={[styles.input, { alignSelf: 'center' }]}
        placeholder="사원 식별 번호 (7자리)"
        keyboardType="numeric"
        maxLength={7}
        value={employeeID}
        onChangeText={(text) => setEmployeeID(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  digitInput: {
    height: 40,
    width: 60,
    borderColor: '#61dafb',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#61dafb',
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: 'black',
  },
});

export default LoginForm;