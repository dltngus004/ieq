import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MyHome from './src/screens/MyHome';
import AirQualityDetails from './src/screens/AirQualityDetails';
import MoodLightDetails from './src/screens/MoodLightDetails';
import DetailAirQualityView from './src/screens/DetailAirQualityView';
import Notifications from './src/screens/Notifications';
import MyPageScreen from './src/screens/MyPageScreen';
import { MoodLightProvider } from './src/context/MoodLightContext';
import ExternalEnvironmentDetails from './src/screens/ExternalEnvironmentDetails';
import AiMordHome from './src/screens/AiMord';
import AiAnalysisPage from './src/screens/AiAnalysisPage';
import SettingsMordHome from './src/screens/SettingsMordHome';
import FAQScreen from './src/screens/FAQScreen';
import ContactScreen from './src/screens/ContactScreen';
import EditNickname from './src/screens/EditNickname';
import DeviceSetupScreen from './src/screens/DeviceSetupScreen';
import DeviceManagementScreen from './src/screens/DeviceManagementScreen';
import Onboarding from './src/screens/Onboarding';
import LoginScreen from './src/screens/LoginScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import NicknameScreen from './src/screens/NicknameScreen';
import InvitationScreen from './src/screens/InvitationScreen';
import SurveyScreen from './src/screens/SurveyScreen'; // 추가
import DeviceRegistration from './src/screens/DeviceRegistration'; // 추가
import SecondStep from './src/screens/SecondStep'
import ThirdStep from './src/screens/ThirdStep';
import FourthStep from './src/screens/FourthStep';
import FifthStep from './src/screens/FifthStep';

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AiMord = createStackNavigator();
const SettingsMord = createStackNavigator();

const initialMoodItems = [
  { id: 1, moodName: '수면', rating: 0, image: require('./src/assets/images/night.png') },
  { id: 2, moodName: '공부', rating: 0, image: require('./src/assets/images/study.png') },
  { id: 3, moodName: '산책', rating: 0, image: require('./src/assets/images/running.png') },
  { id: 4, moodName: '요리', rating: 0, image: require('./src/assets/images/cook.png') }
];

const HomeStackScreen = ({ moodItems, setMoodItems }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="MyHome">
      {props => <MyHome {...props} moodItems={moodItems} setMoodItems={setMoodItems} />}
    </HomeStack.Screen>
    <HomeStack.Screen name="AirQualityDetails" component={AirQualityDetails} />
    <HomeStack.Screen name="MoodLightDetails" component={MoodLightDetails} />
    <HomeStack.Screen name="DetailAirQualityView" component={DetailAirQualityView} />
    <HomeStack.Screen name="Notifications" component={Notifications} />
    <HomeStack.Screen name="MyPageScreen" component={MyPageScreen} />
    <HomeStack.Screen name="ExternalEnvironmentDetails" component={ExternalEnvironmentDetails} />
    <HomeStack.Screen name="EditNickname" component={EditNickname} />
    <HomeStack.Screen name="DeviceRegistration" component={DeviceRegistration} /> 
    <HomeStack.Screen name="SecondStep" component={SecondStep} />
    <HomeStack.Screen name="ThirdStep" component={ThirdStep} />
    <HomeStack.Screen name="FourthStep" component={FourthStep} />
    <HomeStack.Screen name="FifthStep" component={FifthStep} />
  </HomeStack.Navigator>
);

const AiMordScreen = ({ moodItems, setMoodItems }) => (
  <AiMord.Navigator>
    <AiMord.Screen name="AiMordHome">
      {props => <AiMordHome {...props} moodItems={moodItems} setMoodItems={setMoodItems} />}
    </AiMord.Screen>
    <AiMord.Screen name="AiAnalysisPage" component={AiAnalysisPage} />
  </AiMord.Navigator>
);

const SettingsScreen = () => (
  <SettingsMord.Navigator>
    <SettingsMord.Screen name="SettingsMordHome" component={SettingsMordHome} />
    <SettingsMord.Screen name="FAQScreen" component={FAQScreen} />
    <SettingsMord.Screen name="ContactScreen" component={ContactScreen} />
    <SettingsMord.Screen name="MyPageScreen" component={MyPageScreen} />
    <SettingsMord.Screen name="EditNickname" component={EditNickname} />
    <SettingsMord.Screen name="DeviceSetupScreen" component={DeviceSetupScreen} />
    <SettingsMord.Screen name="DeviceManagementScreen" component={DeviceManagementScreen} />
  </SettingsMord.Navigator>
);

const Tab = createBottomTabNavigator();

const MainTabs = ({ moodItems, setMoodItems }) => (
  <Tab.Navigator initialRouteName="홈">
    <Tab.Screen name="AI 모드">
      {props => <AiMordScreen {...props} moodItems={moodItems} setMoodItems={setMoodItems} />}
    </Tab.Screen>
    <Tab.Screen name="홈">
      {props => <HomeStackScreen {...props} moodItems={moodItems} setMoodItems={setMoodItems} />}
    </Tab.Screen>
    <Tab.Screen name="나" component={SettingsScreen} />
  </Tab.Navigator>
);


const RootStackScreen = () => {
  const [moodItems, setMoodItems] = useState(initialMoodItems);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Onboarding" component={Onboarding} />
      <RootStack.Screen name="MainTabs">
        {props => <MainTabs {...props} moodItems={moodItems} setMoodItems={setMoodItems} />}
      </RootStack.Screen>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <RootStack.Screen name="NicknameScreen" component={NicknameScreen} />
      <RootStack.Screen name="InvitationScreen" component={InvitationScreen} />
      <RootStack.Screen name="SurveyScreen" component={SurveyScreen} />
    </RootStack.Navigator>
  );
};

const HelloWorldApp = () => (
  <MoodLightProvider>
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  </MoodLightProvider>
);

export default HelloWorldApp;
