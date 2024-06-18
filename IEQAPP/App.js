import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import MyHome from './src/screens/MyHome'; // MyHome 컴포넌트 임포트
import AirQualityDetails from './src/screens/AirQualityDetails'; // AirQualityDetails 컴포넌트 임포트
import MoodLightDetails from './src/screens/MoodLightDetails'; // MoodLightDetails 컴포넌트 임포트

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={MyHome} />
    <HomeStack.Screen name="AirQualityDetails" component={AirQualityDetails} />
    <HomeStack.Screen name="MoodLightDetails" component={MoodLightDetails} />
  </HomeStack.Navigator>
);

const AiMord = () => {
  return (
    <View style={styles.container}>
      <Text>Ai mord</Text>
    </View>
  );
}

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AI 모드" component={AiMord} />
        <Tab.Screen name="홈" component={HomeStackScreen} />
        <Tab.Screen name="나" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelloWorldApp;
