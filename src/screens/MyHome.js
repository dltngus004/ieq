import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions, Image, Modal, FlatList } from 'react-native';
import MainProfile from '../components/MainProfile.js';
import ExternalEnvironment from '../components/ExternalEnvironment.js';
import WarningAlarm from '../components/WarningAlarm.js';
import { renderItem } from '../components/DailyMood.js';
import DeviceAirQuality from '../components/DeviceAirQuality.js';
import MoodLightStatus from '../components/MoodLightStatus.js';
import AirQualityItem from '../components/AirQualityItem.js';
import NotificationIcon from '../components/NotificationIcon.js';
import { UserContext } from '../context/UserContext'; // UserContext 임포트
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; // 아이콘 추가
import Swiper from 'react-native-swiper';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight
} from '../utils/utils.js';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const MyHome = ({ navigation, route, moodItems = [], setMoodItems }) => {
  const { height: viewportHeight } = useWindowDimensions();
  const { serialNumber, setSerialNumber, devices, setDevices } = useContext(UserContext);
  const [aqi, setAqi] = useState(null);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);
  const [nickname, setNickname] = useState('사용자');
  const [profileImage, setProfileImage] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 추가: username 관리
  const [username, setUsername] = useState(route?.params?.username || '사용자');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null
    });
  }, [navigation]);

  // route.params가 업데이트될 때를 대비한 부분에서도 조건을 추가
  useEffect(() => {
    if (route.params && route.params.username) {
      setUsername(route.params.username);
      console.log('Updated Username:', route.params.username);
    }
  }, [route.params]);

  // Firestore에 사용자 데이터 저장하는 함수 (username 추가)
  const saveUserData = async () => {
    try {
      const userData = {
        serialNumber,
        nickname,
        airQualityData,
        username,  // username 추가
      };
      await firestore()
        .collection('users')
        .doc('관리자_이메일')  // 실제 관리자 이메일로 변경 필요
        .set(userData, { merge: true }); // 병합하여 저장
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Firestore에서 사용자 데이터 불러오는 함수
  const loadUserData = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc('관리자_이메일')  // 실제 관리자 이메일로 변경 필요
        .get();

      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();
        console.log('User data loaded:', userData);
        setSerialNumber(userData.serialNumber);
        setNickname(userData.nickname);
        setAirQualityData(userData.airQualityData);
        setUsername(userData.username); // Firestore에서 가져온 username 설정
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // 로그인 후에 Firestore에서 사용자 데이터를 불러오기
  useEffect(() => {
    loadUserData();  // 컴포넌트가 로드될 때 Firestore에서 사용자 데이터를 불러옴
  }, []);

  useEffect(() => {
    if (serialNumber) {
      setIsDeviceRegistered(true);
      saveUserData();  // serialNumber가 설정될 때마다 Firestore에 저장
    }
  }, [serialNumber, nickname, airQualityData, username]); // username도 의존성에 추가

  useEffect(() => {
    console.log('Route Params:', route.params);

    if (route.params) {
      if (route.params.nickname) {
        setNickname(route.params.nickname);
        console.log('Updated Nickname:', route.params.nickname);
      }
      if (route.params.serialNumber) {
        setSerialNumber(route.params.serialNumber); // serialNumber를 UserContext에 설정
        console.log('Updated Serial Number:', route.params.serialNumber);
      }
      if (route.params.airQualityData) {
        setAirQualityData(route.params.airQualityData);
        console.log('Updated Air Quality Data:', route.params.airQualityData);
      }
      if (route.params.username) {
        setUsername(route.params.username); // username도 추가로 받아옴
        console.log('Updated Username:', route.params.username);
      }
    }
  }, [route.params, setSerialNumber]);

  const handleProfileData = (nickname, profileImage) => {
    setNickname(nickname);
    setProfileImage(profileImage);
  };

  const handleDataFetched = (data) => {
    const aqiData = data.find(item => item.label === 'AQI');
    setAqi(aqiData ? aqiData.value : null);
    console.log('Fetched data from AirQualityItem:', data); // AirQualityItem에서 가져온 데이터 로그 추가
  };

  const handleSetRating = (id, rating) => {
    const updatedMoodItems = moodItems.map(item => {
      if (item.id === id) {
        return { ...item, rating };
      }
      return item;
    });
    setMoodItems(updatedMoodItems);
  };

  const handleRegisterPress = () => {
    navigation.navigate('SecondStep');
  };

  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const goToMoodLightDetails = () => {
    navigation.navigate('MoodLightDetails', { deviceName: nickname, serialNumber });
  };

  const goToAirQualityDetails = () => {
    navigation.navigate('AirQualityDetails', { serialNumber });
  };

  const openDeviceModal = () => {
    setIsModalVisible(true);
  };

  const closeDeviceModal = () => {
    setIsModalVisible(false);
  };

  const selectDevice = (device) => {
    setSerialNumber(device.serialNumber);
    setNickname(device.nickname);
    closeDeviceModal();
  };

  // 중복 기기를 제거하는 함수
  const uniqueDevices = devices.filter((device, index, self) => 
    index === self.findIndex((d) => (
      d.serialNumber === device.serialNumber && d.nickname
    ))
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MainProfile 
          navigation={navigation} 
          nickname={nickname} 
          profileImage={profileImage}
          username={username}  // username을 MainProfile에 전달
        />
        <View style={styles.row}>
          <NotificationIcon navigation={navigation} hasNotifications={true} />
          <TouchableOpacity onPress={openDeviceModal} style={styles.deviceButton}>
            <Icon name="ios-list" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ExternalEnvironment />
      {isDeviceRegistered ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <WarningAlarm />
          <View>
            <Text style={styles.title}>오늘 하루, 어떠신가요?</Text>
            <Swiper style={styles.wrapper} loop={false} showsPagination={false} index={0} autoplay={false} height={viewportHeight * 0.07}>
              {moodItems.map(item => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('AI 모드', { screen: 'AiMordHome', params: { serialNumber } })}>
                  {renderItem(item, handleSetRating, navigation)}
                </TouchableOpacity>
              ))}
            </Swiper>
          </View>
          <DeviceAirQuality 
            navigation={navigation} 
            aqi={aqi} 
            airQualityData={airQualityData} 
            deviceNickname={nickname} 
            goToAirQualityDetails={goToAirQualityDetails} 
          />
          <Text style={styles.subtitle}>무드등 상태</Text>
          <TouchableOpacity style={styles.width} onPress={goToMoodLightDetails}>
            <MoodLightStatus deviceName={nickname} serialNumber={serialNumber} />
          </TouchableOpacity>
          <AirQualityItem onDataFetched={handleDataFetched} serialNumber={serialNumber} />
        </ScrollView>
      ) : (
        <View style={styles.registerContainer}>
          <View style={styles.registerTop}>
            <Text style={styles.registerTitle}>등록해야 할 IEQ 기기가 있어요!</Text>
            <Text style={styles.registerSubtitle}>지금 바로 IEQ를 등록하고</Text>
            <Text style={styles.registerSubtitle}>나에게 최적인 환경을 제공받아보세요!</Text>
          </View>
          <View style={styles.img}>
            <Image source={require('../assets/images/addDevice.png')} style={styles.deviceImage} />
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
            <Text style={styles.registerButtonText}>IEQ 등록 시작하기</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>기기 목록</Text>
            <FlatList
              data={uniqueDevices}
              keyExtractor={(item) => item.serialNumber}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.deviceItem} onPress={() => selectDevice(item)}>
                  <Text style={styles.deviceItemText}>{item.nickname}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeDeviceModal}>
              <Text style={styles.modalCloseButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#F2F4F8',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deviceButton: {
    padding: getResponsivePadding(10),
  },
  fixedTop: {
    zIndex: 1,
    paddingBottom: getResponsivePadding(10),
  },
  scrollContainer: {
    paddingBottom: getResponsivePadding(20),
  },
  title: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000',
    paddingVertical: getResponsivePadding(10),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginTop: getResponsiveMargin(10),
    color: '#000',
  },
  registerContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
  },
  registerTop: {},
  registerTitle: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    textAlign: 'center',
    color: '#000',
  },
  registerSubtitle: {
    fontSize: getResponsiveFontSize(16),
    textAlign: 'center',
    color: '#000',
  },
  img: {},
  deviceImage: {
    width: isTablet ? getResponsiveWidth(60) : getResponsiveWidth(80),
    height: isTablet ? getResponsiveHeight(20) : getResponsiveHeight(30),
    marginBottom: getResponsiveMargin(20),
  },
  registerButton: {
    width: '90%',
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: getResponsiveFontSize(18),
    color: 'white',
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(20),
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: getResponsivePadding(20),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(20),
    color: '#000',
  },
  deviceItem: {
    width: '100%',
    paddingVertical: getResponsivePadding(15),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deviceItemText: {
    fontSize: getResponsiveFontSize(16),
    textAlign: 'center',
    color: '#000',
  },
  modalCloseButton: {
    marginTop: getResponsiveMargin(20),
  },
  modalCloseButtonText: {
    fontSize: getResponsiveFontSize(18),
    color: '#1e90ff',
  },
});

export default MyHome;
