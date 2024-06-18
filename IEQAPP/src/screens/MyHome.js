// src/screens/MyHome.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MainProfile from '../components/MainProfile';
import ExternalApi from '../components/ExternalApi';
import WarningAlarm from '../components/WaringAlarm';
import DeviceAirQuality from '../components/DeviceAirQuality';
import DailyMood from '../components/DailyMood';
import MoodLightStatus from '../components/MoodLightStatus';

const MyHome = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <View style={styles.fixedTop}>
            <MainProfile navigation={navigation} />
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <WarningAlarm />
            <ExternalApi />
            <Text style={styles.title}>오늘 하루, 어떠신가요?</Text>
            <DailyMood />
            <DeviceAirQuality navigation={navigation} />
            <Text style={styles.subtitle}>무드등 상태</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MoodLightDetails', { deviceName: '보티 연구소' })}>
              <MoodLightStatus deviceName="보티 연구소" initialStatus={false} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MoodLightDetails', { deviceName: '기기02' })}>
              <MoodLightStatus deviceName="기기02" initialStatus={true} />
            </TouchableOpacity>
          </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    fixedTop: {
      width: '100%',
      backgroundColor: '#fff',
      paddingBottom: 10, // 필요에 따라 조정
    },
    scrollContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
      width: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 20,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
  });

export default MyHome;
