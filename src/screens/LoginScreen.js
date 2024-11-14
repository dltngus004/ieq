import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage'; 
import { login as kakaoLogin, getProfile as kakaoGetProfile } from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NaverLogin, getProfile as getNaverProfile } from '@react-native-seoul/naver-login';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext'; 

GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
});

const naverKeys = {
  kConsumerKey: "YOUR_NAVER_CLIENT_ID",
  kConsumerSecret: "YOUR_NAVER_CLIENT_SECRET",
  kServiceAppName: "MyNaverApp",
  kServiceAppUrlScheme: "myapp"
};

// SQLite 데이터베이스 연결
const db = SQLite.openDatabase(
  {
    name: 'users.db',
    location: 'default',
  },
  () => {
    console.log('데이터베이스 연결 성공');
  },
  (error) => {
    console.error('데이터베이스 연결 실패:', error);
    Alert.alert('데이터베이스 연결 실패', '데이터베이스를 열 수 없습니다.');
  }
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUserName, setSerialNumber } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const imageUrls = [
    require('../assets/images/naver.png'),
    require('../assets/images/kako.png'),
    require('../assets/images/google.png'),
  ];

  // SQLite 데이터베이스에서 사용자 테이블을 생성하는 함수
  const createTables = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)',
        [],
        () => {
          console.log('users 테이블 생성 성공');
        },
        error => {
          console.log('users 테이블 생성 실패:', error);
        }
      );
    
      // 기존 테이블 삭제 부분을 제거하고, 테이블이 없을 경우에만 생성합니다.
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS userDevices (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, serialNumber TEXT, nickname TEXT, airQualityData TEXT)',
        [],
        () => { console.log('userDevices 테이블 생성 성공'); },
        error => { console.log('userDevices 테이블 생성 실패:', error); }
      );
    });
    
  };

  // 기기 등록 정보 저장 함수
  const saveDeviceData = (email, serialNumber, nickname, airQualityData) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO userDevices (email, serialNumber, nickname, airQualityData) VALUES (?, ?, ?, ?)',
        [email, serialNumber, nickname, JSON.stringify(airQualityData)],
        () => { console.log('기기 정보 저장 성공'); },
        error => { console.log('기기 정보 저장 실패:', error); }
      );
    });
  };

  // 기기 정보 불러오기 함수
  const loadDeviceData = (userEmail) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM userDevices WHERE email = ?',
        [userEmail],
        (tx, results) => {
          if (results.rows.length > 0) {
            const deviceData = results.rows.item(0);
            setSerialNumber(deviceData.serialNumber);
            console.log('기기 정보 불러오기 성공:', deviceData);
          } else {
            console.log('기기 정보 없음');
          }
        },
        error => {
          console.log('기기 정보 불러오기 중 오류 발생:', error);
        }
      );
    });
  };

  // 일반 로그인 처리
  const handleLocalLogin = () => {
    if (!email || !password) {
      Alert.alert('로그인 실패', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 특정 이메일과 비밀번호로 바로 로그인 처리
    if (email === 'test1234' && password === 'vo210ty101@') {
      Alert.alert('로그인 성공', '테스트 계정으로 로그인되었습니다.');
      setUserName(email); 
      loadDeviceData(email); // 로그인 후 기기 정보 불러오기
      navigation.navigate('MainTabs', { screen: 'MyHome' });
      return;
    }

    // 기존 로그인 방식
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (tx, results) => {
          if (results && results.rows.length > 0) {
            Alert.alert('로그인 성공', '로그인에 성공하였습니다.');
            setUserName(email); 
            loadDeviceData(email); // 로그인 후 기기 정보 불러오기
            navigation.navigate('MainTabs', { screen: 'MyHome' });
          } else {
            Alert.alert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
          }
        },
        error => {
          console.log('로그인 중 오류 발생:', error);
        }
      );
    });
  };

  // 카카오톡 로그인 처리
  const handleKakaoLogin = async () => {
    try {
      const result = await kakaoLogin();
      if (result) {
        const profile = await kakaoGetProfile();
        if (profile) {
          Alert.alert('카카오 로그인 성공', `안녕하세요, ${profile.nickname}님!`);
          setUserName(profile.nickname);
          loadDeviceData(profile.email); // 카카오 로그인 후 기기 정보 불러오기
          navigation.navigate('MainTabs', { screen: 'MyHome' });
        } else {
          Alert.alert('카카오 프로필을 불러올 수 없습니다.');
        }
      } else {
        Alert.alert('카카오 로그인 실패');
      }
    } catch (err) {
      Alert.alert('카카오 로그인 실패', err.message);
    }
  };

  // 구글 로그인 처리
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      Alert.alert('구글 로그인 성공', `안녕하세요, ${userCredential.user.displayName}님!`);
      setUserName(userCredential.user.displayName);
      loadDeviceData(userCredential.user.email); // 구글 로그인 후 기기 정보 불러오기
      navigation.navigate('MainTabs', { screen: 'MyHome' });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('구글 로그인 실패', '로그인이 취소되었습니다.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('구글 로그인 실패', '로그인 진행 중입니다.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('구글 로그인 실패', 'Google Play 서비스가 없습니다.');
      } else {
        Alert.alert('구글 로그인 실패', error.message);
      }
    }
  };

  // 네이버 로그인 처리
  const handleNaverLogin = async () => {
    try {
      const result = await NaverLogin.login(naverKeys);
      if (result) {
        const profileResult = await getNaverProfile(result.accessToken);
        if (profileResult) {
          Alert.alert('네이버 로그인 성공', `안녕하세요, ${profileResult.response.nickname}님!`);
          setUserName(profileResult.response.nickname);
          loadDeviceData(profileResult.response.email); // 네이버 로그인 후 기기 정보 불러오기
          navigation.navigate('MainTabs', { screen: 'MyHome' });
        } else {
          Alert.alert('네이버 프로필을 불러올 수 없습니다.');
        }
      } else {
        Alert.alert('네이버 로그인 실패');
      }
    } catch (error) {
      Alert.alert('네이버 로그인 실패', error.message);
    }
  };

  useEffect(() => {
    // 앱이 실행될 때 테이블을 생성
    createTables();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginTop}>
        <View style={styles.loginTItleWrap}>
          <Text style={styles.loginTitle}>맞춤형 환경 관리,</Text>
          <Text style={styles.loginTitle}>더 쉽고 간편하게 <Text style={styles.loginTitleBlue}>IEQ</Text>로 관리하세요 :)</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="아이디 (이메일)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.loginBtWrap}>
          <TouchableOpacity
            style={[styles.loginButton, styles.defaultLoginButton]}
            onPress={handleLocalLogin}
          >
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.naverButton]}
            onPress={handleNaverLogin}
          >
            <Image source={imageUrls[0]} style={styles.notification} />
            <Text style={styles.loginText}>네이버 로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.kakaoButton]}
            onPress={handleKakaoLogin}
          >
            <Image source={imageUrls[1]} style={styles.notification} />
            <Text style={styles.loginText}>카카오 로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, styles.googleButton]}
            onPress={handleGoogleLogin}
          >
            <Image source={imageUrls[2]} style={styles.notification} />
            <Text style={styles.loginText}>구글 로그인</Text>
          </TouchableOpacity>

           {/* 임시 로그인 버튼 */}
           <TouchableOpacity
            style={[styles.loginButton, styles.defaultLoginButton]}
            onPress={() => navigation.navigate('UserInfoScreen')}
          >
            <Text style={styles.loginText}>임시 로그인</Text>
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
    padding: 30,
  },
  loginTop: {
    width: '100%',
  },
  loginTItleWrap: {
    width: '100%',
    paddingBottom: 70,
  },
  loginTitle: {
    fontSize: 35,
    color: '#000',
    fontWeight: '400',
  },
  loginTitleBlue: {
    color: '#3261E6',
    fontWeight: 'bold',
  },
  loginBtWrap: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  notification: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  imgLocation: {
    width: '100%',
    alignItems: 'flex-end',
  },
  deviceImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    color: '#000',
  },
});

export default LoginScreen;
