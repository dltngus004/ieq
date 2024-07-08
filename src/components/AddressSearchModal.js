import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const AddressSearchModal = ({ visible, onClose, onAddressSelect }) => {
  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState('');

  const handleAddressSearch = () => {
    // 주소 검색 로직을 추가합니다.
    // 예: API를 사용하여 주소 검색을 수행하고 결과를 반환
    const searchedAddress = '검색된 주소'; // 예시 주소
    setAddress(searchedAddress);
  };

  const handleAddressSelect = () => {
    onAddressSelect(address);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>주소 검색</Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="주소를 입력하세요"
        />
        <TouchableOpacity onPress={handleAddressSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
        {address ? (
          <View style={styles.addressResult}>
            <Text>{address}</Text>
            <TouchableOpacity onPress={handleAddressSelect} style={styles.selectButton}>
              <Text style={styles.selectButtonText}>선택</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addressResult: {
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddressSearchModal;
