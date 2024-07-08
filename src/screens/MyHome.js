import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions, Image, useWindowDimensions } from 'react-native';
import MainProfile from '../components/MainProfile.js';
import ExternalEnvironment from '../components/ExternalEnvironment.js';
import WarningAlarm from '../components/WarningAlarm.js';
import { renderItem } from '../components/DailyMood.js';
import DeviceAirQuality from '../components/DeviceAirQuality.js';
import MoodLightStatus from '../components/MoodLightStatus.js';
import AirQualityItem from '../components/AirQualityItem.js';
import Swiper from 'react-native-swiper';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveImageSize, 
  getResponsiveWidth, 
  getResponsiveHeight,
  getResponsiveTopPosition
} from '../utils/utils.js';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const MyHome = ({ navigation, moodItems, setMoodItems }) => {
  const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();
  const [aqi, setAqi] = useState(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false); // 기기 등록 여부 상태

  const handleDataFetched = (data) => {
    const aqiData = data.find(item => item.label === 'AQI');
    setAqi(aqiData ? aqiData.value : null);
  };

  const handleSetRating = (id, rating) => {
    const updatedMoodItems = moodItems.map(item => {
      if (item.id === id) {
        return { ...item, rating };
      }
      return item;
    });
    setMoodItems(updatedMoodItems);
  };

  const handleRegisterPress = () => {
    // 여기에 기기 등록 페이지로 이동하는 로직 추가
    setIsDeviceRegistered(true);
    navigation.navigate('DeviceRegistration');
  };

  if (!isDeviceRegistered) {
    // 기기가 등록되지 않은 경우
    return (
      <View style={styles.container}>
        <MainProfile navigation={navigation} />
        <ExternalEnvironment />
        <View style={styles.registerContainer}>
          <View style={styles.registerTop}>
            <Text style={styles.registerTitle}>등록해야 할 IEQ 기기가 있어요!</Text>
            <Text style={styles.registerSubtitle}>지금 바로 IEQ를 등록하고</Text>
            <Text style={styles.registerSubtitle}>나에게 최적인 환경을 제공받아보세요!</Text>
          </View>
          <View style={styles.img}>
            <Image source={require('../assets/images/addDevice.png')} style={styles.deviceImage} />
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.registerButtonText}>IEQ 등록 시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedTop}>
        <MainProfile navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ExternalEnvironment />
        <WarningAlarm />
        <View>
          <Text style={styles.title}>오늘 하루, 어떠신가요?</Text>
          <Swiper style={styles.wrapper} loop={false} showsPagination={false} index={0} autoplay={false} height={viewportHeight * 0.07}>
            {moodItems.map(item => renderItem(item, handleSetRating, navigation))}
          </Swiper>
        </View>
        <AirQualityItem onDataFetched={handleDataFetched} />
        <DeviceAirQuality navigation={navigation} aqi={aqi} />
        <Text style={styles.subtitle}>무드등 상태</Text>
        <TouchableOpacity style={styles.width}  onPress={() => navigation.navigate('MoodLightDetails', { deviceName: '보티 연구소' })}>
          <MoodLightStatus deviceName="보티 연구소" initialStatus={false} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
  },
  fixedTop: {
    zIndex: 1,
    paddingBottom: getResponsivePadding(10),
  },
  scrollContainer: {
    paddingBottom: getResponsivePadding(20),
  },
  title: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    paddingVertical: getResponsivePadding(10),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginTop: getResponsiveMargin(10),
    color: '#000',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
  },
  registerTop: {
  },
  registerTitle: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    textAlign: 'center',
    color: '#000',
  },
  registerSubtitle: {
    fontSize: getResponsiveFontSize(16),
    textAlign: 'center',
    color: '#000',
  },
  img: {
  },
  deviceImage: {
    width: isTablet ? getResponsiveWidth(60) : getResponsiveWidth(80),
    height:  isTablet ? getResponsiveHeight(20) : getResponsiveHeight(30),
    marginBottom: getResponsiveMargin(20),
  },
  registerButton: {
    width: '90%', // 90% 너비 설정
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: getResponsiveFontSize(18),
    color: 'white',
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(20),
    textAlign: 'center',
  },
});

export default MyHome;
