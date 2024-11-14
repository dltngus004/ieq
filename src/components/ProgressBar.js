import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ value, color }) => {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flex: 4,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
});

export default ProgressBar;
