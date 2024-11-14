import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const AirQualityItem = ({ onDataFetched, serialNumber, fetchDataTrigger }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Received Serial Number:', serialNumber); // serialNumber 출력

    if (!serialNumber) {
      console.error('Serial number is not provided');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const requestData = {
          UserId: serialNumber,
          AppReq: 'AQI, TVOC, eCO2, Temp, Humi, Illuminace, Noise',
        };

        const url = `http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasToSN?timestamp=${new Date().getTime()}`;
        console.log('Fetching data with request:', requestData);

        const response = await axios.post(url, requestData);

        if (response.status === 200) {
          const responseData = response.data;
          console.log('Fetched data:', responseData);

          const newData = responseData.newDevices.map(device => {
            const rawValue = parseFloat(device.dataType === 'I' ? device.pvData : device.svData);
            const value = rawValue % 1 === 0 ? rawValue.toString() : rawValue.toFixed(1);
            return {
              label: device.chName,
              value: `${value}${getUnit(device.chName)}`,
              icon: getIconName(device.chName),
            };
          });

          setData(newData);
          if (onDataFetched) {
            onDataFetched(newData);
          }
        } else {
          Alert.alert('Error', 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Network Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serialNumber, fetchDataTrigger]); // fetchDataTrigger를 종속성 배열에 추가합니다.

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

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Text View style={styles.container} key={index}>{item.label}: {item.value}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 0,
    fontSize: 0,
  },
});

export default AirQualityItem;
