import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LocationComponent from '../components/LocationComponent';
import TemperatureComponent from '../components/TemperatureComponent';
import AirQualityComponent from '../components/AirQualityComponent';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils'; // 유틸리티 함수 임포트

const ExternalEnvironment = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ExternalEnvironmentDetails')}>
      <View style={styles.right}>
        <LocationComponent />
        <TemperatureComponent />
      </View>
      <AirQualityComponent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: getResponsivePadding(10),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  right: {
    flexDirection: 'column',
  },
});

export default ExternalEnvironment;
