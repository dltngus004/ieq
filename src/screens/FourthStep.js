import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';
import { UserContext } from '../context/UserContext';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const FourthStep = ({ navigation }) => {
  const route = useRoute();
  const { userName, nickname: userNickname, devices, setDevices } = useContext(UserContext);
  const suggestedNicknames = ['연구소', '휴게실', '거실', '서재', '침실'];
  const [nickname, setNickname] = useState(route.params?.nickname || '');
  const serialNumber = route.params?.serialNumber;

  useEffect(() => {
    if (!nickname) {
      const randomNickname = suggestedNicknames[Math.floor(Math.random() * suggestedNicknames.length)];
      setNickname(randomNickname);
    }
  }, []);

  const handleContinue = async () => {
    const requestData = {
      UserId: userName,
      AppReq: serialNumber,
      AppReq2: nickname
    };

    console.log('Sending data to server:', requestData);

    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/IEQRegisterNickName', requestData);
      console.log('Response data:', response.data);

      if (response.data.code === 1) {
        setDevices([...devices, { nickname, serialNumber }]); // devices 상태 업데이트
        Alert.alert('성공', '닉네임을 등록했습니다.', [
          { text: '확인', onPress: () => navigation.navigate('FifthStep', { nickname, serialNumber }) }
        ]);
      } else {
        Alert.alert('오류', response.data.codeExplain);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('오류', '서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>01</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>02</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonActive}>
          <Text style={styles.stepTextActive}>03</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentTit}>
          <Text style={styles.title}>감사합니다:) {'\n'}<Text style={[styles.title, styles.bold]}>{userNickname}님</Text>의 {'\n'}기기등록이 완료되었습니다!</Text>
          <Text style={styles.subtitle}>원하시는 기기의 닉네임을 설정해주세요.</Text>
        </View>
        <View style={styles.contentInput}>
          <Image source={require('../assets/images/device_img.png')} style={styles.deviceImage} />
          <TextInput
            style={[styles.input, styles.inputTextColor]}
            value={nickname}
            onChangeText={setNickname}
            placeholder="기기 닉네임을 입력해주세요."
            placeholderTextColor="#999"
          />
          <View style={styles.footer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>계속하기</Text>
            </TouchableOpacity>
            <Text style={styles.subtitleSmall}>보티에서 자동으로 쉽게 입력해줘요!</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: getResponsiveMargin(20),
  },
  stepButtonActive: {
    width: isTablet ? getResponsiveWidth(6) : getResponsiveWidth(12),
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(9),
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2),
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  stepButtonInactive: {
    width: isTablet ? getResponsiveWidth(6) : getResponsiveWidth(12),
    height: isTablet ? getResponsiveHeight(4) : getResponsiveHeight(9),
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2),
  },
  stepTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(16),
  },
  stepTextInactive: {
    color: '#ccc',
    fontSize: getResponsiveFontSize(16),
  },
  line: {
    width: getResponsiveWidth(8),
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: getResponsiveMargin(2),
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '70%',
  },
  contentTit: {
    width: '100%',
  },
  title: {
    fontSize: getResponsiveFontSize(25),
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    marginBottom: getResponsiveMargin(20),
  },
  contentInput: {
    width: '100%',
    alignItems: 'center',
  },
  deviceImage: {
    width: isTablet ? getResponsiveWidth(30) : getResponsiveWidth(80),
    height: isTablet ? getResponsiveHeight(20) : getResponsiveHeight(30),
    resizeMode: 'contain',
    marginVertical: getResponsiveMargin(20),
  },
  input: {
    width: '100%',
    padding: getResponsivePadding(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: getResponsiveWidth(1),
    marginBottom: getResponsiveMargin(10),
  },
  inputTextColor: {
    color: '#000',
  },
  footer: {
    width: '100%',
    paddingTop: getResponsivePadding(20),
  },
  subtitleSmall: {
    fontSize: getResponsiveFontSize(14),
    color: '#999',
    textAlign: 'center',
    marginTop: getResponsiveMargin(20),
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1e90ff',
    paddingVertical: getResponsivePadding(15),
    paddingHorizontal: getResponsivePadding(30),
    borderRadius: getResponsiveWidth(1),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FourthStep;
