// src/components/MoodLightStatus.js
import React, { useState } from 'react';
import { View, Text, Image, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MoodLightStatus = ({ deviceName, initialStatus }) => {
  const [isEnabled, setIsEnabled] = useState(initialStatus);
  const navigation = useNavigation();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const goToDetails = () => {
    navigation.navigate('MoodLightDetails', { deviceName, isEnabled });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToDetails}>
      <Image
        source={{ uri: 'https://path_to_your_image.png' }} // 여기를 이미지 경로로 바꿔주세요
        style={styles.image}
      />
      <View style={styles.textContainer}>
      <Text style={styles.deviceName}>{deviceName}</Text>
      <Text style={styles.status}>{isEnabled ? '무드등 ON' : '무드등 OFF'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
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
    image: {
      width: 50,
      height: 50,
      marginRight: 15,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    deviceName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    status: {
      fontSize: 14,
      color: '#555',
      marginVertical: 5,
    },
  });

export default MoodLightStatus;
