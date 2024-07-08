import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const FifthStep = ({ navigation }) => {
  const suggestedNicknames = ['연구소', '휴게실', '거실', '서재', '침실'];
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const randomNickname = suggestedNicknames[Math.floor(Math.random() * suggestedNicknames.length)];
    setNickname(randomNickname);
  }, []);

  const handleComplete = () => {
    console.log('설정된 닉네임:', nickname);
    navigation.navigate('Home'); // MyHome.js로 이동
  };

  const handleAddDevice = () => {
    console.log('기기 추가 등록');
    navigation.navigate('DeviceRegistration'); // DeviceRegistration.js로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.contentTit}>
          <Text style={styles.title}>환경123님의 <Text style={[styles.title, styles.bold]}>보티연구소</Text> 등록 완료!</Text>
          <Text style={styles.subtitle}>이제 기기의 다양한 환경을 확인해보세요.</Text>
        </View>
        <Image source={require('../assets/images/device_img.png')} style={styles.deviceImage} />
        <View style={styles.contentInput}>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.continueButton} onPress={handleComplete}>
              <Text style={styles.continueButtonText}>완료</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
              <Text style={styles.addButtonText}>기기추가등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  stepButtonActive: {
    width: 50,
    height: 50,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  stepButtonInactive: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 5,
  },
  stepTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  stepTextInactive: {
    color: '#ccc',
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 50,
    justifyContent: 'space-between',
    height: '80%',
  },
  contentTit: {
    width: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'left',
    marginBottom: 10,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  contentInput: {
    width: '100%',
    alignItems: 'center',
  },
  deviceImage: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  footer: {
    width: '100%',
    paddingTop: 20,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginBottom: 10,
  },
  addButton: {
    borderColor: '#002060',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#002060',
    fontSize: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FifthStep;
