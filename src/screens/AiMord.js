import React from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import DeviceSelector from '../components/DeviceSelector';
import NotificationIcon from '../components/NotificationIcon';
import AiAnalysisComponent from '../components/AiAnalysisComponent';
import AiDiaryComponent from '../components/AiDiaryComponent.js';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveImageSize } from '../utils/utils'; // 유틸리티 함수 임포트

// 임시 이미지 경로
import deviceImage from '../assets/images/device_img.png';

const { width, height } = Dimensions.get('window');

const AiMordHome = ({ navigation, moodItems, setMoodItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={deviceImage} style={styles.image} />
        <DeviceSelector />
        <NotificationIcon navigation={navigation} hasNotifications={true} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AiAnalysisComponent />
        <AiDiaryComponent moodItems={moodItems} setMoodItems={setMoodItems} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  image: {
    width: getResponsiveImageSize(80),
    height: getResponsiveImageSize(30),
  },
  scrollContainer: {
    paddingBottom: getResponsivePadding(20),
  },
});

export default AiMordHome;
