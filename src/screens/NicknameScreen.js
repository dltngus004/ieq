import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveImageSize } from '../utils/utils'; // 유틸리티 함수 임포트

const NicknameScreen = ({ navigation }) => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setNickname(generateRandomNickname());
  }, []);

  const handleContinue = () => {
    // 사용자 정보 제출 로직 구현
    console.log('Nickname:', nickname);
    console.log('Profile Image:', profileImage);
    navigation.navigate('InvitationScreen'); // 초대장 보내기 화면으로 이동
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const generateRandomNickname = () => {
    const keywords = ['환경사랑', '탄소절감', '지구지킴이', '자연보호', '에코프렌드', '그린워리어', '친환경인', '공기청정인'];
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomKeyword}${randomNumber}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={getResponsiveIconSize(40)} color="#BFBFBF" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.stepText}>02</Text>
      <Text style={styles.title}>닉네임을 알려주세요.</Text>
      <Text style={styles.subtitle}>본명이나 원하시는 닉네임을 입력 해보세요.</Text>
      <TouchableOpacity onPress={handleImagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={getResponsiveIconSize(150)} color="#ccc" style={styles.icon} />
        )}
      </TouchableOpacity>
      <TextInput 
        style={[styles.input, styles.inputTextColor]} 
        value={nickname} 
        onChangeText={setNickname} 
        placeholder="환경123" 
        placeholderTextColor="#999"
      />
      <Text style={styles.subtitleSmall}>보티에서 자동으로 쉽게 입력해줘요!</Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>계속하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: getResponsiveMargin(20),
  },
  backIcon: {
    width: getResponsiveIconSize(44),
    height: getResponsiveIconSize(44),
  },
  stepText: {
    fontSize: getResponsiveFontSize(50),
    color: '#3261E6',
    fontWeight:'bold'
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
  icon: {
    alignSelf: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  profileImage: {
    width: getResponsiveImageSize(100),
    height: getResponsiveImageSize(100),
    borderRadius: getResponsiveImageSize(50),
    alignSelf: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: getResponsivePadding(15),
    borderRadius: 5,
    marginBottom: getResponsiveMargin(50),
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  subtitleSmall: {
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
  },
  continueButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500'
  },
});

export default NicknameScreen;
