import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/utils';

const AirQualityStatusChart = ({ label, dataType, timeRange }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let appReq2;
    switch (timeRange) {
      case 'hourly':
        appReq2 = '12';
        break;
      case 'weekly':
        appReq2 = '168';
        break;
      case 'monthly':
        appReq2 = '720';
        break;
      default:
        appReq2 = '12';
    }
    const requestData = {
      UserId: 'IEQAAAB101TEST240426',
      AppReq: dataType,
      AppReq2: appReq2,
    };
    console.log('Sending request with:', requestData);

    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasAVGToSN', requestData);

      const data = response.data;
      console.log('Response data:', data);

      const { newDevices } = data;
      if (newDevices && newDevices[dataType]) {
        console.log(`${dataType}:`, JSON.stringify(newDevices[dataType], null, 2));
        const sortedData = newDevices[dataType].sort((a, b) => new Date(a.writeDate) - new Date(b.writeDate));
        setChartData(sortedData);
      } else {
        Alert.alert('Data fetch error:', 'No data available for this type');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error fetching data:', `Error: ${error.message}\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data)}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dataType, timeRange]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const formatLabel = (dateString) => {
    const date = new Date(dateString);
    if (timeRange === 'hourly') {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === 'weekly') {
      return date.toLocaleDateString('ko-KR', { weekday: 'short' });
    } else if (timeRange === 'monthly') {
      return date.toLocaleDateString('ko-KR', { month: 'short' });
    }
    return date.toLocaleString('ko-KR');
  };

  const getChartLabels = () => {
    if (timeRange === 'hourly') {
      return chartData
        .filter((dataPoint) => new Date(dataPoint.writeDate).getHours() >= 3)
        .map((dataPoint) => formatLabel(dataPoint.writeDate));
    } else if (timeRange === 'weekly') {
      return ['일', '월', '화', '수', '목', '금', '토'];
    } else if (timeRange === 'monthly') {
      return ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    }
    return [];
  };

  const getWeeklyData = () => {
    const weekData = new Array(7).fill(null);
    const dayCounts = new Array(7).fill(0);

    chartData.forEach((dataPoint) => {
      const date = new Date(dataPoint.writeDate);
      const day = date.getDay();
      if (weekData[day] === null) {
        weekData[day] = dataPoint.pvDataAvg;
      } else {
        weekData[day] += dataPoint.pvDataAvg;
      }
      dayCounts[day]++;
    });

    for (let i = 0; i < weekData.length; i++) {
      if (weekData[i] !== null) {
        weekData[i] /= dayCounts[i];
      }
    }

    return weekData.map((value) => dataType === 'AQI' ? Math.round(value) : value); // 반올림하여 정수로 변환 (AQI일 경우)
  };

  const getMonthlyData = () => {
    const currentMonth = new Date().getMonth(); // 현재 월
    const monthData = new Array(12).fill(null);
    const monthCounts = new Array(12).fill(0);

    chartData.forEach((dataPoint) => {
      const date = new Date(dataPoint.writeDate);
      const month = date.getMonth();
      if (month <= currentMonth) { // 현재 월까지의 데이터만 포함
        if (monthData[month] === null) {
          monthData[month] = dataPoint.pvDataAvg;
        } else {
          monthData[month] += dataPoint.pvDataAvg;
        }
        monthCounts[month]++;
      }
    });

    for (let i = 0; i < monthData.length; i++) {
      if (monthData[i] !== null) {
        monthData[i] /= monthCounts[i];
      }
    }

    return monthData.map((value) => dataType === 'AQI' ? Math.round(value) : value); // 반올림하여 정수로 변환 (AQI일 경우)
  };

  const getChartData = () => {
    if (timeRange === 'weekly') {
      return getWeeklyData();
    } else if (timeRange === 'monthly') {
      return getMonthlyData();
    }
    return chartData.map((dataPoint) => dataType === 'AQI' ? Math.round(dataPoint.pvDataAvg) : dataPoint.pvDataAvg); // 반올림하여 정수로 변환 (AQI일 경우)
  };

  const getYMinValue = () => {
    if (dataType === 'AQI') {
      return 1;
    }
    return 0;
  };

  const getYMaxValue = () => {
    if (dataType === 'AQI') {
      return 5;
    }
    return undefined; // 기본 최대값 사용
  };

  const data = {
    labels: getChartLabels(),
    datasets: [
      {
        data: getChartData(),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {chartData.length > 0 ? (
        <>
          <View>
            <ScrollView horizontal>
              <LineChart
                data={data}
                width={Math.max(chartData.length * 40, Dimensions.get('window').width)}
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={dataType === 'AQI' ? 1 : 0.1} // y축 간격 설정
                fromZero={dataType !== 'AQI'} // y축을 0부터 시작 (AQI가 아닌 경우)
                yAxisMinValue={getYMinValue()} // y축 최소값 설정
                yAxisMaxValue={getYMaxValue()} // y축 최대값 설정 (AQI일 경우 5로 설정)
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 1, // 소숫점 자릿수 한 자리로 설정
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                  withInnerLines: true, // 내부 라인 표시
                }}
                bezier
                style={styles.chart}
              />
            </ScrollView>
          </View>
        </>
      ) : (
        <Text>데이터가 없습니다.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: getResponsivePadding(20),
  },
  yAxisLabel: {
    marginRight: getResponsiveMargin(10),
    fontSize: getResponsiveFontSize(14),
    color: 'black',
  },
  xAxisLabel: {
    textAlign: 'center',
    fontSize: getResponsiveFontSize(14),
    color: 'black',
    marginTop: getResponsiveMargin(10),
  },
  title: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: getResponsiveMargin(8),
    borderRadius: 16,
    paddingVertical: getResponsivePadding(20),
  },
});

export default AirQualityStatusChart;
