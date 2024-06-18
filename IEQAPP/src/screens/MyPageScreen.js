// src/screens/MyPageScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>마이페이지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyPageScreen;
