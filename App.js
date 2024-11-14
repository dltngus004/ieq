import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'react-native';
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
import SurveyScreen from './src/screens/SurveyScreen';
import DeviceRegistration from './src/screens/DeviceRegistration';
import SecondStep from './src/screens/SecondStep';
import ThirdStep from './src/screens/ThirdStep';
import FourthStep from './src/screens/FourthStep';
import FifthStep from './src/screens/FifthStep';
import { UserProvider, UserContext } from './src/context/UserContext'; // UserProvider와 UserContext 임포트
import { loadUserData } from './src/components/auth'; // loadUserData 함수 임포트

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AiMordStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const initialMoodItems = [
  { id: 1, moodName: '수면', rating: 0, image: require('./src/assets/images/night.png') },
  { id: 2, moodName: '공부', rating: 0, image: require('./src/assets/images/study.png') },
  { id: 3, moodName: '산책', rating: 0, image: require('./src/assets/images/running.png') },
  { id: 4, moodName: '요리', rating: 0, image: require('./src/assets/images/cook.png') }
];

const HomeStackScreen = ({ moodItems, setMoodItems, serialNumber }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="MyHome">
      {props => <MyHome {...props} moodItems={moodItems} setMoodItems={setMoodItems} serialNumber={serialNumber} />}
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


const AiMordScreen = ({ moodItems, setMoodItems, serialNumber }) => (
  <AiMordStack.Navigator>
    <AiMordStack.Screen name="AiMordHome">
      {props => <AiMordHome {...props} moodItems={moodItems} setMoodItems={setMoodItems} serialNumber={serialNumber} />}
    </AiMordStack.Screen>
    <AiMordStack.Screen name="AiAnalysisPage" component={AiAnalysisPage} />
  </AiMordStack.Navigator>
);

const SettingsScreen = ({ serialNumber }) => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="SettingsMordHome">
      {props => <SettingsMordHome {...props} serialNumber={serialNumber} />}
    </SettingsStack.Screen>
    <SettingsStack.Screen name="FAQScreen" component={FAQScreen} />
    <SettingsStack.Screen name="ContactScreen" component={ContactScreen} />
    <SettingsStack.Screen name="MyPageScreen" component={MyPageScreen} />
    <SettingsStack.Screen name="EditNickname" component={EditNickname} />
    <SettingsStack.Screen name="DeviceSetupScreen" component={DeviceSetupScreen} />
    <SettingsStack.Screen name="DeviceManagementScreen" component={DeviceManagementScreen} />
  </SettingsStack.Navigator>
);


const Tab = createBottomTabNavigator();

const MainTabs = ({ moodItems, setMoodItems, serialNumber }) => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarLabelPosition: 'below-icon',  // 레이블을 아이콘 아래에 배치
      tabBarStyle: {height: 70,  paddingBottom: 10,paddingTop: 10  }, // 탭바 스타일 추가
    }}
  >
    {/* AI 모드 탭 */}
    <Tab.Screen 
      name="AI 모드"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={
              focused
                ? require('./src/assets/images/ai_nav_active_img.png')  // 활성화된 상태일 때 아이콘
                : require('./src/assets/images/ai_nav_img.png')          // 비활성화된 상태일 때 아이콘
            }
            style={{ width: size, height: size, tintColor: color }} // 크기와 색상 적용
          />
        ),
      }}
    >
      {props => <AiMordScreen {...props} moodItems={moodItems} setMoodItems={setMoodItems} serialNumber={serialNumber} />}
    </Tab.Screen>

    {/* 홈 탭 */}
    <Tab.Screen
      name="홈"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={
              focused
                ? require('./src/assets/images/home_nav_active_img.png')  // 활성화된 상태일 때 아이콘
                : require('./src/assets/images/home_nav_active_img.png')          // 비활성화된 상태일 때 아이콘
            }
            style={{ width: size, height: size, tintColor: color }}  // 크기와 색상 적용
          />
        ),
      }}
    >
      {props => <HomeStackScreen {...props} moodItems={moodItems} setMoodItems={setMoodItems} serialNumber={serialNumber} />}
    </Tab.Screen>

    {/* 나(설정) 탭 */}
    <Tab.Screen
      name="나"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image
            source={
              focused
                ? require('./src/assets/images/my_nav_active_img.png')  // 활성화된 상태일 때 아이콘
                : require('./src/assets/images/my_nav_img.png')          // 비활성화된 상태일 때 아이콘
            }
            style={{ width: size, height: size, tintColor: color }} // 크기와 색상 적용
          />
        ),
      }}
    >
      {props => <SettingsScreen {...props} serialNumber={serialNumber} />}
    </Tab.Screen>
  </Tab.Navigator>
);


const RootStackScreen = () => {
  const [moodItems, setMoodItems] = useState(initialMoodItems);
  const { setUser, setSerialNumber } = useContext(UserContext); // setSerialNumber 추가
  const [initialRoute, setInitialRoute] = useState('Onboarding');
  const [serialNumber, setLocalSerialNumber] = useState('');

  useEffect(() => {
    const checkUserLogin = async () => {
      const userData = await loadUserData();
      if (userData) {
        setUser(userData);
        setInitialRoute('MainTabs');
        setLocalSerialNumber(userData.serialNumber || '');
        setSerialNumber(userData.serialNumber || ''); // UserContext에 serialNumber 설정
      }
    };

    checkUserLogin();
  }, [setUser, setSerialNumber]);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <RootStack.Screen name="Onboarding" component={Onboarding} />
      <RootStack.Screen name="MainTabs">
        {props => <MainTabs {...props} moodItems={moodItems} setMoodItems={setMoodItems} serialNumber={serialNumber} />}
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
  <UserProvider>
    <MoodLightProvider>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </MoodLightProvider>
  </UserProvider>
);

export default HelloWorldApp;
