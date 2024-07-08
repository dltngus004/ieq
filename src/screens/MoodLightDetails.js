import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Switch, Image, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
import ColorPicker from 'react-native-wheel-color-picker';
import { useMoodLight } from '../context/MoodLightContext';
// 임시 이미지 경로
import deviceImage from '../assets/images/device_img.png';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight,
} from '../utils/utils';

const { width: viewportWidth } = Dimensions.get('window');

const MoodLightDetails = ({ route }) => {
  const { deviceName } = route.params;
  const { isEnabled, brightness, color, toggleMoodLight, updateBrightness, updateColor } = useMoodLight();

  useEffect(() => {
    if (brightness > 0) {
      toggleMoodLight(true);
    } else {
      toggleMoodLight(false);
    }
  }, [brightness]);

  const handleToggleSwitch = async (newEnabled, newBrightness = brightness, newColor = color) => {
    toggleMoodLight(newEnabled);
    updateLedSettings(newEnabled ? newBrightness : 0, newColor);
  };

  const updateLedSettings = async (newBrightness, newColor) => {
    try {
      const requestData = {
        UserId: 'IEQAAAB101TEST240425',
        IEQAPIBaseModels: [
          { AppReq: 'LEDBright', AppReq2: newBrightness.toString() },
          { AppReq: 'LEDCOLOR', AppReq2: newColor.slice(1) }
        ],
      };
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/SendIEQLED', requestData);
      if (response.status === 200 && response.data.statusCode === 200) {
        updateBrightness(newBrightness); // 상태 업데이트
      } else {
        Alert.alert('Error', 'Failed to update LED settings');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to update LED settings');
    }
  };

  // 조건부 스타일링
  const textContainerWidth = viewportWidth > 768 ? '85%' : '70%'; // 예: 768px 이상이면 탭, 그 이하면 모바일
  const imageSize = viewportWidth > 768 ? { width: 100, height: 50 } : { width: getResponsiveWidth(20), height: getResponsiveHeight(5) };

  return (
    <View style={styles.container}>
      <View style={styles.white}>
        <View style={styles.onOffButton}>
          <Image source={deviceImage} style={[styles.image, imageSize]} />
          <View style={[styles.textContainer, { width: textContainerWidth }]}>
            <Text style={styles.moodOnOff}>{isEnabled ? '무드등 ON' : '무드등 OFF'}</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#4589FF' }}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => handleToggleSwitch(!isEnabled)}
              value={isEnabled}
            />
          </View>
        </View>
        <View style={styles.brightness}>
          <Text style={styles.text}>밝기</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={255}
            value={brightness}
            onValueChange={(value) => {
              updateBrightness(Math.round(value));
              updateLedSettings(Math.round(value), color);
            }}
            disabled={!isEnabled}
            minimumTrackTintColor="#4589FF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#ddd"
          />
        </View>
        <View>
          <Text style={styles.text}>컬러</Text>
          <ColorPicker
            color={color}
            onColorChangeComplete={(selectedColor) => {
              updateColor(selectedColor);
              updateLedSettings(brightness, selectedColor);
            }}
            style={{ flex: 1, width: getResponsiveWidth(75), height: getResponsiveHeight(75) }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: getResponsivePadding(10),
    backgroundColor: '#F2F4F8',
    flex: 1,
  },
  white: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(30),
    height: '100%',
    borderRadius: 8,
  },
  onOffButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: getResponsivePadding(30),
  },
  image: {
    marginRight: getResponsiveMargin(15),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodOnOff: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: getResponsiveFontSize(20),
  },
  brightness: {
    paddingBottom: getResponsivePadding(20),
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: getResponsiveMargin(10),
  },
  text: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
  },
});

export default MoodLightDetails;
