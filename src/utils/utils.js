import { Dimensions } from 'react-native';
import { vw, vh } from 'react-native-viewport-units';

const { width, height } = Dimensions.get('window');

export const isTablet = width >= 600;

export const getResponsiveFontSize = (size) => (isTablet ? size * 1.2 : size * 1);

export const getResponsivePadding = (size) => (isTablet ? size * 1.2 : size * 0.6);

export const getResponsiveMargin = (size) => (isTablet ? size * 1.2 : size * 0.6);

export const getResponsiveIconSize = (size) => (isTablet ? size * 1.2 : size * 0.6);

export const getResponsiveImageSize = (size) => (isTablet ? size * 1.2 : size * 0.6);

export const getResponsiveWidth = (percentage) => (isTablet ? width * (percentage / 100) * 1.2 : width * (percentage / 100));

export const getResponsiveHeight = (value) => (isTablet ? height * (value / 100) * 1.2 : height * (value / 150));

export const getResponsiveTopPosition = (size) => {
  if (isTablet) {
    return size * 0.35; // 태블릿에서는 top을 35%로
  } else {
    return size * 0.42; // 모바일에서는 top을 40%로
  }
};

export const statusRanges = {
  Temp: { good: [18, 24], average: [24, 28], bad: [28, 35] },
  Humi: { good: [30, 60], average: [60, 70], bad: [70, 100] },
  eCO2: { good: [400, 800], average: [800, 1000], bad: [1000, 5000] },
  TVOC: { good: [0, 220], average: [220, 660], bad: [660, 2200] },
  Illuminace: { good: [300, 500], average: [500, 1000], bad: [1000, 10000] },
  Noise: { good: [30, 40], average: [40, 55], bad: [55, 100] },
  AQI: { good: [0, 5], average: [6, 10], bad: [11, 100] },
};

export const getStatusColor = (value, key) => {
  const ranges = statusRanges[key];
  if (!ranges) return '#ccc';
  if (value >= ranges.good[0] && value <= ranges.good[1]) return '#3D84FF';
  if (value >= ranges.average[0] && value <= ranges.average[1]) return '#F4C950';
  return '#E64A53';
};
