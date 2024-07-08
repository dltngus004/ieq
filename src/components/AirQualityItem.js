import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const AirQualityItem = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const requestData = {
          UserId: 'IEQAAAB101TEST240426',
          AppReq: 'AQI, TVOC, eCO2, Temp, Humi, Illuminace, Noise'
        };

        const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasToSN', requestData);

        if (response.status === 200) {
          const responseData = response.data;

          const newData = responseData.newDevices.map(device => {
            const rawValue = parseFloat(device.dataType === 'I' ? device.pvData : device.svData);
            const value = rawValue % 1 === 0 ? rawValue.toString() : rawValue.toFixed(1);
            return {
              label: device.chName,
              value: `${value}${getUnit(device.chName)}`,
              icon: getIconName(device.chName),
            };
          });

          if (isMounted) {
            onDataFetched(newData);
          }
        } else {
          Alert.alert('Error', 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Network Error', 'Failed to fetch data');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [onDataFetched]);

  const getIconName = (chName) => {
    switch (chName) {
      case 'Temp': return 'thermostat';
      case 'Humi': return 'water-drop';
      case 'eCO2': return 'air';
      case 'TVOC': return 'waves';
      case 'Illuminace': return 'wb-sunny';
      case 'Noise': return 'volume-up';
      case 'AQI': return 'bar-chart';
      default: return 'info';
    }
  };

  const getUnit = (chName) => {
    switch (chName) {
      case 'Temp': return '°C';
      case 'Humi': return '%';
      case 'eCO2': return 'ppm';
      case 'TVOC': return 'ppb';
      case 'Illuminace': return 'lux';
      case 'Noise': return 'dB';
      case 'AQI': return ''; // AQI는 일반적으로 단위 없이 지수로 표시
      default: return '';
    }
  };

  if (loading) { 
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AirQualityItem;
