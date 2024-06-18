// src/components/ExternalApi.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ExternalApi = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipinfo.io');
        const { loc } = response.data;
        const [latitude, longitude] = loc.split(',');

        // 가장 가까운 측정소 이름 가져오기
        const stationName = await getNearbyStationName(latitude, longitude);
        if (stationName) {
          // 측정소의 실시간 대기오염 정보 가져오기
          const airQualityData = await getAirQualityData(stationName);
          setWeatherData(airQualityData);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const getNearbyStationName = async (latitude, longitude) => {
    try {
      const { data } = await axios.get('http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          returnType: 'json',
          tmX: longitude,
          tmY: latitude,
          ver: '1.0'
        }
      });

      const items = data.response.body.items;
      if (items && items.length > 0) {
        return items[0].stationName;
      }
    } catch (error) {
      console.error('Error fetching station name:', error);
      return null;
    }
  };

  const getAirQualityData = async (stationName) => {
    try {
      const { data } = await axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          returnType: 'json',
          numOfRows: '1',
          pageNo: '1',
          stationName,
          dataTerm: 'DAILY'
        }
      });

      const items = data.response.body.items;
      if (items && items.length > 0) {
        return items[0];
      }
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      return null;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>데이터를 불러오는 중 오류가 발생했습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>측정소: {weatherData.stationName}</Text>
      <Text>미세먼지(PM10): {weatherData.pm10Value}</Text>
      <Text>이산화질소(NO2): {weatherData.no2Value}</Text>
      <Text>오존(O3): {weatherData.o3Value}</Text>
      <Text>일산화탄소(CO): {weatherData.coValue}</Text>
      <Text>아황산가스(SO2): {weatherData.so2Value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ExternalApi;
