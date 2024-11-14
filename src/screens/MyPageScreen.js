import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';
import { UserContext } from '../context/UserContext';

const MyPageScreen = ({ navigation }) => {
  const { userName, nickname, profileImage, email, setProfileImage, resetUserContext } = useContext(UserContext);
  const familyMembers = [];

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://monitoring.votylab.com/IEQ/IEQ/IEQLogin', {
        UserId: userName,
        AppReq: 'kakao',
        AppReq2: '2',
        AppReq3: '1440'
      });

      console.log('로그아웃 응답:', response.data);

      if (response.data.code === 2) {
        resetUserContext();
        Alert.alert('로그아웃', '로그아웃에 성공했습니다.');
        navigation.navigate('Onboarding');
      } else {
        Alert.alert('로그아웃 실패', '로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      Alert.alert('로그아웃 오류', '로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.profileTitle}>로그인 정보</Text>
      <View style={styles.profileContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image source={profileImage ? { uri: profileImage } : require('../assets/images/profile.png')} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{nickname}</Text>
          </View>
        </View>
        <View style={styles.accountWrap}>
          <TouchableOpacity style={styles.rowWrap} onPress={() => navigation.navigate('EditNickname', { nickname })}>
            <Text style={styles.nickname}>닉네임 : {nickname}</Text>
            <View style={styles.row}>
              <Text style={styles.nickname}>{nickname}</Text>
              <Icon name="chevron-forward" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={styles.rowWrap}>
            <Text style={styles.connectedAccountLabel}>연결된 계정</Text>
            <Text style={styles.connectedAccount}>{email}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.profileTitle}>IEQ 구성원</Text>
      <View style={styles.familyContainer}>
        <View style={styles.familyMember}>
          <Image source={profileImage ? { uri: profileImage } : require('../assets/images/profile.png')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.row}>
              <Text style={styles.profileName}>{nickname}</Text>
              <Text style={styles.role}>관리자</Text>
            </View>
            <View>
              <Text style={styles.nickname}>닉네임 : {nickname}</Text>
            </View>
          </View>
        </View>
        {familyMembers.length > 0 ? (
          <View style={styles.groupWrap}>
            <Text style={styles.groupName}>미세싫어</Text>
            {familyMembers.map((member) => (
              <View key={member.id} style={styles.familyMember}>
                <Image source={require('../assets/images/profile.png')} style={styles.avatar} />
                <View style={styles.profileInfo}>
                  <View style={styles.row}>
                    <Text style={styles.profileName}>{member.name}</Text>
                    <Text style={styles.role}>{member.role}</Text>
                  </View>
                  <View>
                    <Text style={styles.nickname}>닉네임 : {member.nickname}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.removeButton}>
                  <Icon name="remove-circle-outline" size={24} color="#e64e57" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noFamilyContainer}>
            <Text style={styles.noFamilyText}>IEQ 구성원이 없어요</Text>
          </View>
        )}
        <TouchableOpacity style={styles.inviteButton} onPress={() => navigation.navigate('InvitationScreen')}>
          <Icon name="add-circle-outline" size={24} color="#1e90ff" />
          <Text style={styles.inviteText}>가족 초대</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity style={styles.center} onPress={handleLogout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: getResponsivePadding(20),
  },
  profileTitle: {
    marginBottom: getResponsiveMargin(10),
    color: '#000',
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    marginBottom: getResponsiveMargin(10),
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: getResponsiveWidth(8),
    height: getResponsiveWidth(8),
    borderRadius: getResponsiveWidth(7.5),
  },
  profileInfo: {
    marginLeft: getResponsiveMargin(10),
  },
  profileName: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '500',
    color: '#000',
    paddingRight: getResponsivePadding(10),
  },
  accountWrap: {
    paddingTop: getResponsivePadding(10),
  },
  rowWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: getResponsivePadding(10),
    borderColor: '#ddd',
  },
  nickname: {
    fontSize: getResponsiveFontSize(14),
    color: '#888',
  },
  connectedAccountLabel: {
    fontSize: getResponsiveFontSize(14),
    color: '#888',
    marginRight: getResponsiveMargin(5),
  },
  connectedAccount: {
    fontSize: getResponsiveFontSize(14),
    color: '#000',
  },
  familyContainer: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    borderRadius: 10,
  },
  familyTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
  },
  groupName: {
    color: '#525EFF',
    fontWeight: '500',
    paddingTop: getResponsivePadding(10),
  },
  familyMember: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: getResponsivePadding(10),
    borderColor: '#ddd',
  },
  role: {
    fontSize: getResponsiveFontSize(12),
    color: '#888',
    backgroundColor: '#f0f0f0',
    paddingVertical: getResponsivePadding(2),
    paddingHorizontal: getResponsivePadding(5),
    borderRadius: 5,
    marginTop: getResponsiveMargin(3),
  },
  removeButton: {
    marginLeft: 'auto',
  },
  noFamilyContainer: {
    alignItems: 'center',
    padding: getResponsivePadding(20),
  },
  noFamilyText: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    marginBottom: getResponsiveMargin(20),
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getResponsivePadding(10),
    marginTop: getResponsiveMargin(10),
    backgroundColor: '#f0f8ff',
    borderRadius: 5,
  },
  inviteText: {
    fontSize: getResponsiveFontSize(16),
    color: '#1e90ff',
    marginLeft: getResponsiveMargin(5),
  },
  logout: {
    marginTop: getResponsiveMargin(20),
  },
  center: {
    marginTop: getResponsiveMargin(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getResponsivePadding(10),
  },
  logoutText: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
  },
});

export default MyPageScreen;
