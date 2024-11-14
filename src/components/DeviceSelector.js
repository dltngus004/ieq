import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveIconSize } from '../utils/utils';
import { UserContext } from '../context/UserContext';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const DeviceSelector = () => {
  const { devices } = useContext(UserContext); // 기기 목록을 컨텍스트에서 가져옴
  const [selectedDevice, setSelectedDevice] = useState(devices[0]?.serialNumber || '');

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0].serialNumber);
    }
  }, [devices]);

  return (
    <View style={styles.deviceSelector}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedDevice(value)}
        items={devices.map(device => ({ label: device.nickname, value: device.serialNumber }))}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          iconContainer: styles.iconContainer,
        }}
        value={selectedDevice}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <View style={styles.icon} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deviceSelector: {
    justifyContent: 'center',
    width: '80%',
  },
  inputIOS: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    paddingVertical: getResponsivePadding(12),
    paddingHorizontal: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    paddingHorizontal: getResponsivePadding(0),
    paddingVertical: getResponsivePadding(8),
    color: 'black',
  },
  iconContainer: {
    top: '43%',
    right: 10,
  },
  icon: {
    width: 0,
    height: 0,
    borderLeftWidth: getResponsiveIconSize(5),
    borderLeftColor: 'transparent',
    borderRightWidth: getResponsiveIconSize(5),
    borderRightColor: 'transparent',
    borderTopWidth: getResponsiveIconSize(10),
    borderTopColor: '#D9D9D9',
  },
});

export default DeviceSelector;
