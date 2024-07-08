// DeviceManagementScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DeviceSelector from '../components/DeviceSelector';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const DeviceManagementScreen = () => {
  const [selectedDevice, setSelectedDevice] = useState('device1');

  const devices = {
    device1: { name: '보티 연구소', serialNumber: 'ieqfoglw0011', version: '최신 240529' },
    device2: { name: '디바이스 2', serialNumber: 'ieqfoglw0022', version: '최신 240530' },
    device3: { name: '디바이스 3', serialNumber: 'ieqfoglw0033', version: '최신 240531' }
  };

  const selectedDeviceInfo = devices[selectedDevice];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DeviceSelector selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
      {selectedDeviceInfo && (
        <View style={styles.infoWrap}>
          <Text style={styles.infoTitle}>기기 정보</Text>
          <View style={styles.deviceInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>시리얼 넘버</Text>
              <Text style={styles.infoValue}>{selectedDeviceInfo.serialNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>버전 정보</Text>
              <Text style={styles.infoValue}>{selectedDeviceInfo.version}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getResponsivePadding(20),
    backgroundColor: '#f5f5f5',
  },
  infoWrap: {
    paddingTop: getResponsivePadding(20),
  },
  deviceInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: getResponsivePadding(20),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: getResponsiveWidth(10),
    shadowOffset: { width: 0, height: getResponsiveHeight(5) },
    elevation: 3,
  },
  infoTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: getResponsivePadding(10),
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  infoLabel: {
    fontSize: getResponsiveFontSize(14),
    color: '#888',
  },
  infoValue: {
    fontSize: getResponsiveFontSize(14),
    color: '#000',
  },
});

export default DeviceManagementScreen;
