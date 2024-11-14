import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import DeviceSelector from '../components/DeviceSelector';
import AnalysisDetail from '../components/AnalysisDetail';
import AllTab from '../components/AllTab';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const Tab = createMaterialTopTabNavigator();

const statusRanges = {
  Temp: { good: [18, 24], average: [24, 28], bad: [28, 35] },
  Humi: { good: [30, 60], average: [60, 70], bad: [70, 100] },
  eCO2: { good: [400, 800], average: [800, 1000], bad: [1000, 5000] },
  TVOC: { good: [0, 220], average: [220, 660], bad: [660, 2200] },
  Illuminace: { good: [300, 500], average: [500, 1000], bad: [1000, 10000] },
  Noise: { good: [30, 40], average: [40, 55], bad: [55, 100] },
  AQI: { good: [0, 5], average: [6, 10], bad: [11, 100] },
};

const getStatusColor = (value, key) => {
  const ranges = statusRanges[key];
  if (!ranges) return '#ccc';
  if (value >= ranges.good[0] && value <= ranges.good[1]) return '#3D84FF';
  if (value >= ranges.average[0] && value <= ranges.average[1]) return '#F4C950';
  return '#E64A53';
};

const AiAnalysisPage = ({ route }) => {
  const [data, setData] = useState([]);
  const { serialNumber } = route.params;

  useEffect(() => {
    fetchData();
  }, [serialNumber]);

  const fetchData = async () => {
    try {
      const requestData = {
        UserId: serialNumber,
        AppReq: 'AQI, TVOC, eCO2, Temp, Humi, Illuminace, Noise',
        AppReq2: '12',
      };

      console.log('Request Data:', requestData);

      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasToSN', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const responseData = response.data.newDevices;
        const parsedData = responseData.map((device) => ({
          key: device.chName,
          value: parseFloat(device.pvData),
          difference: parseFloat(device.pvData) - parseFloat(device.svData),
          yesterdayValue: parseFloat(device.svData),
          color: getStatusColor(parseFloat(device.pvData), device.chName),
        }));
        console.log('Parsed Current Data:', parsedData);
        
        // 정렬 순서를 정의합니다
        const order = ['Temp', 'Humi', 'eCO2', 'Noise', 'Illuminace', 'AQI', 'TVOC'];
        const sortedData = parsedData.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

        setData(sortedData);
      } else {
        Alert.alert('Error', 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Network Error', 'Failed to fetch data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <DeviceSelector />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen name="All" component={AllTab} initialParams={{ data, serialNumber }} />
        {data.map((item) => (
          <Tab.Screen
            key={item.key}
            name={item.key}
            component={AnalysisTabScreen}
            initialParams={{ data: [item], serialNumber }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const AnalysisTabScreen = ({ route }) => {
  const { data, serialNumber } = route.params;

  console.log('Rendering tab:', route.name);
  console.log('Data to display:', data);

  return (
    <ScrollView style={styles.scorerWrap}>
      {data.map((item, index) => (
        <AnalysisDetail key={index} item={item} serialNumber={serialNumber} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  selector: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(10),
  },
  scorerWrap: {
    padding: getResponsivePadding(10),
    height: '100%',
  },
  tabBar: {
    backgroundColor: '#fff',
    marginBottom: getResponsiveMargin(8),
  },
  tabBarLabel: {
    color: '#000',
    fontSize: getResponsiveFontSize(9),
    margin: 0,
    padding: 0,
  },
});

export default AiAnalysisPage;
