import React, { useContext, useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Dimensions } from 'react-native';
import DeviceSelector from '../components/DeviceSelector';
import NotificationIcon from '../components/NotificationIcon';
import AiAnalysisComponent from '../components/AiAnalysisComponent';
import AiDiaryComponent from '../components/AiDiaryComponent';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveWidth, getResponsiveHeight } from '../utils/utils';
import { UserContext } from '../context/UserContext';

import deviceImage from '../assets/images/device_img.png';

const { width: screenWidth, height } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const AiMordHome = ({ navigation, route, moodItems, setMoodItems }) => {
  const { serialNumber } = useContext(UserContext);

  // 뒤로 가기 버튼 제거
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={deviceImage} style={styles.image} />
        <DeviceSelector />
        <NotificationIcon navigation={navigation} hasNotifications={true} />
      </View>
      {serialNumber ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AiAnalysisComponent serialNumber={serialNumber} />
          <AiDiaryComponent moodItems={moodItems} setMoodItems={setMoodItems} />
        </ScrollView>
      ) : (
        <View style={styles.noDeviceContainer}>
          <Text style={styles.noDeviceText}>기기 등록을 해주세요.</Text>
        </View>
      )}
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
    marginBottom: 10,
  },
  image: {
    width: isTablet ? getResponsiveWidth(10) : getResponsiveWidth(15),
    height: isTablet ? getResponsiveHeight(3) : getResponsiveHeight(5),
  },
  scrollContainer: {
    paddingBottom: getResponsivePadding(20),
  },
  noDeviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDeviceText: {
    fontSize: getResponsiveFontSize(18),
    color: '#000',
  },
});

export default AiMordHome;
