import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Modal, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import DeviceSelector from '../components/DeviceSelector';
import AirQualityItem from '../components/AirQualityItem';
import {
  getResponsiveFontSize,
  getResponsivePadding,
  getResponsiveMargin,
  getResponsiveWidth,
  getResponsiveHeight,
} from '../utils/utils';

const { width: viewportWidth } = Dimensions.get('window');

const AirQualityDetails = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleDataFetched = (fetchedData) => {
    setData(fetchedData);
  };

  const handleItemPress = (item) => {
    const dataType = item.label;
    console.log('Navigating with item:', { ...item, dataType });
    navigation.navigate('DetailAirQualityView', { item: { ...item, dataType } });
  };

  const handleInfoPress = (label) => {
    setModalContent(label);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <DeviceSelector />
      </View>
      <View style={styles.AirQualityItem}>
        <AirQualityItem onDataFetched={handleDataFetched} />
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <TouchableOpacity
                style={styles.itemContent}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.itemHeader}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <TouchableOpacity onPress={() => handleInfoPress(item.label)}>
                    <Icon name="info" size={20} color="#0000ff" />
                  </TouchableOpacity>
                </View>
                <Icon name={item.icon} size={30} color="#0000ff" />
                <Text style={styles.itemValue}>{item.value}</Text>
              </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },
  AirQualityItem: {
    padding: getResponsivePadding(15),
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: '30%',
    color: '#000',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: viewportWidth > 768 ? '49%' : '49%', // 탭에서는 24%, 모바일에서는 49%
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: getResponsivePadding(16),
    marginVertical: getResponsiveMargin(8),
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  itemContent: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemLabel: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemValue: {
    fontSize: getResponsiveFontSize(22),
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  modalContent: {
    width: getResponsiveWidth(75), // 적절한 비율로 조정
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: getResponsiveMargin(20),
    color: 'blue',
  },
});


export default AirQualityDetails;
