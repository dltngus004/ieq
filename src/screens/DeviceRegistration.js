import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const DeviceRegistration = ({ navigation }) => {
  const [wifiList, setWifiList] = useState([
    { id: '1', name: 'NUGU100AEGJEO0023', strength: 3, secured: true },
    { id: '2', name: 'NUGU100AERJGEO23', strength: 2, secured: true },
    { id: '3', name: 'T-GUEST', strength: 1, secured: false },
    { id: '4', name: 'TMC_AP_03', strength: 2, secured: true },
    { id: '5', name: 'BtvNUGU204493', strength: 3, secured: true },
    { id: '6', name: 'AnotherWifi', strength: 1, secured: true },
    { id: '7', name: 'OpenWifi', strength: 3, secured: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRefresh = () => {
    console.log('새로고침 버튼 클릭됨');
  };

  const handleWifiSelect = (wifi) => {
    setSelectedWifi(wifi);
    setModalVisible(true);
  };

  const handleConnect = () => {
    console.log('연결된 Wi-Fi:', selectedWifi.name, '비밀번호:', password);
    setModalVisible(false);
    navigation.navigate('SecondStep'); // 2단계 화면으로 이동
  };

  const renderWifiIcon = (strength) => {
    switch (strength) {
      case 1:
        return <Ionicons name="wifi" size={getResponsiveFontSize(24)} color="#666" />;
      case 2:
        return <Ionicons name="wifi" size={getResponsiveFontSize(24)} color="#666" />;
      case 3:
        return <Ionicons name="wifi" size={getResponsiveFontSize(24)} color="#666" />;
      default:
        return <Ionicons name="wifi" size={getResponsiveFontSize(24)} color="#666" />;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.wifiItem} onPress={() => handleWifiSelect(item)}>
      <Text style={styles.wifiName}>{item.name}</Text>
      <View style={styles.iconContainer}>
        {renderWifiIcon(item.strength)}
        {item.secured && (
           <Ionicons name="lock-closed" size={getResponsiveFontSize(24)} color="#000" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={styles.stepButtonActive}>
          <Text style={styles.stepTextActive}>01</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>02</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>03</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>04</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Ionicons name="wifi" size={getResponsiveFontSize(150)} color="#1e90ff" />
        <Text style={styles.instructions}>
          IEQ에 연결할 <Text style={styles.bold}>Wi-Fi 네트워크</Text>를 선택해 주세요.
        </Text>
      </View>
      <View style={styles.wifiSelection}>
        <View style={styles.refreshContainer}>
          <Text style={styles.subTitle}>연결 가능한 Wi-Fi</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <Ionicons name="refresh" size={getResponsiveFontSize(20)} color="#000" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={wifiList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.wifiList}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Wi-Fi 비밀번호를 입력해 주세요.</Text>
            <TextInput
              style={[styles.input, styles.inputTextColor]}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력하세요."
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "checkmark-circle" : "checkmark-circle-outline"} 
                  size={getResponsiveFontSize(24)} 
                  color={showPassword ? "#1e90ff" : "#000"} 
                />
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>비밀번호 표시</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalButtonConnect]} onPress={handleConnect}>
                <Text style={styles.modalButtonTextConnect}>연결</Text>
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
    justifyContent: 'space-between'
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // 버튼과 선을 수직으로 가운데 정렬
  },
  stepButtonActive: {
    width: isTablet ? getResponsiveWidth(6) : getResponsiveWidth(12),
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(12),
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2),
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  stepButtonInactive: {
    width: isTablet ? getResponsiveWidth(6) : getResponsiveWidth(12),
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(12),
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2),
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
    marginHorizontal: getResponsiveMargin(2),
  },
  imageContainer: {
    alignItems: 'center',
  },
  instructions: {
    fontSize: getResponsiveFontSize(16),
    textAlign: 'center',
    color: '#666',
    marginBottom: getResponsiveMargin(20),
    paddingTop: getResponsivePadding(10)
  },
  bold: {
    fontWeight: 'bold',
    color: '#000'
  },
  wifiSelection: {
    flex: 1,
    maxHeight: getResponsiveHeight(45), // 고정된 높이를 설정하여 스크롤이 가능하도록 함
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
    borderRadius: getResponsiveWidth(1),
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
    color: '#000'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: getResponsiveWidth(1),
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(20),
    color: '#000',
    textAlign: 'left',
    width: '100%'
  },
  input: {
    width: '100%',
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: getResponsiveWidth(1),
    marginBottom: getResponsiveMargin(10),
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  checkboxLabel: {
    marginLeft: getResponsiveMargin(10),
    color: '#666'
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
    borderRadius: getResponsiveWidth(1),
    backgroundColor: '#ddd'
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

export default DeviceRegistration;
