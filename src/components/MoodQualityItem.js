import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Switch, Button } from 'react-native';
import axios from 'axios';
import Slider from '@react-native-community/slider';
import { ColorPicker } from 'react-native-color-picker';  // 색상 선택을 위한 ColorPicker 추가

const MoodQualityItem = ({ serialNumber }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ledBright, setLedBright] = useState(255);
  const [ledColor, setLedColor] = useState('#FFFFFF');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const requestData = { UserId: 'IEQAAAB101TEST240425', AppReq: 'OnOff' };
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/SendIEQLED', requestData);
      if (response.status === 200) {
        setIsEnabled(response.data.newDevices[0].svData === 'On');
        setLoading(false);
      } else {
        Alert.alert('Error', 'Failed to fetch data');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to fetch data');
    }
  };

  const updateLedSettings = async () => {
    const requestData = {
      UserId: 'IEQAAAB101TEST240425',
      IEQAPIBaseModels: [
        { AppReq: isEnabled ? "Off" : "On" }, // LED On/Off 요청
        { AppReq: "LEDBright", AppReq2: ledBright.toString() },
        { AppReq: "LEDCOLOR", AppReq2: ledColor.slice(1) } // 색상 코드의 '#' 제거
      ]
    };
    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/SendIEQLED', requestData);
      if (response.status === 200) {
        Alert.alert('Success', `LED updated successfully`);
      } else {
        Alert.alert('Error', 'Failed to update LED settings');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to update LED settings');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.serialNumber}>{serialNumber}</Text>
      <Text style={styles.status}>{isEnabled ? 'On' : 'Off'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={() => {
          setIsEnabled(!isEnabled);
          updateLedSettings();  // 토글 변경 시 설정 업데이트
        }}
        value={isEnabled}
      />
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={255}
        value={ledBright}
        onValueChange={setLedBright}
      />
      <ColorPicker
        color={ledColor}
        onColorChange={setLedColor}
        onColorSelected={() => updateLedSettings()}  // 색상 선택 완료 시 설정 업데이트
      />
      <Button title="Update LED Settings" onPress={updateLedSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  serialNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  status: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoodQualityItem;
