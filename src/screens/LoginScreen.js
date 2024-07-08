import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveImageSize } from '../utils/utils'; // 유틸리티 함수 임포트

const LoginScreen = ({ navigation }) => {

  const imageUrls = [
    require('../assets/images/naver.png'),
    require('../assets/images/kako.png'),
    require('../assets/images/google.png'),
  ];

  const handleLogin = (provider) => {
    // 각 로그인 프로바이더별 로그인 로직 구현
    console.log(`${provider} 로그인`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginTop}>
        <View style={styles.loginTItleWrap}>
          <Text style={styles.loginTitle}>맞춤형 환경 관리,</Text>
          <Text style={styles.loginTitle}>더 쉽고 간편하게 <Text style={styles.loginTitleBlue}>IEQ</Text>로 관리하세요 :)</Text>
        </View>
        <View style={styles.loginBtWrap}>
          <TouchableOpacity
            style={[styles.loginButton, styles.naverButton]}
            onPress={() => handleLogin('네이버')}
          >
            <Image source={imageUrls[0]} style={styles.notification} />
            <Text style={styles.loginText}>네이버 로그인</Text>
            <Text> </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.kakaoButton]}
            onPress={() => handleLogin('카카오')}
          >
            <Image source={imageUrls[1]} style={styles.notification} />
            <Text style={styles.loginText}>카카오 로그인</Text>
            <Text> </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.googleButton]}
            onPress={() => handleLogin('구글')}
          >
            <Image source={imageUrls[2]} style={styles.notification} />
            <Text style={styles.loginText}>구글 로그인</Text>
            <Text> </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.defaultLoginButton]}
            onPress={() => navigation.navigate('UserInfoScreen')}
          >
            <Text style={styles.loginText}>일단 이거로 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imgLocation}>
        <Image source={require('../assets/images/device_img.png')} style={styles.deviceImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: getResponsivePadding(30),
  },
  loginTop: {
    width: '100%'
  },
  loginTItleWrap: {
    width: '100%',
    paddingBottom: getResponsivePadding(70),
  },
  loginTitle: {
    fontSize: getResponsiveFontSize(35),
    color: '#000',
    fontWeight: '400'
  },
  loginTitleBlue: {
    color: '#3261E6',
    fontWeight: 'bold'
  },
  loginBtWrap: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
    padding: getResponsivePadding(20),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  googleButton: {
    backgroundColor: '#F2F4F6',
  },
  defaultLoginButton: {
    backgroundColor: '#A9A9A9',
  },
  loginText: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    fontWeight: '500'
  },
  notification: {
    width: getResponsiveIconSize(30),
    height: getResponsiveIconSize(30),
  },
  imgLocation: {
    width: '100%',
    alignItems: 'flex-end',
  },
  deviceImage: {
    width: getResponsiveImageSize(300),
    height: getResponsiveImageSize(200),
    resizeMode: 'contain',
  },
});

export default LoginScreen;
