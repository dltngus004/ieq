import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize } from '../utils/utils';

const DeviceSelector = () => {
  const [selectedDevice, setSelectedDevice] = useState("device1");

  return (
    <View style={styles.deviceSelector}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedDevice(value)}
        items={[
          { label: '보티 연구소', value: 'device1' },
          { label: '디바이스 2', value: 'device2' },
          { label: '디바이스 3', value: 'device3' },
        ]}
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
    // flex: 1,
    justifyContent: 'center',
    width: '80%'
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
    paddingHorizontal: getResponsivePadding(10),
    paddingVertical: getResponsivePadding(8),
    color: 'black',
  },
  iconContainer: {
    top: 20,
    left: 130,
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
