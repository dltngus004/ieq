import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const NotificationIcon = ({ navigation, hasNotifications }) => {
  const imageUrls = [
    require('../assets/images/profile.png'),
    require('../assets/images/bell.png'),
  ];

  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={goToNotifications}>
        <Image source={imageUrls[1]} style={styles.notification} />
        {hasNotifications && <View style={styles.notificationBadge} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    width: isTablet ? getResponsiveWidth(3) : getResponsiveWidth(6),
    height: isTablet ? getResponsiveHeight(3) : getResponsiveHeight(6),
  },
  notificationBadge: {
    position: 'absolute',
    right: getResponsiveMargin(-4),
    top: getResponsiveMargin(1),
    backgroundColor: 'red',
    borderRadius: 100,
    width: isTablet ? getResponsiveWidth(1.2) : getResponsiveWidth(2),
    height: isTablet ? getResponsiveHeight(0.8) : getResponsiveHeight(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
});

export default NotificationIcon;
