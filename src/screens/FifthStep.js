import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';
import { UserContext } from '../context/UserContext';
import AirQualityItem from '../components/AirQualityItem';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const FifthStep = ({ route, navigation }) => {
  const { nickname, serialNumber } = route.params; // FourthStep에서 전달된 닉네임과 시리얼 넘버 받기
  const { nickname: userNickname, setSerialNumber, devices, setDevices } = useContext(UserContext); // UserContext에서 필요한 상태 가져오기

  const [airQualityData, setAirQualityData] = useState([]);

  useEffect(() => {
    setSerialNumber(serialNumber);
    addDeviceNickname(nickname);
  }, [serialNumber, nickname, setSerialNumber]);

  const addDeviceNickname = (nickname) => {
    // 기기가 중복으로 추가되지 않도록 확인
    if (!devices.some(device => device.value === nickname)) {
      setDevices((prevDevices) => [...prevDevices, { label: nickname, value: nickname }]);
    }
  };

  const handleComplete = () => {
    console.log('설정된 닉네임:', nickname);
    console.log('시리얼 넘버:', serialNumber);
    navigation.navigate('MyHome', { nickname, serialNumber, airQualityData }); // MyHome으로 이동하면서 닉네임과 시리얼 넘버 전달
  };

  const handleDataFetched = (fetchedData) => {
    setAirQualityData(fetchedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.contentTit}>
          <Text style={styles.title}>{userNickname}님의 <Text style={[styles.title, styles.bold]}>{nickname}</Text> 등록 완료!</Text>
          <Text style={styles.subtitle}>이제 기기의 다양한 환경을 확인해보세요.</Text>
        </View>
        <Image source={require('../assets/images/device_img.png')} style={styles.deviceImage} />
        <View style={styles.contentInput}>
          <AirQualityItem serialNumber={serialNumber} onDataFetched={handleDataFetched} />
          <View style={styles.footer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleComplete}>
              <Text style={styles.continueButtonText}>완료</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('SecondStep')}>
              <Text style={styles.addButtonText}>기기추가등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    padding: getResponsivePadding(50),
    justifyContent: 'space-between',
    height: '80%',
  },
  contentTit: {
    width: '100%',
  },
  title: {
    fontSize: getResponsiveFontSize(25),
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    marginBottom: getResponsiveMargin(20),
  },
  contentInput: {
    width: '100%',
    alignItems: 'center',
  },
  deviceImage: {
    width: isTablet ? getResponsiveWidth(60) : getResponsiveWidth(80),
    height: isTablet ? getResponsiveHeight(20) : getResponsiveHeight(30),
    resizeMode: 'contain',
    marginVertical: getResponsiveMargin(20),
  },
  footer: {
    width: '100%',
    paddingTop: getResponsivePadding(20),
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1e90ff',
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(30),
    borderRadius: 4,
    marginBottom: getResponsiveMargin(10),
  },
  addButton: {
    borderColor: '#002060',
    borderWidth: 1,
    padding: getResponsivePadding(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#002060',
    fontSize: getResponsiveFontSize(16),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FifthStep;
