import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const MyPageScreen = ({ navigation }) => {
  const familyMembers = []; // IEQ 구성원이 없는 상태를 테스트하기 위해 빈 배열로 설정

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "로그아웃하기",
          onPress: () => navigation.navigate('Onboarding')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.profileTitle}>로그인 정보</Text>
      <View style={styles.profileContainer}>
        <View style={styles.row}>
          <Image source={require('../assets/images/profile.png')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>이보티</Text>
          </View>
        </View>
        <View style={styles.accountWrap}>
          <TouchableOpacity style={styles.rowWrap} onPress={() => navigation.navigate('EditNickname', { nickname: '환경123' })}>
            <Text style={styles.nickname}>닉네임 : 환경123</Text>
            <View style={styles.row}>
              <Text style={styles.nickname}>환경123</Text>
              <Icon name="chevron-forward" size={24} color="#000" />
            </View>
          </TouchableOpacity>
          <View style={styles.rowWrap}>
            <Text style={styles.connectedAccountLabel}>연결된 계정</Text>
            <Text style={styles.connectedAccount}>voty@kakao.com</Text>
          </View>
        </View>
      </View>
      <Text style={styles.profileTitle}>IEQ 구성원</Text>
      <View style={styles.familyContainer}>
        <View style={styles.familyMember}>
          <Image source={require('../assets/images/profile.png')} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.row}>
              <Text style={styles.profileName}>이보티</Text>
              <Text style={styles.role}>관리자</Text>
            </View>
            <View>
              <Text style={styles.nickname}>닉네임 : 환경123</Text>
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
