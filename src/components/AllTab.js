import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import Svg, { G, Rect, Text as SvgText, Line } from 'react-native-svg';
import axios from 'axios';
import * as d3 from 'd3-scale';
import * as d3Array from 'd3-array';
import { getResponsivePadding, getResponsiveFontSize, getResponsiveMargin } from '../utils/utils';
import ProgressBar from '../components/ProgressBar';

const statusRanges = {
  Temp: { good: [20, 24], average: [24, 28], bad: [28, 35], adequate: [18, 20] },
  Humi: { good: [30, 60], average: [60, 70], bad: [70, 100], adequate: [25, 30] },
  eCO2: { good: [400, 800], average: [800, 1000], bad: [1000, 5000], adequate: [300, 400] },
  TVOC: { good: [0, 220], average: [220, 660], bad: [660, 2200], adequate: [0, 100] },
  Illuminace: { good: [300, 500], average: [500, 1000], bad: [1000, 10000], adequate: [200, 300] },
  Noise: { good: [30, 40], average: [40, 55], bad: [55, 100], adequate: [20, 30] },
  AQI: { good: [0, 2], average: [3, 4], bad: [4, 5], adequate: [2, 3] },
};

const getStatusColor = (value, key) => {
  const ranges = statusRanges[key];
  if (!ranges) return '#8996B7';
  if (value >= ranges.good[0] && value <= ranges.good[1]) return '#3D84FF';
  if (value >= ranges.adequate[0] && value <= ranges.adequate[1]) return '#45C478';
  if (value >= ranges.average[0] && value <= ranges.average[1]) return '#F4C950';
  return '#E64A53';
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

const calculateScore = (chName, value) => {
  let score = 0;
  switch (chName) {
    case 'Temp':
      if (value >= 50 && value <= 54) score = 20;
      else if (value < 40) score = (value / 40) * 20;
      else if (value > 44) score = ((48 - value) / 4) * 20;
      break;
    case 'Humi':
      if (value >= 30 && value <= 60) score = 80;
      else if (value < 30) score = (value / 30) * 80;
      else if (value > 60) score = ((70 - value) / 10) * 80;
      break;
    case 'eCO2':
      if (value <= 800) score = 60;
      else if (value <= 1000) score = ((1000 - value) / 200) * 60;
      else score = ((5000 - value) / 4000) * 60;
      break;
    case 'TVOC':
      if (value <= 220) score = 50;
      else if (value <= 660) score = ((660 - value) / 440) * 50;
      else score = ((2200 - value) / 1540) * 50;
      break;
    case 'Illuminace':
      if (value >= 300 && value <= 500) score = 40;
      else if (value < 300) score = (value / 300) * 40;
      else if (value > 500) score = ((1000 - value) / 500) * 40;
      break;
    case 'Noise':
      if (value <= 40) score = 70;
      else if (value <= 55) score = ((55 - value) / 15) * 70;
      else score = ((100 - value) / 45) * 70;
      break;
    case 'AQI':
      if (value <= 2) score = 90;
      else if (value <= 3) score = ((3 - value) / 1) * 90;
      else score = ((5 - value) / 2) * 90;
      break;
    default:
      score = 0;
  }
  return Math.max(0, Math.min(score, 100)); // Ensure score is between 0 and 100
};

const AllTab = ({ route }) => {
  const { data, serialNumber } = route.params;
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
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

      if (response.status === 200) {
        const responseData = response.data.newDevices;
        const parsedData = responseData.map((device) => ({
          key: device.chName,
          value: parseFloat(device.pvData),
          score: calculateScore(device.chName, parseFloat(device.pvData)),
          color: getStatusColor(parseFloat(device.pvData), device.chName),
        }));

        // 정렬 순서를 정의합니다
        const order = ['Temp', 'Humi', 'eCO2', 'Noise', 'Illuminace', 'AQI', 'TVOC'];
        const sortedData = parsedData.sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key));

        setHistoricalData(sortedData);
      } else {
        Alert.alert('Error', 'Failed to fetch historical data');
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
      Alert.alert('Network Error', 'Failed to fetch historical data');
    }
  };

  const renderBarChart = () => {
    const width = Dimensions.get('window').width - 70; // padding을 고려한 너비
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 30 };

    const x = d3.scaleBand()
      .domain(historicalData.map(d => d.key))
      .range([margin.left, width - margin.right])
      .padding(0.4); // 막대의 굵기를 줄이기 위해 패딩을 조정

    const y = d3.scaleLinear()
      .domain([0, 100])
      .nice()
      .range([height - margin.bottom, margin.top]);

    return (
      <Svg width={width} height={height}>
        <G>
          {y.ticks(5).map((tick, i) => (
            <G key={i} transform={`translate(0, ${y(tick)})`}>
              <Line x1={margin.left} x2={width - margin.right} stroke="#e0e0e0" />
              <SvgText x={margin.left - 10} fontSize={10} fill="#000" textAnchor="end" dy="0.32em">
                {tick}
              </SvgText>
            </G>
          ))}
        </G>
        <G>
          {historicalData.map((d, i) => (
            <Rect
              key={i}
              x={x(d.key)}
              y={y(d.score)}
              width={x.bandwidth()}
              height={height - margin.bottom - y(d.score)}
              fill="#8996B7"
            />
          ))}
        </G>
        <G>
          {x.domain().map((d, i) => (
            <G key={i} transform={`translate(${x(d) + x.bandwidth() / 2}, 0)`}>
              <Line y1={margin.top} y2={height - margin.bottom} stroke="#e0e0e0" />
              <SvgText
                y={height - margin.bottom + 10}
                fontSize={10}
                fill="#000"
                textAnchor="middle"
              >
                {d}
              </SvgText>
            </G>
          ))}
        </G>
      </Svg>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.chartTitle}>점수 (전주 기준)</Text>
        <View style={styles.bgWhite}>
        {renderBarChart()}
        <View style={styles.progressContainer}>
          {historicalData.map((item, index) => (
            <View key={index} style={styles.progressWrapper}>
              <Text style={styles.progressLabel}>{item.key}</Text>
              <ProgressBar value={item.score} color={item.color} />
              <Text style={styles.progressScore}>{item.score.toFixed(1)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#E64A53' }]} />
            <Text style={styles.legendText}>나쁨 0~29</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F4C950' }]} />
            <Text style={styles.legendText}>보통 30~49</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#45C478' }]} />
            <Text style={styles.legendText}>적정 50~79</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3D84FF' }]} />
            <Text style={styles.legendText}>좋음 80~100</Text>
          </View>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getResponsivePadding(10),
    height: '100%',
  },
  chartTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500',
    color: '#000',
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(30),
    marginVertical: getResponsiveMargin(10),
    borderRadius: 5,
  },
  progressContainer: {
    marginTop: getResponsiveMargin(10),
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
  },
  progressLabel: {
    flex: 0.7,
    fontSize: getResponsiveFontSize(14),
    color: '#000',
  },
  progressScore: {
    fontSize: getResponsiveFontSize(14),
    color: '#000',
    marginLeft: getResponsiveMargin(10),
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
});

export default AllTab;
