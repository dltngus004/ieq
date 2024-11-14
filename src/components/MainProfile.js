import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Overlay } from 'react-native-elements';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const MainProfile = ({ navigation }) => {
  const { userName, nickname, profileImage } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('MainProfile Nickname:', nickname);
    console.log('MainProfile Profile Image:', profileImage);
  }, [nickname, profileImage]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const goToMyPage = () => {
    setVisible(false);
    navigation.navigate('MyPageScreen');
  };

  const logout = async () => {
    setVisible(false);
    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/IEQLogin', {
        UserId: userName,
        AppReq: 'kakao',
        AppReq2: '2',
        AppReq3: '1440'
      });

      if (response.data.code === 2) {
        Alert.alert('로그아웃', '로그아웃에 성공했습니다.');
      } else {
        Alert.alert('로그아웃 실패', '로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      Alert.alert('로그아웃 오류', '로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={toggleOverlay}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
          )}
        </TouchableOpacity>
        <Text style={styles.greetingText}>{nickname}님, 반가워요!</Text>
      </View>

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
    borderRadius: 100,
  },
  greetingText: {
    paddingHorizontal: 20,
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
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
    marginVertical: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MainProfile;
