import { Dimensions } from 'react-native';
import {vw, vh} from 'react-native-viewport-units';

const {  width, height  } = Dimensions.get('window');

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

  