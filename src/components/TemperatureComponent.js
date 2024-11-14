import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/utils.js';

const TemperatureComponent = ({ onTemperatureUpdate }) => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    fetchTemperature();
  }, []);

  const fetchTemperature = async () => {
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

      if (response.data.response && response.data.response.body && response.data.response.body.items) {
        const temperatureData = response.data.response.body.items.item.find(item => item.category === 'T1H');
        setTemperature(temperatureData.obsrValue);
        onTemperatureUpdate(temperatureData.obsrValue);
      } else {
        // console.error('Unexpected temperature response format:', response.data);
      }
    } catch (error) {
      // console.error('Error fetching temperature:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{temperature ? `${temperature}º` : '정보 없음'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: getResponsivePadding(10),
  },
  temperature: {
    fontSize: getResponsiveFontSize(55),
    fontWeight: 'bold',
    color: '#000',
  }
});

export default TemperatureComponent;
