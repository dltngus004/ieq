import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveImageSize } from '../utils/utils'; // 유틸리티 함수 임포트

const InvitationScreen = ({ navigation }) => {
  const [groupName, setGroupName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInvite = () => {
    // 초대 로직 구현
    setIsModalVisible(true);
  };

  const handleSkip = () => {
    // 다음 스텝으로 건너뛰기
    navigation.navigate('SurveyScreen'); // 다음 스텝으로 이동
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={getResponsiveIconSize(40)} color="#BFBFBF" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.stepText}>03</Text>
        <Text style={styles.title}>초대장 보내기</Text>
        <Text style={styles.subtitle}>IEQ를 함께 사용하는 가족/친구와 함께 해보세요! </Text>
        <TextInput
          style={[styles.input, styles.inputTextColor]}
          value={groupName}
          onChangeText={text => {
            if (text.length <= 10) {
              setGroupName(text);
            }
          }}
          placeholder="그룹명을 입력해주세요."
          placeholderTextColor="#999"
        />
        <Text style={styles.charCount}>{groupName.length}/10자</Text>
      </View>
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/device_img.png')} style={styles.deviceImage} />
        </View>
        <TouchableOpacity style={styles.inviteButton} onPress={handleInvite}>
          <Text style={styles.inviteButtonText}>초대하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>건너뛰기</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={() => console.log('카카오톡 공유')}>
              <Text style={styles.modalButtonText}>카카오톡 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => console.log('문자 공유')}>
              <Text style={styles.modalButtonText}>문자 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonClose]} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonCloseText}>닫기</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  backButton: {
    marginBottom: getResponsiveMargin(20),
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: getResponsivePadding(15),
    borderRadius: 5,
  },
  inputTextColor: {
    color: '#000', // 텍스트 색상 설정
  },
  charCount: {
    fontSize: getResponsiveFontSize(12),
    color: '#999',
    marginBottom: getResponsiveMargin(20),
    textAlign: 'right',
    paddingTop: getResponsiveMargin(10)
  },
  imageContainer: {
    alignItems: 'flex-end',
    marginBottom: getResponsiveMargin(40),
  },
  deviceImage: {
    width: getResponsiveImageSize(300),
    height: getResponsiveImageSize(150),
  },
  inviteButton: {
    backgroundColor: '#007AFF',
    padding: getResponsivePadding(15),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10)
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(16),
  },
  skipButton: {
    borderColor: '#002060',
    borderWidth: 1,
    padding: getResponsivePadding(15),
    borderRadius: 5,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#002060',
    fontSize: getResponsiveFontSize(16),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: getResponsivePadding(15),
    borderBottomWidth: 2,
    borderColor: '#F2F2F2',
  },
  modalButtonText: {
    color: '#1e90ff',
    fontSize: getResponsiveFontSize(16),
  },
  modalButtonClose: {
    borderBottomWidth: 0,
  },
  modalButtonCloseText: {
    color: '#AFABAB',
    fontSize: getResponsiveFontSize(16),
  },
});

export default InvitationScreen;
