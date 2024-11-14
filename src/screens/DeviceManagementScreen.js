import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const DeviceManagementScreen = ({ route }) => {
  const { device } = route.params;

  // 시리얼 번호의 마지막 부분을 버전 정보로 사용
  const version = device.serialNumber.split('').slice(-6).join('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoWrap}>
        <Text style={styles.infoTitle}>기기 정보</Text>
        <View style={styles.deviceInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>닉네임</Text>
            <Text style={styles.infoValue}>{device.nickname}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>시리얼 넘버</Text>
            <Text style={styles.infoValue}>{device.serialNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>버전 정보</Text>
            <Text style={styles.infoValue}>{version}</Text>
          </View>
        </View>
      </View>
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
