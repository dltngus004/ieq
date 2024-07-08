import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const HumidityComponent = ({ onHumidityUpdate }) => {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    fetchHumidity();
  }, []);

  const fetchHumidity = async () => {
    try {
      const today = new Date();
      const date = today.toISOString().split('T')[0].replace(/-/g, '');
      const hours = today.getHours();
      const time = (hours < 10 ? `0${hours}` : hours) + '00';

      const response = await axios.get('http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
        params: {
          serviceKey: 'JnDemC9xS5PAiPZiejb84X3fkK3BjoGnAPaR9A0s+GjLue9LWtO6yheTXkbxnAaEUv5e6YQEHABe8kNDj1xO1g==',
          numOfRows: 10,
          pageNo: 1,
          base_date: date,
          base_time: time,
          nx: 55,
          ny: 127,
          dataType: 'JSON'
        }
      });

      const items = response.data.response.body.items.item;
      const humidityData = items.find(item => item.category === 'REH');
      setHumidity(humidityData?.obsrValue || '정보 없음');
      onHumidityUpdate(humidityData?.obsrValue || 0);
    } catch (error) {
      console.error('Error fetching humidity:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>습도</Text>
      <Text style={styles.value}>{humidity ? `${humidity}%` : '정보 없음'}</Text>
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

export default HumidityComponent;
