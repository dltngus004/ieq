import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getResponsiveImageSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

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
    width: getResponsiveImageSize(30),
    height: getResponsiveImageSize(30),
  },
  notificationBadge: {
    position: 'absolute',
    right: getResponsiveMargin(-4),
    top: getResponsiveMargin(-4),
    backgroundColor: 'red',
    borderRadius: 8,
    width: getResponsiveImageSize(14),
    height: getResponsiveImageSize(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
  },
});

export default NotificationIcon;
