import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import Svg, { G, Line, Path, Text as SvgText, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import * as d3 from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const TrendChart = ({ label, dataType, serialNumber }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [predictionData, setPredictionData] = useState(null); // 예측 데이터를 저장할 상태

  const [routes] = useState([
    { key: 'hourly', title: '시간' },
    { key: 'weekly', title: '주간' },
    { key: 'monthly', title: '월간' },
  ]);

  const fetchData = async (timeRange) => {
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
      };
    }

    //console.log('요청 데이터:', JSON.stringify(requestData, null, 2)); // 요청 데이터 콘솔 출력

    try {
      const response = await axios.post(url, requestData);
      const data = response.data;

      //console.log('응답 데이터:', JSON.stringify(data, null, 2)); // 응답 데이터 콘솔 출력

      const { newDevices } = data;
      if (newDevices && newDevices[dataType]) {
        const now = new Date();
        const filteredData = newDevices[dataType].filter(device => new Date(device.writeDate) <= now);
        if (filteredData.length > 0) {
          const sortedData = filteredData.sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate));
          const processedData = sortedData.map(dataPoint => ({
            ...dataPoint,
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
      //console.log('데이터 요청 오류:', error); // 요청 오류 로그 출력
      setError(`오류: ${error.message}`);
    }

    setLoading(false);
  };

  const fetchPredictionData = async (timeRange) => {
    try {
      const response = await axios.post('http://3.85.7.146:81/trend_forecasting', {
        serial_no: serialNumber,
        time_unit: timeRange
      });
      setPredictionData(response.data);
    } catch (error) {
      //console.error('예측 데이터 요청 오류:', error);
    }
  };

  useEffect(() => {
    const timeRange = routes[index].key;
    fetchData(timeRange);
    fetchPredictionData(timeRange); // 예측 데이터도 함께 가져오기
  }, [index, dataType]);

  const formatLabel = (dateString) => {
    const date = new Date(dateString);
    if (routes[index].key === 'hourly') {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else if (routes[index].key === 'weekly') {
      return date.toLocaleDateString('ko-KR', { weekday: 'short' });
    } else if (routes[index].key === 'monthly') {
      return date.toLocaleDateString('ko-KR', { month: 'short' });
    }
    return date.toLocaleString('ko-KR');
  };

  const getChartLabels = () => {
    if (routes[index].key === 'weekly') {
      return ['일', '월', '화', '수', '목', '금', '토'];
    } else if (routes[index].key === 'monthly') {
      return ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    }
    const labels = chartData.map((dataPoint) => formatLabel(dataPoint.writeDate));
    if (predictionData) {
      labels.push('예측');
    }
    return labels;
  };

  const getChartData = () => {
    if (routes[index].key === 'weekly') {
      const weeklyData = new Array(7).fill([]).map(() => []);
      chartData.forEach(dataPoint => {
        const day = new Date(dataPoint.writeDate).getDay();
        weeklyData[day].push(dataPoint.pvDataAvg);
      });
      console.log('주간 데이터:', weeklyData);
      return weeklyData.map(dayData => dayData.length ? parseFloat((dayData.reduce((a, b) => a + b, 0) / dayData.length).toFixed(1)) : 0);
    } else if (routes[index].key === 'monthly') {
      const monthlyData = new Array(12).fill([]).map(() => []);
      chartData.forEach(dataPoint => {
        const month = new Date(dataPoint.writeDate).getMonth();
        monthlyData[month].push(dataPoint.pvDataAvg);
      });
      //console.log('월간 데이터:', monthlyData);
      return monthlyData.map(monthData => monthData.length ? parseFloat((monthData.reduce((a, b) => a + b, 0) / monthData.length).toFixed(1)) : 0);
    }
    const data = chartData.map((dataPoint) => dataPoint.pvDataAvg);
    if (predictionData && predictionData[dataType]) {
      data.push(predictionData[dataType]);
    }
    return data;
  };

  const renderLineChart = () => {
    const chartData = getChartData().map(d => (isNaN(d) ? 0 : d));
    //console.log('최종 차트 데이터:', chartData); // 최종 차트 데이터 로그 출력
    const width = Math.max(getChartLabels().length * 40, Dimensions.get('window').width);
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };

    const x = d3.scalePoint()
      .domain(getChartLabels())
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3Array.max(chartData) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3Shape.line()
      .x((d, i) => x(getChartLabels()[i]))
      .y(d => y(d))
      .curve(d3Shape.curveCatmullRom); // Smooth the line

    const isPrediction = (index) => predictionData && index === chartData.length - 1;

    return (
      <ScrollView horizontal>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#ff0080" />
              <Stop offset="100%" stopColor="#8000ff" />
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
            <Path
              d={line(chartData)}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth={2}
            />
          </G>
          <G>
            {chartData.map((d, i) => (
              <G key={i} transform={`translate(${x(getChartLabels()[i])}, ${y(d)})`}>
                <Circle r={4} fill="#fff" stroke={isPrediction(i) ? "#006eff" : "url(#lineGradient)"} strokeWidth={2} />
                <SvgText x={0} y={-10} fontSize={isPrediction(i) ? 16 : 12} fontWeight={isPrediction(i) ? '500' : 'normal'} fill={isPrediction(i) ? "#000000" : "#000"} textAnchor="middle">{d}</SvgText>
              </G>
            ))}
          </G>
          <G>
            {x.domain().map((d, i) => (
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

  const renderScene = ({ route }) => {
    return (
      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          renderLineChart()
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>{label} 추세</Text>
      <View style={styles.bgWhite}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              renderLabel={({ route, focused }) => (
                <Text style={[styles.tabBarLabel, focused && styles.tabBarLabelFocused]}>{route.title}</Text>
              )}
              indicatorStyle={styles.indicator}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    elevation: 0, // Remove shadow
  },
  tabBarLabel: {
    color: '#555555',
    fontSize: 14,
  },
  tabBarLabelFocused: {
    color: '#000000',
    fontWeight: '500'
  },
  indicator: {
    backgroundColor: 'transparent', // Remove default indicator
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

export default TrendChart;
