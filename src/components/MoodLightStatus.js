import React from 'react';
import { View, Text, Image, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMoodLight } from '../context/MoodLightContext';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

import deviceImage from '../assets/images/device_img.png';

const MoodLightStatus = ({ deviceName, serialNumber }) => {
  const navigation = useNavigation();
  const { isEnabled, toggleMoodLight, brightness, color } = useMoodLight();

  const handleToggleSwitch = async () => {
    const newEnabled = !isEnabled;

    try {
      // 먼저 서버에 상태를 업데이트한 후 상태를 변경
      await updateLedSettings(newEnabled ? brightness || 255 : 0, color);
      toggleMoodLight(newEnabled);
    } catch (error) {
      // 서버 요청이 실패하면 상태를 변경하지 않음
      console.error('Failed to toggle mood light', error);
      Alert.alert('Error', 'Failed to update mood light status');
    }
  };

  const updateLedSettings = async (newBrightness, newColor) => {
    try {
      const requestData = {
        UserId: serialNumber,
        IEQAPIBaseModels: [
          { AppReq: 'LEDBright', AppReq2: newBrightness.toString() },
          { AppReq: 'LEDMODE', AppReq2: '1' },
          { AppReq: 'LEDINDEX', AppReq2: '0' },
          { AppReq: 'LEDCOLOR', AppReq2: newColor.slice(1) },
          { AppReq: 'LEDConfigSave', AppReq2: '0' }
        ],
      };
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/SendIEQLED', requestData);
      
      if (response.status !== 200 || response.data.statusCode !== 200) {
        throw new Error('Failed to update LED settings on server');
      }

      console.log('LED settings updated successfully');
    } catch (error) {
      console.error('Network Error', error);
      throw new Error('Failed to update LED settings');
    }
  };

  const goToDetails = () => {
    navigation.navigate('MoodLightDetails', { deviceName, serialNumber });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetails}>
      <Image source={deviceImage} style={styles.image} />
      <View style={styles.textContainer}>
        <View>
          <Text style={[styles.deviceName, isEnabled ? styles.on : styles.off]}>{deviceName}</Text>
          <Text style={[styles.status, isEnabled ? styles.on : styles.off]}>{isEnabled ? '무드등 ON' : '무드등 OFF'}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#4589FF' }}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleSwitch}
          value={isEnabled}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getResponsiveMargin(10),
    padding: getResponsivePadding(10),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: getResponsiveWidth(10), // 적절한 비율로 조정
    height: getResponsiveHeight(3), // 적절한 비율로 조정
    marginRight: getResponsiveMargin(15),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceName: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
  },
  status: {
    fontSize: getResponsiveFontSize(14),
  },
  on: {
    color: '#000', // ON 상태일 때 검은색
  },
  off: {
    color: '#7F7F7F', // OFF 상태일 때 회색
  },
});

export default MoodLightStatus;
