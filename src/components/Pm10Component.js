import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const Pm10Component = () => {
  const [pm10, setPm10] = useState(null);

  useEffect(() => {
    fetchPM10();
  }, []);

  const fetchPM10 = async () => {
    try {
      const response = await axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          numOfRows: 1,
          pageNo: 1,
          sidoName: '세종', // 필요한 지역으로 변경하세요
          ver: '1.0',
          dataType: 'XML'
        }
      });

      console.log('PM10 Response:', response.data); // 응답 데이터 확인

      const parser = new XMLParser();
      const result = parser.parse(response.data);
      console.log('Parsed PM10 Data:', result); // 파싱된 데이터 확인

      if (result.response && result.response.body && result.response.body.items) {
        const items = result.response.body.items.item;
        const pm10Data = items.pm10Value; // 데이터를 적절히 확인하세요
        setPm10(pm10Data || '정보 없음');
      } else {
        console.error('Unexpected PM10 response format:', result);
      }
    } catch (error) {
      console.error('Error fetching PM10:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>미세먼지</Text>
      <Text style={styles.value}>{pm10 ? `${pm10}µg/m³` : '정보 없음'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsivePadding(10),
  },
  label: {
    fontSize: getResponsiveFontSize(14),
    color: '#333',
  },
  value: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Pm10Component;
