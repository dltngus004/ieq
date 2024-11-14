import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/utils.js';

const AirQualityComponent = () => {
  const [airQuality, setAirQuality] = useState(null);
  const [airQualityStatus, setAirQualityStatus] = useState(null);
  const [pm10Status, setPm10Status] = useState(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchAirQuality();
  }, []);

  const fetchAirQuality = async () => {
    try {
      const response = await axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==', // Replace with your Air Quality service key
          numOfRows: 1,
          pageNo: 1,
          sidoName: '세종', // Use the city from the location response
          ver: 1.0,
          dataType: 'XML'
        }
      });

      console.log('Air Quality Response:', response.data); // 응답 데이터 확인

      const parser = new XMLParser();
      const result = parser.parse(response.data);
      console.log('Parsed Air Quality Data:', result); // 파싱된 데이터 확인

      if (result.response && result.response.body && result.response.body.items) {
        const airQualityData = result.response.body.items.item;
        console.log('Air Quality Data:', airQualityData); // 미세먼지 데이터 확인

        const pm10Value = parseInt(airQualityData.pm10Value, 10);
        setAirQuality(pm10Value);
        setAirQualityStatus(getPm10Status(pm10Value)); // 공기질 상태를 미세먼지 상태와 동일하게 설정
        setPm10Status(getPm10Status(pm10Value));
      } else {
        // console.error('Unexpected air quality response format:', result);
      }
    } catch (error) {
      // console.error('Error fetching air quality:', error);
    }
  };

  const getPm10Status = (pm10Value) => {
    if (pm10Value <= 30) return '좋음';
    if (pm10Value <= 80) return '보통';
    if (pm10Value <= 150) return '나쁨';
    return '매우 나쁨';
  };

  return (
    <View style={styles.container}>
      {/* <Text>공기질: {airQuality !== null ? `${airQuality}µg/m³` : '정보 없음'}</Text> */}
      <Text style={styles.item}>
        공기질{' '}
        {airQualityStatus === '좋음' ? (
          <Text style={styles.good}>좋음</Text>
        ) : airQualityStatus === '보통' ? (
          <Text style={styles.moderate}>보통</Text>
        ) : airQualityStatus === '나쁨' ? (
          <Text style={styles.poor}>나쁨</Text>
        ) : airQualityStatus === '매우 나쁨' ? (
          <Text style={styles.veryPoor}>매우 나쁨</Text>
        ) : (
          '정보 없음'
        )}
      </Text>
      <Text style={styles.item}>
        미세먼지{' '}
        {pm10Status === '좋음' ? (
          <Text style={styles.good}>좋음</Text>
        ) : pm10Status === '보통' ? (
          <Text style={styles.moderate}>보통</Text>
        ) : pm10Status === '나쁨' ? (
          <Text style={styles.poor}>나쁨</Text>
        ) : pm10Status === '매우 나쁨' ? (
          <Text style={styles.veryPoor}>매우 나쁨</Text>
        ) : (
          '정보 없음'
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getResponsivePadding(10),
  },
  item: {
    fontSize: getResponsiveFontSize(16),
    color: '#A6A6A6'
  },
  good: {
    color: '#3D84FF',
    fontSize: getResponsiveFontSize(16)
  },
  moderate: {
    color: 'orange',
    fontSize: getResponsiveFontSize(16)
  },
  poor: {
    color: '#E64A53',
    fontSize: getResponsiveFontSize(16)
  },
  veryPoor: {
    color: 'darkred',
    fontSize: getResponsiveFontSize(16)
  },
  unknown: {
    color: 'gray',
    fontSize: getResponsiveFontSize(16)
  },
});

export default AirQualityComponent;
