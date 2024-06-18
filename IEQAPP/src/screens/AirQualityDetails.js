import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AirQualityDetails = () => {
  const [selectedDevice, setSelectedDevice] = useState('보티 연구소');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // 임의의 데이터
  const data = [
    { label: '온도', value: '20°C', icon: 'thermostat' },
    { label: '습도', value: '20%', icon: 'water-drop' },
    { label: 'CO2', value: '350ppm', icon: 'air' },
    { label: 'TVOC', value: '0mg/m3', icon: 'waves' },
    { label: '조도', value: '350lux', icon: 'wb-sunny' },
    { label: '소음', value: '40dB', icon: 'volume-up' },
    { label: 'AQI', value: '55', icon: 'bar-chart' },
  ];

  const handleInfoPress = (label) => {
    setModalContent(label);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedDevice}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedDevice(itemValue)}
      >
        <Picker.Item label="보티 연구소" value="보티 연구소" />
        {/* 다른 항목들을 추가하세요 */}
      </Picker>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <TouchableOpacity onPress={() => handleInfoPress(item.label)}>
              <Icon name="info" size={20} color="#0000ff" />
            </TouchableOpacity>
            <Icon name={item.icon} size={30} color="#0000ff" />
            <Text style={styles.itemValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>{modalContent} 정보</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemLabel: {
    fontSize: 16,
    marginVertical: 8,
  },
  itemValue: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});

export default AirQualityDetails;
