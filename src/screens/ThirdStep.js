import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Dimensions, PermissionsAndroid, Platform, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WifiManager from 'react-native-wifi-reborn';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveWidth, getResponsiveHeight } from '../utils/utils';
import { UserContext } from '../context/UserContext';
import DeviceRegistration from './DeviceRegistration'; // DeviceRegistration 컴포넌트 임포트

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const ThirdStep = ({ navigation }) => {
  const [wifiList, setWifiList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { userName } = useContext(UserContext);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      setPassword('');
    }
  }, [modalVisible]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한 요청",
            message: "Wi-Fi 네트워크를 검색하려면 위치 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("위치 권한이 부여되었습니다.");
          scanWifiNetworks();
        } else {
          console.log("위치 권한이 거부되었습니다.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      scanWifiNetworks();
    }
  };

  const scanWifiNetworks = async () => {
    try {
      const networks = await WifiManager.loadWifiList();
      const filteredNetworks = networks.filter(network => network.SSID.startsWith('IEQ'));
      setWifiList(filteredNetworks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    scanWifiNetworks();
  };

  const handleWifiSelect = (wifi) => {
    setSelectedWifi(wifi);
    setModalVisible(true);
  };

  const handleConnect = async () => {
    try {
      await WifiManager.connectToProtectedSSID(
        selectedWifi.SSID,
        password,
        false,
        false
      );
      console.log('연결된 Wi-Fi:', selectedWifi.SSID, '비밀번호:', password);
      Alert.alert("성공", "Wi-Fi에 성공적으로 연결되었습니다.", [
        { text: "확인", onPress: () => setModalVisible(false) }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("실패", "Wi-Fi 연결에 실패했습니다. 비밀번호를 확인하고 다시 시도하세요.");
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.wifiItem} onPress={() => handleWifiSelect(item)}>
      <Text style={styles.wifiName}>{item.SSID}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>01</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonActive}>
          <Text style={styles.stepTextActive}>02</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>03</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>휴대폰과 IEQ 연결</Text>
        <Text style={styles.subtitle}>
          Wi-Fi 네트워크 목록에서 IEQ(01)를 선택해 주세요.{'\n'}
          IEQ의 AP는 'IEQ'로 시작합니다
        </Text>
      </View>
      <View style={styles.wifiSelection}>
        <View style={styles.refreshContainer}>
          <Text style={styles.subTitle}>연결 가능한 디바이스</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
            <Ionicons name="refresh" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {wifiList.length === 0 ? (
          <Text style={styles.noWifiText}>검색된 디바이스가 없습니다</Text>
        ) : (
          <FlatList
            data={wifiList}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.SSID}-${index}`}
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
            {/* <Text style={styles.modalTitle}>Wi-Fi 비밀번호를 입력해 주세요.</Text>
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
            </View> */}
            {selectedWifi && (
              <DeviceRegistration 
                serialNumber={selectedWifi.SSID}
                onSuccess={(serialNumber) => navigation.navigate('FourthStep', { serialNumber })}
              />
            )}
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
    alignItems: 'center',
    marginVertical: getResponsiveMargin(20),
  },
  stepButtonActive: {
    width: isTablet ? getResponsiveWidth(6) : getResponsiveWidth(12),
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(9),
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
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(9),
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
    width: isTablet ? getResponsiveWidth(70) : getResponsiveWidth(90), // 80% 너비 설정
    padding: getResponsivePadding(10),
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  
});

export default ThirdStep;
