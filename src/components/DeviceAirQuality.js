import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getStatusAndProgress } from '../utils/AirQualityUtils.js';
import AirQualityItem from '../components/AirQualityItem';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const DeviceAirQuality = ({ navigation, aqi }) => {
  const [temp, setTemp] = useState(null);
  const [humi, setHumi] = useState(null);
  const [tvoc, setTvoc] = useState(null);

  const handleDataFetched = (fetchedData) => {
    fetchedData.forEach(item => {
      switch(item.label) {
        case 'Temp':
          setTemp(parseFloat(item.value));
          break;
        case 'Humi':
          setHumi(parseFloat(item.value));
          break;
        case 'TVOC':
          setTvoc(parseFloat(item.value));
          break;
        default:
          break;
      }
    });
  };

  const { status, message } = getStatusAndProgress('AQI', aqi);
  const { status: tempStatus } = getStatusAndProgress('Temp', temp);
  const { status: humiStatus } = getStatusAndProgress('Humi', humi);
  const { status: tvocStatus } = getStatusAndProgress('TVOC', tvoc);

  const getImageSource = (status) => {
    switch (status) {
      case '좋음':
        return require('../assets/images/good.png');
      case '보통':
        return require('../assets/images/soso.png');
      case '나쁨':
        return require('../assets/images/bad.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <AirQualityItem onDataFetched={handleDataFetched} />
      <Text style={styles.deviceName}>보티 연구소</Text>
      <TouchableOpacity style={styles.touchableContainer} onPress={() => navigation.navigate('AirQualityDetails')}>
        <View style={styles.airQualityScore}>
          <View style={styles.airQualityScore}>
            {getImageSource(status) && (
              <Image source={getImageSource(status)} style={styles.statusImage} />
            )}
            <Text style={styles.airQualityScoreText}>{aqi !== null ? `${aqi}` : '데이터 없음'}</Text>
          </View>
          <View>
            <Text style={styles.airQualityText}>실내공기</Text>
            <Text style={styles.airQualityTextStatus}>{status !== null ? `${status}` : '데이터 없음'}</Text>
          </View>
        </View>
        <View style={styles.managementOptions}>
          <View style={styles.managementItem}>
            <View style={styles.BdItem}>
              <Icon name="thermostat" size={80} color="#FFFFFF" />
            </View>
            <Text style={styles.managementText}>{temp !== null ? `${temp}°C (${tempStatus})` : '데이터 없음'}</Text>
          </View>
          <View style={styles.managementItem}>
            <View style={styles.BdItem}>
              <Icon name="water-drop" size={80} color="#FFFFFF" />
            </View>
            <Text style={styles.managementText}>{humi !== null ? `${humi}% (${humiStatus})` : '데이터 없음'}</Text>
          </View>
          <View style={styles.managementItem}>
            <View style={styles.BdItem}>
              <Icon name="waves" size={80} color="#FFFFFF" />
            </View>
            <Text style={styles.managementText}>{tvoc !== null ? `${tvoc}ppb (${tvocStatus})` : '데이터 없음'}</Text>
          </View>
        </View>
        <Text style={styles.ventilationWarning}>{message}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deviceName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    color: '#000',
    marginVertical:  getResponsiveMargin(15),
  },
  touchableContainer: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(30),
    marginVertical: getResponsiveMargin(10),
    borderRadius: 5,
  },
  airQualityScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
    justifyContent: 'space-between',
  },
  statusImage: {
    width: isTablet ? getResponsiveWidth(10) : getResponsiveWidth(16),
    height: isTablet ? getResponsiveHeight(10) : getResponsiveHeight(12),
    marginRight: getResponsiveMargin(20),
  },
  airQualityText: {
    fontSize: getResponsiveFontSize(16),
    color: '#A6A6A6',
  },
  airQualityTextStatus: {
    fontSize: getResponsiveFontSize(20),
    color: '#000',
    textAlign: 'center', // 텍스트 정렬
    width: '100%', // 전체 너비 사용
  },
  airQualityScoreText: {
    fontSize: getResponsiveFontSize(50),
    color: '#FD9A57',
    fontWeight: 'bold',
  },
  managementOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: getResponsivePadding(20),
  },
  managementItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  BdItem: {
    backgroundColor: '#3F4771',
    width: isTablet ? getResponsiveWidth(18) : getResponsiveWidth(27),
    height: isTablet ? getResponsiveHeight(18) : getResponsiveHeight(20),
    borderRadius: getResponsiveWidth(60),
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
    justifyContent: 'center',
  },
  deviceDataText: {
    marginTop: getResponsiveMargin(5),
    fontSize: getResponsiveFontSize(16),
    color: '#000',
  },
  ventilationWarning: {
    marginTop: getResponsiveMargin(10),
    color: '#000',
    fontSize: getResponsiveFontSize(14),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    padding: getResponsivePadding(10),
  },
  icon: {
    width: getResponsiveWidth(20),
    height: getResponsiveWidth(20),
    marginBottom: getResponsiveMargin(5),
  },
  managementText: {
    marginTop: getResponsiveMargin(5),
    fontSize: getResponsiveFontSize(14),
    color: '#000',
  },
});



export default DeviceAirQuality;
