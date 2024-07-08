// SettingsMordHome.js

import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const SettingsMordHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>이보티님</Text>
          <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('MyPageScreen')}>
            <Icon name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('FAQScreen')}>
            <View style={styles.circle}></View>
            <Text style={styles.linkText}>자주 묻는 질문</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => navigation.navigate('ContactScreen')}>
            <View style={styles.circle}></View>
            <Text style={styles.linkText}>1:1 문의</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deviceManagementContainer}>
          <Text style={styles.sectionTitle}>기기 관리</Text>
          <View style={styles.deviceBox}>
            <Text style={styles.noDeviceText}>기기가 없어요</Text>
            <TouchableOpacity style={styles.addDeviceButton} onPress={() => navigation.navigate('DeviceSetupScreen')}>
              <Icon name="add-circle-outline" size={24} color="#1e90ff" />
              <Text style={styles.addDeviceText}>기기추가</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  arrowContainer: {
    padding: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  linkItem: {
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 14,
  },
  deviceManagementContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  deviceBox: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  noDeviceText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  addDeviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addDeviceText: {
    fontSize: 16,
    color: '#1e90ff',
    marginLeft: 5,
  },
});

export default SettingsMordHome;
