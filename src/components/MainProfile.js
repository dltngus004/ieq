import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import NotificationIcon from '../components/NotificationIcon';

const MainProfile = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // 알림 여부 상태 추가

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const goToMyPage = () => {
    setVisible(false);
    navigation.navigate('MyPageScreen');
  };

  const logout = () => {
    setVisible(false);
    console.log('로그아웃');
  };

  const goToNotifications = () => {
    navigation.navigate('Notifications');
  };

  const imageUrls = [
    require('../assets/images/profile.png'),
    require('../assets/images/bell.png'),
  ];

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileContainer}>
        {imageUrls.length > 1 && (
          <TouchableOpacity onPress={toggleOverlay}>
            <Image source={imageUrls[0]} style={styles.profileImage} />
          </TouchableOpacity>
        )}
        <Text style={styles.greetingText}>환경123님, 반가워요!</Text>
      </View>
      <NotificationIcon navigation={navigation} hasNotifications={true} />
      {/* <View style={styles.iconContainer}>
        <TouchableOpacity onPress={goToNotifications}>
          <Image source={imageUrls[1]} style={styles.notification} />
          {hasNotifications && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View> */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <TouchableOpacity style={styles.overlayButton} onPress={goToMyPage}>
            <Text style={styles.buttonText}>마이페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton} onPress={logout}>
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  greetingText: {
    paddingHorizontal: 20,
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold'
  },
  notification:{
    width: 30,
    height: 30,
  }, 
  notificationBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    width: 400,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginVertical: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  iconContainer: {
    position: 'relative',
  },
});

export default MainProfile;
