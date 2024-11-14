import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const AddressSearchModal = ({ visible, onClose, onAddressSelect }) => {
  const handleSelectedAddress = (data) => {
    onAddressSelect(data.address);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
          <Postcode
            style={{ width: '100%', height: '100%' }}
            jsOptions={{ animation: true }}
            onSelected={handleSelectedAddress}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default AddressSearchModal;
