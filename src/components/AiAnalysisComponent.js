import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-shape';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize } from '../utils/utils';

const { width, screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const size = width * 0.5;

const createPieChart = (data, radius, innerRadius) => {
  const pie = d3.pie().value(d => d.rawValue)(data);
  const arc = d3.arc().outerRadius(radius).innerRadius(innerRadius);

  return pie.map((slice, index) => (
    <G key={index}>
      <Path d={arc(slice)} fill={slice.data.color} />
      <SvgText
        x={(arc.centroid(slice)[0] * 2)}
        y={(arc.centroid(slice)[1] * 2)}
        fill="#000"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={getResponsiveFontSize(8)}
        fontWeight="bold"
      >
        {slice.data.label}
      </SvgText>
      <SvgText
        x={(arc.centroid(slice)[0] * 2)}
        y={(arc.centroid(slice)[1] * 2) + 10}
        fill="#000"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={getResponsiveFontSize(8)}
        fontWeight="bold"
      >
        {slice.data.value}
      </SvgText>
    </G>
  ));
};

const calculateScore = (chName, value) => {
  let score = 0;
  switch (chName) {
    case 'Temp':
      if (value >= 20 && value <= 25) score = 100;
      else if (value < 20) score = (value / 20) * 100;
      else if (value > 25) score = ((30 - value) / 5) * 100;
      break;
    case 'Humi':
      if (value >= 30 && value <= 60) score = 100;
      else if (value < 30) score = (value / 30) * 100;
      else if (value > 60) score = ((70 - value) / 10) * 100;
      break;
    case 'eCO2':
      score = (800 - value) / 800 * 100;
      break;
    case 'TVOC':
      score = (300 - value) / 300 * 100;
      break;
    case 'Illuminace':
      if (value >= 100 && value <= 1000) score = 100;
      else if (value < 100) score = (value / 100) * 100;
      else if (value > 1000) score = ((1100 - value) / 100) * 100;
      break;
    case 'Noise':
      score = (50 - value) / 50 * 100;
      break;
    case 'AQI':
      score = (5 - value) / 5 * 100;
      break;
    default:
      score = 0;
  }
  return Math.max(0, Math.min(score, 100)); // Ensure score is between 0 and 100
};

const AiAnalysisComponent = ({ serialNumber }) => {
  const [data, setData] = useState([]);
  const [recommendation, setRecommendation] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const navigation = useNavigation();
  const outerRadius = size / 2;
  const innerRadius = size / 3;

  useEffect(() => {
    console.log('Serial Number:', serialNumber);
    fetchData();
  }, [serialNumber]);

  const fetchData = async () => {
    try {
      const requestData = {
        UserId: serialNumber,
        AppReq: 'AQI, TVOC, eCO2, Temp, Humi, Illuminace, Noise',
      };

      console.log('Request Data:', requestData);

      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasToSN', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);

      if (response.status === 200) {
        const responseData = response.data.newDevices;
        const parsedData = responseData.map((device) => ({
          label: device.chName,
          rawValue: parseFloat(device.pvData),
          value: `${parseFloat(device.pvData)}${getUnit(device.chName)}`,
          color: getColor(device.chName),
          score: calculateScore(device.chName, parseFloat(device.pvData))
        }));

        const top3Data = parsedData.sort((a, b) => b.score - a.score).slice(0, 3);
        setData(top3Data);

        const deviceName = responseData.length > 0 ? responseData[0].deviceName || 'Unknown Device' : 'Unknown Device';
        console.log('Device Name:', deviceName);
        setDeviceName(deviceName);

        console.log('Serial Number from response:', response.data.serialNumber);

        fetchRecommendation(serialNumber);
      } else {
        Alert.alert('Error', 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Network Error', 'Failed to fetch data');
    }
  };

  const fetchRecommendation = async (serialNumber) => {
    try {
      const recommendationResponse = await axios.post('http://3.85.7.146:80/IEQ_recommend', {
        serial_no: serialNumber,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Recommendation Response Status:', recommendationResponse.status);
      console.log('Recommendation Response Data:', recommendationResponse.data);

      if (recommendationResponse.status === 200) {
        setRecommendation(recommendationResponse.data.message);
      } else {
        setRecommendation('추천 메시지를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation('네트워크 오류로 추천 메시지를 가져오지 못했습니다.');
    }
  };

  const getUnit = (chName) => {
    switch (chName) {
      case 'Temp':
        return '°C';
      case 'Humi':
        return '%';
      case 'eCO2':
        return 'ppm';
      case 'TVOC':
        return 'ppb';
      case 'Illuminace':
        return 'lux';
      case 'Noise':
        return 'dB';
      case 'AQI':
        return '';
      default:
        return '';
    }
  };

  const getColor = (chName) => {
    switch (chName) {
      case 'Temp':
        return '#6DC1DB';
      case 'Humi':
        return '#6697b1';
      case 'eCO2':
        return '#385F94';
      case 'TVOC':
        return '#3b72bd';
      case 'Illuminace':
        return '#00CFFF';
      case 'Noise':
        return '#233f65';
      case 'AQI':
        return '#172e4f';
      default:
        return '#ccc';
    }
  };

  const totalValue = data.length > 0 ? Math.round(data.reduce((acc, item) => acc + item.score, 0) / data.length) : 0;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AiAnalysisPage', { serialNumber })}>
      <View style={styles.w_100}>
        <Text style={styles.aiAnalysisTitle}>나의 AI 분석하기</Text>
        <View style={styles.aiAnalysisContainer}>
          <Svg width={size} height={size}>
            <G x={outerRadius} y={outerRadius}>
              {createPieChart(data, outerRadius, innerRadius)}
              
              <SvgText
                x="-10"
                y="10"
                textAnchor="middle"
                fontSize={getResponsiveFontSize(40)}
                fontWeight="bold"
                fill="#165bdd"
              >
                {totalValue}점
              </SvgText>
            </G>
          </Svg>
          <View style={styles.legendContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>{item.label}: {item.value} ({Math.round(item.score)}점)</Text>
              </View>
            ))}
          </View>
          <View style={styles.aiComment}>
            <View style={styles.aiTitle}>
              <Icon name="logo-ionitron" size={getResponsiveIconSize(35)} style={styles.icon} />
              <Text style={styles.iconText}>AI 매니저</Text>
            </View>
            <Text style={styles.infoText}>
              {recommendation}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  aiAnalysisContainer: {
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: getResponsiveMargin(20),
    alignItems: 'center',
  },
  w_100: {
    width: '100%',
  },
  aiAnalysisTitle: {
    fontSize: getResponsiveFontSize(16),
    marginBottom: getResponsiveMargin(10),
    textAlign: 'left',
    color: '#000',
    fontWeight: '600',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: getResponsiveMargin(10),
    paddingHorizontal: getResponsivePadding(20),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: getResponsiveMargin(10),
    marginBottom: getResponsiveMargin(5),
  },
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  legendText: {
    fontSize: getResponsiveFontSize(12),
    color: '#000',
  },
  aiComment: {
    flexDirection: 'row',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getResponsivePadding(20),
    flexWrap: 'wrap',
  },
  aiTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: getResponsivePadding(20),
  },
  icon: {
    textAlign: 'center',
    color: '#ddd',
  },
  iconText: {
    fontSize: getResponsiveFontSize(12),
    textAlign: 'center',
    color: '#000',
  },
  infoText: {
    fontSize: getResponsiveFontSize(14),
    color: '#000',
    textAlign: 'left',
    backgroundColor: '#eaeef3',
    padding: getResponsivePadding(20),
    borderRadius: 10,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default AiAnalysisComponent;
