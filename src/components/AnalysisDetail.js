import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import TrendChart from './TrendChart';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight,
  getResponsiveIconSize
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const images = {
  good: require('../assets/images/good.png'),
  soso: require('../assets/images/soso.png'),
  bad: require('../assets/images/bad.png')
};

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
  if (value >= ranges.average[0] && value <= ranges.average[1]) return '#45C478';
  return '#E64A53';
};

const getStatusImage = (value, key) => {
  const ranges = statusRanges[key];
  if (!ranges) return images.good;
  if (value >= ranges.good[0] && value <= ranges.good[1]) return images.good;
  if (value >= ranges.average[0] && value <= ranges.average[1]) return images.soso;
  return images.bad;
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

const AnalysisDetail = ({ item, serialNumber }) => {
  const [recommendation, setRecommendation] = useState('');
  const [yesterdayValue, setYesterdayValue] = useState(0);

  useEffect(() => {
    fetchRecommendation(item.key);
    fetchYesterdayData(item.key);
  }, [item.key]);

  const fetchRecommendation = async (key) => {
    try {
      const requestData = {
        serial_no: serialNumber,
        key: key,
      };
      console.log('Request Data:', JSON.stringify(requestData, null, 2)); // Log the request data

      const response = await axios.post('http://3.85.7.146:80/IEQ_recommend', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setRecommendation(response.data.message);
      } else {
        setRecommendation('추천 메시지를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation('네트워크 오류로 추천 메시지를 가져오지 못했습니다.');
    }
  };

  const fetchYesterdayData = async (key) => {
    try {
      const requestData = {
        UserId: serialNumber,
        AppReq: key,
        AppReq2: '24',
      };
      console.log('Request Data:', JSON.stringify(requestData, null, 2)); // Log the request data

      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/GetIEQLastDatasAVGToSN', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const responseData = response.data.newDevices[key];
        if (responseData) {
          const now = new Date();
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);

          const yesterdayData = responseData.filter(device => {
            const writeDate = new Date(device.writeDate);
            return (
              writeDate.getDate() === yesterday.getDate() &&
              writeDate.getMonth() === yesterday.getMonth() &&
              writeDate.getFullYear() === yesterday.getFullYear()
            );
          });

          if (yesterdayData.length > 0) {
            const average = yesterdayData.reduce((sum, device) => sum + device.pvDataAvg, 0) / yesterdayData.length;
            setYesterdayValue(average);
          } else {
            setYesterdayValue(0);
          }
        } else {
          setYesterdayValue(0);
        }
      } else {
        Alert.alert('Error', 'Failed to fetch yesterday data');
      }
    } catch (error) {
      console.error('Error fetching yesterday data:', error);
      Alert.alert('Network Error', 'Failed to fetch yesterday data');
    }
  };

  const difference = item.value - yesterdayValue;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.w100}>
        <View style={[styles.detailHeader, { backgroundColor: getStatusColor(item.value, item.key) }]}>
          <View style={styles.row}>
            <Image source={getStatusImage(item.value, item.key)} style={styles.image} />
            <Text style={styles.detailScore}>{item.value.toFixed(1)}{getUnit(item.key)}</Text>
          </View>
          <View>
            <Text style={styles.detailTitle}>{item.key}</Text>
            <Text style={styles.detailDifference}>
              {difference > 0 ? `어제보다 ${difference.toFixed(1)} 높습니다` : difference < 0 ? `어제보다 ${Math.abs(difference).toFixed(1)} 낮습니다` : `어제와 동일`}
            </Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.chartTitle}>{item.key} 평균(어제기준)</Text>
          <View style={styles.bgWhite}>
            <View style={styles.w100}>
              <View style={styles.progressBarWrapper}>
                <View style={styles.rowBtween}>
                  <Text style={styles.progressLabel}>현재</Text>
                  <Text style={styles.progressScore}>{item.value.toFixed(1)}{getUnit(item.key)}</Text>
                </View>
                <ProgressBar value={item.value} color={getStatusColor(item.value, item.key)} />
              </View>
              <View style={styles.progressBarWrapper}>
                <View style={styles.rowBtween}>
                  <Text style={styles.progressLabel}>어제</Text>
                  <Text style={styles.progressScore}>{(yesterdayValue || 0).toFixed(1)}{getUnit(item.key)}</Text>
                </View>
                <ProgressBar value={yesterdayValue} color="#8497B0" />
              </View>
            </View>
            <View style={styles.aiConment}>
              <View style={styles.aiTitle}>
                <Icon name="logo-ionitron" size={getResponsiveIconSize(35)} style={styles.icon} />
                <Text style={styles.iconText}>AI 매니저</Text>
              </View>
              <View style={styles.infoWrap}>
                <Text style={styles.infoText}>
                  {recommendation}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TrendChart 
          dataType={item.key}
          serialNumber={serialNumber}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginBottom: getResponsiveMargin(20),
    width: '100%',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
    padding: getResponsivePadding(15),
    borderRadius: getResponsiveWidth(100),
  },
  image: {
    width: getResponsiveWidth(13),
    height: getResponsiveHeight(10),
    marginRight: getResponsiveMargin(10),
  },
  detailScore: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: 'bold',
    color: '#fff',
    marginRight: getResponsiveMargin(20),
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  progressBarWrapper: {
    marginBottom: getResponsiveMargin(10),
  },
  rowBtween: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: getResponsiveMargin(5)
  },
  detailTitle: {
    fontSize: getResponsiveFontSize(12),
    color: '#ddd',
  },
  detailDifference: {
    fontSize: getResponsiveFontSize(16),
    color: '#fff',
  },
  chartTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    justifyContent: 'space-between',
    borderRadius: getResponsiveWidth(1),
  },
  progressLabel: {
    color: '#595959',
    fontSize: getResponsiveFontSize(14),
  },
  progressScore: {
    color: '#000',
    fontSize: getResponsiveFontSize(15),
    marginLeft: getResponsiveMargin(10),
    fontWeight: '500'
  },
  nonePadding: {
    padding: 0,
  },
  aiConment: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: getResponsivePadding(10),
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
  infoWrap: {
    backgroundColor: '#eaeef3',
    padding: getResponsivePadding(15),
    borderRadius: getResponsiveWidth(1),
    marginTop: getResponsiveMargin(10),
    width: '90%',
  },
  infoText: {
    fontSize: getResponsiveFontSize(12),
    color: '#000',
    textAlign: 'left',
  },
});

export default AnalysisDetail;
