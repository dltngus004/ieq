// src/components/DeviceAirQuality.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const DeviceAirQuality = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('AirQualityDetails')}>
      <Text style={styles.deviceName}>보티 연구소</Text>
      
      <View style={styles.airQualityScore}>
        <Icon name="smile-o" type="font-awesome" />
        <Text style={styles.airQualityText}>20 실내 공기 나쁨</Text>
      </View>
      
      <View style={styles.managementOptions}>
        <View style={styles.managementItem}>
          <Icon name="cloud" type="font-awesome" />
          <Text style={styles.managementText}>미세 관리</Text>
        </View>
        <View style={styles.managementItem}>
          <Icon name="exchange" type="font-awesome" />
          <Text style={styles.managementText}>환기 관리</Text>
        </View>
        <View style={styles.managementItem}>
          <Icon name="tint" type="font-awesome" />
          <Text style={styles.managementText}>습도 관리</Text>
        </View>
      </View>
      
      <Text style={styles.ventilationWarning}>미세먼지가 높아 환기 필수에요!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  airQualityScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  airQualityText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ff6b6b',
  },
  managementOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  managementItem: {
    alignItems: 'center',
  },
  managementText: {
    marginTop: 5,
    fontSize: 14,
  },
  ventilationWarning: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
  },
});

export default DeviceAirQuality;
