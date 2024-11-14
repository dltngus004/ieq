import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import Svg, { G, Rect, Text as SvgText, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3-scale';
import * as d3Array from 'd3-array';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const AirQualityStatusChart = ({ label, dataType, timeRange, serialNumber }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let requestData;
    let url;
    if (timeRange === 'hourly') {
      url = 'http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasAVGToSN';
      requestData = {
        UserId: serialNumber,
        AppReq: dataType,
        AppReq2: '12',
      };
    } else {
      url = 'http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastAVGOldDatasToSN';
      let appReq2;
      switch (timeRange) {
        case 'weekly':
          appReq2 = '168';
          break;
        case 'monthly':
          appReq2 = '720';
          break;
        default:
          appReq2 = '12';
      }
      requestData = {
        UserId: serialNumber,
        AppReq: dataType,
        AppReq2: appReq2,
      };
    }

    console.log('요청 데이터:', JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post(url, requestData);
      const data = response.data;

      console.log('응답 데이터:', JSON.stringify(data, null, 2));

      const { newDevices } = data;
      if (newDevices && newDevices[dataType]) {
        const now = new Date();
        const filteredData = newDevices[dataType].filter(device => new Date(device.writeDate) <= now);
        if (filteredData.length > 0) {
          const sortedData = filteredData.sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate));
          const processedData = sortedData.map(dataPoint => ({
            writeDate: dataPoint.writeDate,
            pvDataAvg: isNaN(dataPoint.pvDataAvg) ? 0 : parseFloat(dataPoint.pvDataAvg.toFixed(1))
          }));
          setChartData(processedData);
        } else {
          setError(`해당 유형(${dataType})의 데이터가 없습니다.`);
        }
      } else {
        setError('데이터가 없습니다.');
      }
    } catch (error) {
      console.log('데이터 요청 오류:', error);
      setError(`오류: ${error.message}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [timeRange, dataType]);

  const formatLabel = (dateString) => {
    const date = new Date(dateString);
    if (timeRange === 'hourly') {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'weekly') {
      return date.toLocaleDateString('ko-KR', { weekday: 'short', month: 'numeric', day: 'numeric' });
    } else if (timeRange === 'monthly') {
      return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleString('ko-KR');
  };

  const getChartData = () => {
    if (timeRange === 'weekly') {
      const weeklyData = new Array(7).fill(null).map(() => []);
      chartData.forEach(dataPoint => {
        const day = new Date(dataPoint.writeDate).getDay();
        weeklyData[day].push(dataPoint.pvDataAvg);
      });

      console.log('주간 데이터:', weeklyData);

      const now = new Date();
      const lastWeekData = new Array(7).fill(0);

      for (let i = 0; i < 7; i++) {
        const dayIndex = (now.getDay() - 6 + i + 7) % 7;
        if (weeklyData[dayIndex].length > 0) {
          const avg = weeklyData[dayIndex].reduce((a, b) => a + b, 0) / weeklyData[dayIndex].length;
          lastWeekData[i] = parseFloat(avg.toFixed(1));
        }
      }

      console.log('최종 차트 데이터:', lastWeekData);

      return lastWeekData;
    } else if (timeRange === 'monthly') {
      const monthlyData = new Array(12).fill(null).map(() => []);
      chartData.forEach(dataPoint => {
        const month = new Date(dataPoint.writeDate).getMonth();
        monthlyData[month].push(dataPoint.pvDataAvg);
      });

      return monthlyData.map(monthData => {
        if (monthData.length) {
          const avg = monthData.reduce((a, b) => a + b, 0) / monthData.length;
          return parseFloat(avg.toFixed(1));
        }
        return 0;
      });
    }
    return chartData.map(dataPoint => dataPoint.pvDataAvg);
  };

  const getChartLabels = () => {
    if (timeRange === 'weekly') {
      const now = new Date();
      const labels = [];
      for (let i = 0; i < 7; i++) {
        const pastDay = new Date(now);
        pastDay.setDate(now.getDate() - 6 + i);
        const dayLabel = pastDay.toLocaleDateString('ko-KR', { weekday: 'short', month: 'numeric', day: 'numeric' });
        labels.push(dayLabel);
      }
      return labels;
    } else if (timeRange === 'monthly') {
      return ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    }
    return chartData.map(dataPoint => formatLabel(dataPoint.writeDate));
  };

  const renderBarChart = () => {
    const chartData = getChartData().map(d => (isNaN(d) ? 0 : d));
    const labels = getChartLabels();
    const width = Math.max(labels.length * 40, Dimensions.get('window').width);
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };

    const x = d3.scaleBand()
      .domain(labels)
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3Array.max(chartData)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    return (
      <ScrollView horizontal>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#2b7ddb" />
              <Stop offset="100%" stopColor="#1b48dd" />
            </LinearGradient>
          </Defs>
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
            {chartData.map((d, i) => (
              <Rect
                key={i}
                x={x(labels[i])}
                y={y(d)}
                width={x.bandwidth()}
                height={height - margin.bottom - y(d)}
                fill="url(#barGradient)"
              />
            ))}
          </G>
          <G>
            {labels.map((d, i) => (
              <G key={i} transform={`translate(${x(d)}, 0)`}>
                <Line y1={margin.top} y2={height - margin.bottom} stroke="#ffffff" />
                <SvgText
                  y={height - margin.bottom + 20}
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
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgWhite}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderBarChart()
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
  },
  chartTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500',
    color: '#000000',
    paddingBottom: getResponsivePadding(10),
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveMargin(5),
  },
  tabBar: {
    backgroundColor: '#f2f2f2',
    borderRadius: getResponsiveMargin(5),
    elevation: 0,
  },
  tabBarLabel: {
    color: '#555555',
    fontSize: 14,
  },
  tabBarLabelFocused: {
    color: '#000000',
    fontWeight: '500',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AirQualityStatusChart;
