// EditNickname.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';
import { UserContext } from '../context/UserContext';

const EditNickname = ({ navigation, route }) => {
  const { setNickname } = useContext(UserContext);
  const [nickname, setLocalNickname] = useState(route.params.nickname);
  const [inputLength, setInputLength] = useState(nickname.length);

  const handleSave = () => {
    setNickname(nickname); // Update the nickname in UserContext
    navigation.goBack();
  };

  const handleClearInput = () => {
    setLocalNickname('');
    setInputLength(0);
  };

  const handleInputChange = (text) => {
    if (text.length <= 10) {
      setLocalNickname(text);
      setInputLength(text.length);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>닉네임 입력</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputTextColor]} 
          value={nickname}
          onChangeText={handleInputChange}
          maxLength={10}
        />
        {nickname.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearInput}>
            <Icon name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.inputLength}>{inputLength}/10자</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: getResponsiveFontSize(18),
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: getResponsivePadding(10),
    justifyContent: 'space-between'
  },
  input: {
    padding: getResponsivePadding(15),
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  clearButton: {
    marginLeft: getResponsiveMargin(10),
  },
  inputLength: {
    fontSize: getResponsiveFontSize(14),
    color: '#888',
    textAlign: 'right',
    marginTop: getResponsiveMargin(5),
  },
  saveButton: {
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    paddingVertical: getResponsivePadding(10),
    borderRadius: 5,
    marginTop: getResponsiveMargin(20),
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default EditNickname;
