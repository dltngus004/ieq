import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AddressSearchModal from '../components/AddressSearchModal';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveImageSize } from '../utils/utils';
import { UserContext } from '../context/UserContext';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const UserInfoScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setUserName } = useContext(UserContext);

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    setIsModalVisible(false);
  };

  const validateBirthDate = (date) => {
    const regex = /^\d{4}\d{2}\d{2}$/;
    if (!regex.test(date)) {
      return false;
    }
    const year = parseInt(date.substring(0, 4), 10);
    const month = parseInt(date.substring(4, 6), 10);
    const day = parseInt(date.substring(6, 8), 10);
    if (year < 1900 || year > new Date().getFullYear()) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validateBirthDate(birthDate)) {
      Alert.alert("오류", "생년월일 형식이 맞지 않습니다. YYYYMMDD 형식으로 입력해주세요.");
      return;
    }

    const requestData = {
      UserName: id,
      BirthDay: birthDate,
      Gender: gender === '여성' ? 'F' : 'M',
      Street: address,
      DetailStreet: detailedAddress
    };

    console.log('Sending data to server:', requestData);

    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/CreateIEQPart1', requestData);
      console.log('Response data:', response.data);
      if (response.data.code === 1) {
        setUserName(id);
        const loginResponse = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/IEQLogin', {
          UserId: id,
          AppReq: 'kakao',
          AppReq2: '1',
          AppReq3: '1440'
        });
        console.log('로그인 성공:', loginResponse.data);

        Alert.alert("성공", "다음 단계로 진행합니다.", [{ text: "확인", onPress: () => navigation.navigate('NicknameScreen') }]);
      } else {
        Alert.alert("오류", response.data.codeExplain);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("오류", "서버와의 통신에 실패했습니다.");
    }
  };

  const getGenderButtonStyle = (currentGender) => [
    styles.genderButton,
    gender === currentGender && styles.selectedGender
  ];

  const getGenderTextStyle = (currentGender) => [
    styles.genderText,
    gender === currentGender && styles.selectedGenderText
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={getResponsiveIconSize(40)} color="#BFBFBF" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.stepText}>01</Text>
        <Text style={styles.title}>정보를 입력하세요.</Text>
        <Text style={styles.subtitle}>IEQ를 더 편하게 이용하기 위해 입력 해주세요.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={[styles.input, styles.inputTextColor]}
          value={id}
          onChangeText={setId}
          placeholder="아이디를 입력하세요."
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>생년월일</Text>
        <TextInput
          style={[styles.input, styles.inputTextColor]}
          value={birthDate}
          onChangeText={setBirthDate}
          placeholder="생년월일 8자리 (YYYYMMDD)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={8}
        />
        <Text style={styles.label}>성별</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={getGenderButtonStyle('여성')}
            onPress={() => setGender('여성')}
          >
            <Text style={getGenderTextStyle('여성')}>여성</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getGenderButtonStyle('남성')}
            onPress={() => setGender('남성')}
          >
            <Text style={getGenderTextStyle('남성')}>남성</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>주소</Text>
        <TouchableOpacity style={styles.addressContainer} onPress={() => setIsModalVisible(true)}>
          <Ionicons name="location-sharp" size={getResponsiveIconSize(24)} color="#000" style={styles.addressIcon} />
          <TextInput
            style={styles.inputTextColor}
            value={address}
            editable={false}
            placeholder="건물, 지번 또는 도로명 검색"
            placeholderTextColor="#999"
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, styles.inputTextColor]}
          value={detailedAddress}
          onChangeText={setDetailedAddress}
          placeholder="상세주소를 입력해주세요."
          placeholderTextColor="#999"
        />
        <Text style={styles.almostDone}>거의 다와가요!</Text>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>계속하기</Text>
        </TouchableOpacity>
        <AddressSearchModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddressSelect={handleAddressSelect}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: getResponsivePadding(20),
  },
  formContainer: {
    paddingHorizontal: getResponsivePadding(20),
    paddingBottom: getResponsivePadding(20),
  },
  backButton: {
    marginBottom: getResponsiveMargin(30),
  },
  backIcon: {
    width: getResponsiveIconSize(44),
    height: getResponsiveIconSize(44),
  },
  stepText: {
    fontSize: getResponsiveFontSize(50),
    color: '#3261E6',
    fontWeight: 'bold'
  },
  title: {
    fontSize: getResponsiveFontSize(30),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    marginBottom: getResponsiveMargin(40),
  },
  label: {
    fontSize: getResponsiveFontSize(16),
    marginBottom: getResponsiveMargin(5),
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: getResponsivePadding(15),
    borderRadius: 5,
    marginBottom: getResponsiveMargin(20),
    fontSize: isTablet ? getResponsiveFontSize(12) : getResponsiveFontSize(15),
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: getResponsiveMargin(20),
  },
  genderButton: {
    flex: 1,
    padding: getResponsivePadding(15),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: getResponsiveMargin(5),
  },
  selectedGender: {
    borderColor: '#007AFF',
  },
  selectedGenderText: {
    color: '#007AFF',
  },
  genderText: {
    color: '#000',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
    borderWidth: 1,
    borderColor: '#ccc',
    padding: getResponsivePadding(5),
    borderRadius: 5,
  },
  addressIcon: {
    width: getResponsiveIconSize(24),
    height: getResponsiveIconSize(24),
    marginRight: getResponsiveMargin(10),
  },
  addressInput: {
    flex: 1,
  },
  almostDone: {
    fontSize: getResponsiveFontSize(14),
    color: '#BFBFBF',
    textAlign: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: getResponsivePadding(15),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
  },
  continueButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500'
  },
});

export default UserInfoScreen;
