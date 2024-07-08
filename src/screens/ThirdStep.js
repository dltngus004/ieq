import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const ThirdStep = ({ navigation }) => {
  const [wifiList, setWifiList] = useState([
    { id: '1', name: 'IEQ20240206', strength: 3, secured: true },
    { id: '2', name: 'IEQ20240252', strength: 2, secured: true },
    { id: '3', name: 'IEQ20240232', strength: 1, secured: false },
    { id: '4', name: 'IEQ20240255', strength: 2, secured: true },
    { id: '5', name: 'IEQ20240212', strength: 3, secured: true },
    { id: '6', name: 'IEQ20240202', strength: 1, secured: true },
    { id: '7', name: 'IEQ20240203', strength: 3, secured: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // success 또는 failure
  const [selectedWifi, setSelectedWifi] = useState(null);

  const handleRefresh = () => {
    console.log('새로고침 버튼 클릭됨');
  };

  const handleWifiSelect = (wifi) => {
    setSelectedWifi(wifi);
    // 예시로 성공과 실패를 무작위로 설정
    const success = Math.random() > 0.5;
    setModalType(success ? 'success' : 'failure');
    setModalVisible(true);
  };

  const handleConnect = () => {
    console.log('연결된 Wi-Fi:', selectedWifi.name);
    setModalVisible(false);
    if (modalType === 'success') {
      navigation.navigate('FourthStep'); // 마지막 단계로 이동
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.wifiItem} onPress={() => handleWifiSelect(item)}>
      <Text style={styles.wifiName}>{item.name}</Text>
      {/* 아이콘을 제거했습니다 */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>01</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>02</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonActive}>
          <Text style={styles.stepTextActive}>03</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>04</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>휴대폰과 IEQ 연결</Text>
        <Text style={styles.subtitle}>
          Wi-Fi 네트워크 목록에서 IEQ(01)를 선택해 주세요.{'\n'}
          IEQ의 AP는 'VOTY'로 시작합니다
        </Text>
        <Image source={require('../assets/images/device_img.png')} style={styles.image} />
      </View>
      <View style={styles.wifiSelection}>
        <View style={styles.refreshContainer}>
          <Text style={styles.subTitle}>연결 가능한 디바이스</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {wifiList.length === 0 ? (
          <Text style={styles.noWifiText}>검색된 Wi-Fi 네트워크가 없습니다</Text>
        ) : (
          <FlatList
            data={wifiList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.wifiList}
          />
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalType === 'success' ? (
              <Text style={styles.modalTitle}>기기 등록에 성공하였습니다.</Text>
            ) : (
              <Text style={styles.modalTitle}>기기 등록에 실패하였습니다.</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConnect]} onPress={handleConnect}>
                <Text style={styles.modalButtonTextConnect}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // 버튼과 선을 수직으로 가운데 정렬
    marginVertical: getResponsiveMargin(20),
  },
  stepButtonActive: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2), // 버튼 사이의 간격을 줄입니다.
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  stepButtonInactive: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2), // 버튼 사이의 간격을 줄입니다.
  },
  stepTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(16),
  },
  stepTextInactive: {
    color: '#ccc',
    fontSize: getResponsiveFontSize(16),
  },
  line: {
    width: getResponsiveWidth(8),
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: getResponsiveMargin(2), // 선과 버튼 사이의 간격을 줄입니다.
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: getResponsiveFontSize(25),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000'
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: getResponsiveMargin(30),
  },
  image: {
    width: getResponsiveWidth(80),
    height: getResponsiveHeight(30),
    resizeMode: 'contain',
  },
  wifiSelection: {
    flex: 1,
    maxHeight: getResponsiveHeight(60),
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
  },
  subTitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
  },
  refreshButton: {
    padding: getResponsivePadding(10),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4
  },
  noWifiText: {
    textAlign: 'center',
    color: '#666',
    marginTop: getResponsiveMargin(20),
  },
  wifiList: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#000',
  },
  wifiItem: {
    padding: getResponsivePadding(15),
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wifiName: {
    fontSize: getResponsiveFontSize(18),
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: getResponsiveWidth(90),
    padding: getResponsivePadding(30),
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(20),
    color: '#000',
    textAlign: 'left',
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: getResponsivePadding(10),
    marginHorizontal: getResponsiveMargin(5),
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  modalButtonConnect: {
    backgroundColor: '#1e90ff',
  },
  modalButtonText: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
  },
  modalButtonTextConnect: {
    fontSize: getResponsiveFontSize(16),
    color: '#fff',
  },
});

export default ThirdStep;
