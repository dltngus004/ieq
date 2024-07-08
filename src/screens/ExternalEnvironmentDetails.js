import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocationComponent from '../components/LocationComponent';
import TemperatureComponent from '../components/TemperatureComponent';
import HumidityComponent from '../components/HumidityComponent';
import PrecipitationComponent from '../components/PrecipitationComponent';
import Pm10Component from '../components/Pm10Component';
import Pm25Component from '../components/Pm25Component';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveIconSize, 
  getResponsiveHeight
} from '../utils/utils.js';

const ExternalEnvironmentDetails = () => {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [statusMessage, setStatusMessage] = useState('대체로 화창 신선한 공기입니다.');
  const [weatherIcon, setWeatherIcon] = useState('sunny-outline');
  const [iconColor, setIconColor] = useState('#FFA500');

  const handleLocationUpdate = (locationData) => {
    setLocation(locationData);
  };

  const updateWeatherIconAndMessage = () => {
    if (precipitation > 0) {
      setWeatherIcon('rainy-outline');
      setStatusMessage('비가 오고 있습니다.');
      setIconColor('#ddd');
    } else if (humidity > 80) {
      setWeatherIcon('water-outline');
      setStatusMessage('습도가 높습니다.');
      setIconColor('#3D84FF'); // 습도 높을 때 색상 설정
    } else if (temperature > 30) {
      setWeatherIcon('sunny-outline');
      setStatusMessage('더운 날씨입니다.');
      setIconColor('#FFA500'); // 더운 날씨 색상 설정
    } else if (temperature < 0) {
      setWeatherIcon('snow-outline');
      setStatusMessage('추운 날씨입니다.');
      setIconColor('#00BFFF'); // 추운 날씨 색상 설정
    } else if (humidity > 50) {
      setWeatherIcon('cloud-outline');
      setStatusMessage('구름이 많습니다.');
      setIconColor('#ddd'); // 구름 많을 때 색상 설정
    } else {
      setWeatherIcon('partly-sunny-outline');
      setStatusMessage('대체로 화창 신선한 공기입니다.');
      setIconColor('#FFA500'); // 기본 색상
    }
  };

  useEffect(() => {
    if (temperature !== null && precipitation !== null && humidity !== null) {
      updateWeatherIconAndMessage();
    }
  }, [temperature, precipitation, humidity]);

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.bcWhite}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.date}>{getCurrentDate()}</Text>
        </View>
        {/* Main Info Section */}
        <View style={styles.mainInfoWrap}>
          <View style={styles.mainInfo}>
            <LocationComponent onLocationUpdate={handleLocationUpdate} />
            <TemperatureComponent onTemperatureUpdate={setTemperature} />
          </View>
          <View style={styles.mainInfo}>
            <Ionicons name={weatherIcon} style={[styles.weatherIcon, { color: iconColor }]} />
            <Text style={styles.statusMessage}>{statusMessage}</Text>
          </View>
        </View>

        {/* Sub Info Section */}
        <View style={styles.subInfo}>
          <View style={styles.infoBox}>
            <Ionicons name="water-outline" style={[styles.infoIcon, styles.Humidity]} />
            <HumidityComponent onHumidityUpdate={setHumidity} />
          </View>
          <View style={styles.infoBox}>
            <Ionicons name="cloud-outline" style={[styles.infoIcon, styles.Pm10]} />
            <Pm10Component location={location} />
          </View>
          {/* <View style={styles.infoBox}>
            <Ionicons name="cloudy-outline" style={[styles.infoIcon, styles.Pm25]} />
            <Pm25Component location={location} />
          </View> */}
          <View style={styles.infoBox}>
            <Ionicons name="rainy-outline" style={[styles.infoIcon, styles.Precipitation]} />
            <PrecipitationComponent onPrecipitationUpdate={setPrecipitation} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: getResponsivePadding(30),
    backgroundColor: '#F2F4F8',
  },
  bcWhite: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsivePadding(50),
    backgroundColor: '#fff',
    borderRadius: 10,
    height: '100%'
  },
  header: {
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  date: {
    fontSize: getResponsiveFontSize(20),
    color: '#333',
  },
  location: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainInfoWrap: {
    alignItems: 'center',
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: getResponsiveMargin(40),
  },
  temperature: {
    fontSize: getResponsiveFontSize(48),
    fontWeight: 'bold',
    color: '#333',
  },
  weatherIcon: {
    fontSize: getResponsiveIconSize(170),
    marginVertical: getResponsiveMargin(10),
  },
  statusMessage: {
    fontSize: getResponsiveFontSize(16),
    color: '#333',
  },
  subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    fontSize: getResponsiveIconSize(50),
    color: '#fff',
    marginBottom: getResponsiveMargin(10),
    backgroundColor: '#ddd',
    borderRadius: getResponsiveMargin(100),
    padding: getResponsivePadding(30),
  },
  Humidity: {
    backgroundColor: '#3D84FF',
  },
  Pm10: {
    backgroundColor: '#FFC000',
  },
  Pm25: {
    backgroundColor: '#E64A53',
  },
  Precipitation: {
    backgroundColor: '#ddd',
  },
  infoLabel: {
    fontSize: getResponsiveFontSize(14),
    color: '#333',
  },
  infoValue: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ExternalEnvironmentDetails;
