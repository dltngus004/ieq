import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const AirQualityStatus = ({ label, value }) => {
  const getStatusAndProgress = (label, value) => {
    let status = '';
    let progress = 0;
    let message = '';
    let image = null;
    let minRange = 0;
    let maxRange = 0;
    let maxValue = 100;
    let labels = ['보통', '적정', '나쁨'];
    const numericValue = parseFloat(value);

    switch (label) {
      case 'Temp':
        maxValue = 30;
        if (numericValue < 10) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.33;
          message = '오늘은 따뜻하게 입으세요!';
          image = require('../assets/images/bad.png');
        } else if (numericValue >= 10 && numericValue <= 20) {
          status = '적정';
          progress = ((numericValue - 10) / (20 - 10)) * 0.33 + 0.33;
          message = '오늘은 산책을 해보세요!';
          image = require('../assets/images/good.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 20) / (30 - 20)) * 0.34 + 0.66;
          message = '오늘은 시원하게 보내세요!';
          image = require('../assets/images/bad.png');
        }
        minRange = 10;
        maxRange = 20;
        break;
      case 'Humi':
        maxValue = 100;
        if (numericValue < 30) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.33;
          message = '오늘은 가습기를 사용하세요!';
          image = require('../assets/images/bad.png');
        } else if (numericValue >= 30 && numericValue <= 60) {
          status = '적정';
          progress = ((numericValue - 30) / (60 - 30)) * 0.33 + 0.33;
          message = '습도가 적절합니다!';
          image = require('../assets/images/good.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 60) / (100 - 60)) * 0.34 + 0.66;
          message = '제습기를 사용하세요!';
          image = require('../assets/images/bad.png');
        }
        minRange = 30;
        maxRange = 60;
        break;
      case 'eCO2':
        maxValue = 2000;
        if (numericValue < 600) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.3;
          message = '공기가 좋습니다!';
          image = require('../assets/images/good.png');
        } else if (numericValue >= 600 && numericValue <= 1000) {
          status = '적정';
          progress = ((numericValue - 600) / (1000 - 600)) * 0.4 + 0.3;
          message = '환기가 필요합니다!';
          image = require('../assets/images/soso.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 1000) / (2000 - 1000)) * 0.3 + 0.7;
          message = '외출을 자제하세요!';
          image = require('../assets/images/bad.png');
        }
        minRange = 600;
        maxRange = 1000;
        break;
      case 'TVOC':
        maxValue = 1000;
        if (numericValue < 220) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.3;
          message = '공기가 좋습니다!';
          image = require('../assets/images/good.png');
        } else if (numericValue >= 220 && numericValue <= 660) {
          status = '적정';
          progress = ((numericValue - 220) / (660 - 220)) * 0.4 + 0.3;
          message = '환기가 필요합니다!';
          image = require('../assets/images/soso.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 660) / (1000 - 660)) * 0.3 + 0.7;
          message = '외출을 자제하세요!';
          image = require('../assets/images/bad.png');
        }
        minRange = 220;
        maxRange = 660;
        break;
      case 'AQI':
        maxValue = 5;
        if (numericValue <= 1) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.33;
          message = '공기가 좋습니다!';
          image = require('../assets/images/good.png');
        } else if (numericValue > 1 && numericValue <= 3) {
          status = '적정';
          progress = ((numericValue - 1) / (3 - 1)) * 0.33 + 0.33;
          message = '외출 시 마스크를 착용하세요!';
          image = require('../assets/images/soso.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 3) / (5 - 3)) * 0.34 + 0.66;
          message = '외출을 자제하세요!';
          image = require('../assets/images/bad.png');
        }
        minRange = 1;
        maxRange = 3;
        break;
      case 'Illuminance':
        maxValue = 1000;
        if (numericValue < 100) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.33;
          message = '조명이 어둡습니다!';
          image = require('../assets/images/bad.png');
        } else if (numericValue >= 100 && numericValue <= 500) {
          status = '적정';
          progress = ((numericValue - 100) / (500 - 100)) * 0.33 + 0.33;
          message = '조명이 적절합니다!';
          image = require('../assets/images/good.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 500) / (1000 - 500)) * 0.34 + 0.66;
          message = '조명이 밝습니다!';
          image = require('../assets/images/bad.png');
        }
        minRange = 100;
        maxRange = 500;
        break;
      case 'Noise':
        maxValue = 100;
        if (numericValue < 40) {
          status = '보통';
          progress = (numericValue / maxValue) * 0.33;
          message = '주변이 조용합니다!';
          image = require('../assets/images/good.png');
        } else if (numericValue >= 40 && numericValue <= 70) {
          status = '적정';
          progress = ((numericValue - 40) / (70 - 40)) * 0.33 + 0.33;
          message = '주변이 약간 시끄럽습니다!';
          image = require('../assets/images/soso.png');
        } else {
          status = '나쁨';
          progress = ((numericValue - 70) / (100 - 70)) * 0.34 + 0.66;
          message = '주변이 매우 시끄럽습니다!';
          image = require('../assets/images/bad.png');
        }
        minRange = 40;
        maxRange = 70;
        break;
      default:
        status = '알 수 없음';
        progress = 0;
        message = '데이터를 확인하세요.';
        image = null;
        break;
    }

    return { status, progress, message, image, minRange, maxRange, labels, maxValue, numericValue };
  };

  const { status, progress, message, image, minRange, maxRange, labels, maxValue, numericValue } = getStatusAndProgress(label, value);

  const { width } = Dimensions.get('window');
  const barWidth = width * 0.9;
  const circleSize = isTablet ? getResponsiveWidth(3) : getResponsiveWidth(5);
  const circlePosition = barWidth * (numericValue / maxValue) - circleSize / 2;
  const minRangePosition = barWidth * (minRange / maxValue);
  const maxRangePosition = barWidth * (maxRange / maxValue);

  return (
    <View style={styles.container}>
      <View style={styles.StatusTit}>
        <View style={styles.TitTop}>
          {image && <Image source={image} style={styles.statusImage} />}
          <Text style={styles.value}>{value}</Text>
        </View>
        <View style={styles.TitRight}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={['#00B093', '#2768FD', '#E64A53']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBar, { width: barWidth }]}
        />
        <View style={[styles.rangeBar, { left: minRangePosition, width: maxRangePosition - minRangePosition }]} />
        <View style={[styles.currentCircle, { left: circlePosition, width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: status === '보통' ? '#0068FF' : status === '적정' ? '#2768FD' : '#E64A53' }]} />
        <View style={styles.labelsContainer}>
          <Text style={styles.labelText}>{labels[0]}</Text>
          <Text style={styles.labelText}>{labels[1]}</Text>
          <Text style={styles.labelText}>{labels[2]}</Text>
        </View>
        <View style={styles.rangeLabelsContainer}>
          <View style={[styles.rangeCircle, { left: minRangePosition - getResponsiveWidth(1) , backgroundColor: '#ffffff' }]} />
          <View style={[styles.rangeCircle, { left: maxRangePosition - getResponsiveWidth(5), backgroundColor: '#ffffff' }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: getResponsiveMargin(20),
    alignItems: 'center',
    backgroundColor: '#002060',
    width: '100%',
    padding: getResponsivePadding(30),
  },
  StatusTit: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: getResponsivePadding(30),
  },
  TitTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: getResponsivePadding(20),
  },
  label: {
    fontSize: getResponsiveFontSize(18),
    color: '#fff',
  },
  value: {
    fontSize: getResponsiveFontSize(50),
    marginVertical: getResponsiveMargin(10),
    fontWeight: 'bold',
    color: '#fff',
  },
  statusImage: {
    width: getResponsiveWidth(10),
    height: getResponsiveWidth(10),
    marginRight: getResponsiveMargin(20),
  },
  status: {
    fontSize: getResponsiveFontSize(18),
    marginVertical: getResponsiveMargin(10),
  },
  message: {
    fontSize: getResponsiveFontSize(14),
    textAlign: 'center',
    color: '#fff',
  },
  progressContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    paddingBottom: getResponsivePadding(10),
  },
  progressBar: {
    height: getResponsiveHeight(2),
    borderRadius: getResponsiveWidth(20),
    backgroundColor: '#E0E0E0',
  },
  rangeBar: {
    position: 'absolute',
    top: 0,
    height: getResponsiveHeight(2),
    borderRadius: getResponsiveWidth(20),
    backgroundColor: '#FFFFFF',
  },
  currentCircle: {
    position: 'absolute',
    top: -getResponsiveHeight(0),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  labelsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getResponsiveMargin(10),
  },
  labelText: {
    fontSize: getResponsiveFontSize(12),
    color: '#fff',
  },
  rangeLabelsContainer: {
    position: 'absolute',
    top: -0.9,
    width: '100%',
    flexDirection: 'row',
  },
  rangeCircle: {
    width: getResponsiveWidth(3),
    height: getResponsiveWidth(3),
    borderRadius: getResponsiveWidth(2.5),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
});

export default AirQualityStatus;
