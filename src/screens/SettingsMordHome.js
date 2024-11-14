import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainProfile from '../components/MainProfile.js';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

import { UserContext } from '../context/UserContext';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const SettingsMordHome = () => {
  const navigation = useNavigation();
  const { devices, nickname, serialNumber, profileImage } = useContext(UserContext);

  useEffect(() => {
    console.log('UserContext Nickname:', nickname);
    console.log('UserContext Serial Number:', serialNumber);
    console.log('Current Devices:', devices);
  }, [devices, nickname, serialNumber]);

  const handleProfileData = (newNickname, newProfileImage) => {
    setNickname(newNickname);
    setProfileImage(newProfileImage);
  };

  const handleComplete = () => {
    navigation.navigate('MyHome', { devices });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('MyPageScreen')}>
          <MainProfile 
            navigation={navigation} 
            nickname={nickname} 
            profileImage={profileImage} 
            onProfileData={handleProfileData} 
          />
          <Icon name="chevron-forward" size={24} color="#000" style={styles.arrowIcon} />
        </TouchableOpacity>
        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('FAQScreen')}>
            <View style={styles.iconContainer}>
              <Icon name="help-circle-outline" size={50} color="#1e90ff" />
            </View>
            <Text style={styles.linkText}>자주 묻는 질문</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('ContactScreen')}>
            <View style={styles.iconContainer}>
              <Icon name="chatbubble-ellipses-outline" size={50} color="#1e90ff" />
            </View>
            <Text style={styles.linkText}>톡 문의</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>기기 관리</Text>
        <View style={styles.deviceManagementContainer}>
          {devices.filter(device => device.nickname).map((device, index) => (
            <TouchableOpacity
              key={index}
              style={styles.deviceBoxWithDevice}
              onPress={() => navigation.navigate('DeviceManagementScreen', { device })}
            >
              <Image source={device.image || require('../assets/images/device_img.png')} style={styles.deviceImage} />
              <Text style={styles.deviceName}>{device.nickname}</Text>
              <Icon name="chevron-forward" size={24} color="#000" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addDeviceButton} onPress={() => navigation.navigate('SecondStep')}>
            <Icon name="add-circle-outline" size={24} color="#1e90ff" />
            <Text style={styles.addDeviceText}>기기추가</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: getResponsivePadding(20),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
    justifyContent: 'space-between',
  },
  profileImage: {
    width: isTablet ? getResponsiveWidth(8) : getResponsiveWidth(15),
    height: isTablet ? getResponsiveHeight(5) : getResponsiveHeight(10),
    borderRadius: 25,
  },
  profileName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginLeft: getResponsiveMargin(10),
    flex: 1,
    color: '#000',
  },
  arrowIcon: {
    marginLeft: getResponsiveMargin(10),
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  linkItem: {
    alignItems: 'center',
    paddingHorizontal: getResponsivePadding(50),
  },
  iconContainer: {
    width: getResponsiveWidth(18),
    height: getResponsiveWidth(18),
    borderRadius: 90,
    backgroundColor: '#1e8fff11',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
  },
  linkText: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
  },
  deviceManagementContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: getResponsivePadding(20),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '500',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  deviceBoxWithDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: getResponsiveMargin(10),
    paddingBottom: getResponsivePadding(10),
  },
  deviceImage: {
    width: isTablet ? getResponsiveWidth(10) : getResponsiveWidth(15),
    height: isTablet ? getResponsiveHeight(3) : getResponsiveHeight(10),
    borderRadius: 25,
    marginRight: getResponsiveMargin(10),
  },
  deviceName: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    fontWeight: '500',
  },
  deviceBox: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: getResponsiveMargin(10),
    paddingBottom: getResponsivePadding(10),
  },
  noDeviceText: {
    fontSize: getResponsiveFontSize(16),
    color: '#888',
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: getResponsivePadding(10),
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  addDeviceText: {
    fontSize: getResponsiveFontSize(16),
    color: '#1e90ff',
    marginLeft: getResponsiveMargin(5),
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#1e90ff',
    padding: getResponsivePadding(15),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: getResponsiveMargin(20),
  },
  completeButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
  },
});

export default SettingsMordHome;
