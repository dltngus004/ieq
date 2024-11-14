import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LocationComponent = ({ onLocationUpdate = () => {} }) => {
  const [location, setLocation] = useState({ city: '', region: '', stationName: '' });

  useEffect(() => {
    fetchLocation();
  }, []);

  const cityMap = {
    'Daejeon': '대전',
    'Seoul': '서울',
    'Busan': '부산',
    'Incheon': '인천',
    'Daegu': '대구',
    'Gwangju': '광주',
    'Ulsan': '울산',
    'Sejong': '세종',
    // 필요한 다른 도시를 추가하세요
  };

  const fetchLocation = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json');
      const { city, region, loc } = response.data;
      const [latitude, longitude] = loc.split(',');

      const cityInKorean = cityMap[city] || city;  // 도시 이름을 한글로 변환, 맵에 없으면 원래 이름 사용

      setLocation({ city: cityInKorean, region });

      const stationResponse = await axios.get('http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          returnType: 'json',
          tmX: longitude,
          tmY: latitude,
          ver: '1.0',
        }
      });

      console.log('API Response:', stationResponse.data);

      const items = stationResponse.data.response?.body?.items;

      if (items && items.length > 0) {
        const stationName = items[0].stationName;
        setLocation((prevState) => ({ ...prevState, stationName }));
        onLocationUpdate({ city: cityInKorean, region, stationName });
      } else {
        throw new Error('No station found for the given coordinates.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      Alert.alert('Error fetching location or station:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{location.city} {location.region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  city: {
    fontSize: 18,
    color: '#000'
  }
});

export default LocationComponent;
