// src/screens/MoodLightDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoodLightDetails = ({ route }) => {
  const { deviceName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deviceName} 상세 페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MoodLightDetails;
