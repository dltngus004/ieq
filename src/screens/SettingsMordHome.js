import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const SettingsMordHome = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState([
    { id: 1, name: '보티 연구소', image: require('../assets/images/device_img.png') }
  ]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>이보티님</Text>
          <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('MyPageScreen')}>
            <Icon name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
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
          {devices.length > 0 ? (
            devices.map((device) => (
              <TouchableOpacity
                key={device.id}
                style={styles.deviceBoxWithDevice}
                onPress={() => navigation.navigate('DeviceManagementScreen', { deviceId: device.id })}
              >
                <Image source={device.image} style={styles.deviceImage} />
                <Text style={styles.deviceName}>{device.name}</Text>
                <Icon name="chevron-forward" size={24} color="#000" />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.deviceBox}>
              <Text style={styles.noDeviceText}>기기가 없어요</Text>
            </View>
          )}
          <TouchableOpacity style={styles.addDeviceButton} onPress={() => navigation.navigate('DeviceRegistration')}>
            <Icon name="add-circle-outline" size={24} color="#1e90ff" />
            <Text style={styles.addDeviceText}>기기추가</Text>
          </TouchableOpacity>
        </View>
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
  arrowContainer: {
    padding: getResponsivePadding(10),
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
  deviceBox: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: getResponsiveMargin(10),
  },
  deviceBoxWithDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: getResponsiveMargin(10),
    paddingBottom: getResponsivePadding(20),
  },
  deviceImage: {
    width: isTablet ? getResponsiveWidth(9) : getResponsiveWidth(20),
    height: isTablet ? getResponsiveHeight(3) : getResponsiveHeight(5),
    marginRight: getResponsiveMargin(10),
  },
  deviceName: {
    flex: 1,
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    fontWeight: '500',
  },
  noDeviceText: {
    fontSize: getResponsiveFontSize(16),
    color: '#888',
    marginBottom: getResponsiveMargin(20),
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDeviceText: {
    fontSize: getResponsiveFontSize(16),
    color: '#1e90ff',
    marginLeft: getResponsiveMargin(5),
    fontWeight: 'bold',
  },
});

export default SettingsMordHome;
