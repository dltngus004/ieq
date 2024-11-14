import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AirQualityItem from '../components/AirQualityItem'; // AirQualityItem 컴포넌트 임포트

const DeviceRegistration = ({ serialNumber, onSuccess }) => {
  const { userName } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showSerialNumber, setShowSerialNumber] = useState(false);
  const [registeredSerialNumber, setRegisteredSerialNumber] = useState(null); // 등록된 시리얼 번호 상태
  const [modalVisible, setModalVisible] = useState(false);

  const registerDevice = async () => {
    const requestData = {
      UserId: userName,
      AppReq: serialNumber,
      AppReq2: "IEQ"
    };

    console.log('Registering device with data:', requestData);

    setLoading(true);

    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/IEQRegister', JSON.stringify(requestData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      console.log('서버 응답:', response.data);
      setRegisteredSerialNumber(serialNumber); // 등록된 시리얼 번호 설정
      Alert.alert("응답 받음", `answer: ${response.data.answer}, code: ${response.data.code}, codeExplain: ${response.data.codeExplain}`, [
        { text: "확인", onPress: () => onSuccess(serialNumber) }
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Error details:', error);
      if (error.response) {
        console.error('서버 응답 오류:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('요청 오류:', error.request);
        console.log('요청 headers:', error.request._headers);
        console.log('요청 URL:', error.request._url);
        console.log('요청 data:', error.request._bodyInit);
      } else {
        console.error('기기 등록 오류:', error.message);
      }
      Alert.alert("실패", `기기 등록 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const maskedSerialNumber = serialNumber.replace(/.(?=.{4})/g, '*');

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>기기등록을 시작합니다.</Text>
          <Text style={[styles.input, styles.inputTextColor]}>
            {showSerialNumber ? serialNumber : maskedSerialNumber}
          </Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setShowSerialNumber(!showSerialNumber)}>
              <Ionicons
                name={showSerialNumber ? "checkmark-circle" : "checkmark-circle-outline"}
                size={getResponsiveFontSize(24)}
                color={showSerialNumber ? "#1e90ff" : "#000"}
              />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>시리얼 번호 표시</Text>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonConnect]} onPress={registerDevice} disabled={loading}>
              <Text style={styles.modalButtonTextConnect}>{loading ? '등록 중...' : '등록'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {registeredSerialNumber && (
        <AirQualityItem 
          serialNumber={registeredSerialNumber}
          fetchDataTrigger={registeredSerialNumber}
          onDataFetched={(data) => console.log('Air Quality Data:', data)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000'
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    marginBottom: getResponsiveMargin(20),
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: getResponsivePadding(10),
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
  },

  modalTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(20),
    color: '#000',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: getResponsiveMargin(10),
  },
  inputTextColor: {
    color: '#000',
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

export default DeviceRegistration;
