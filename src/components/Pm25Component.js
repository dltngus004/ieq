import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Pm25Component = () => {
  const [pm25, setPm25] = useState(null);

  useEffect(() => {
    fetchPM25();
  }, []);

  const fetchPM25 = async () => {
    try {
      const response = await axios.get('http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          numOfRows: 10,
          pageNo: 1,
          sidoName: '세종', // Use the city from the location response
          ver: 1.0,
          dataType: 'JSON'
        }
      });

      const items = response.data.response.body.items;
      const pm25Data = items.find(item => item.pm25Value !== undefined);
      setPm25(pm25Data?.pm25Value || '정보 없음');
    } catch (error) {
      console.error('Error fetching PM2.5:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>초미세먼지</Text>
      <Text style={styles.value}>{pm25 ? `${pm25}µg/m³` : '정보 없음'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Pm25Component;
