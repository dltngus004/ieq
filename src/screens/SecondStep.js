import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const SecondStep = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>01</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonActive}>
          <Text style={styles.stepTextActive}>02</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>03</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.stepButtonInactive}>
          <Text style={styles.stepTextInactive}>04</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.title}>IEQ 모드 설정</Text>
          <Text style={styles.subtitle}>
            디바이스 전원을 키고 IEQ가 켜졌는지 확인해주세요.
          </Text>
        </View>
        <Image source={require('../assets/images/device_img.png')} style={styles.image} />
        <View style={styles.contentDevice}>
          <Text style={styles.subtitle}>
            전원이 켜진 상태에서 Wi-Fi 버튼을 
          </Text>
          <Text style={styles.subtitle}>
            1회(3초간) 눌러 Wi-Fi를 ON 시키세요.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('ThirdStep')}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
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
    padding: getResponsivePadding(20),
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // 버튼과 선을 수직으로 가운데 정렬
    marginVertical: getResponsiveMargin(20),
  },
  stepButtonActive: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    backgroundColor: '#1e90ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getResponsiveWidth(6),
    marginHorizontal: getResponsiveMargin(2),
    borderWidth: 2,
    borderColor: '#1e90ff',
  },
  stepButtonInactive: {
    width: getResponsiveWidth(12),
    height: getResponsiveWidth(12),
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: getResponsiveFontSize(25),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    textAlign: 'center',
    color: '#000'
  },
  contentDevice: {
    alignItems: 'center',
    marginBottom: getResponsiveMargin(20),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(16),
    color: '#666',
    textAlign: 'center',
  },
  image: {
    width: getResponsiveWidth(80), // 80% 너비 설정
    height: getResponsiveHeight(30), // 30% 높이 설정
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: getResponsivePadding(15),
    backgroundColor: '#ccc',
    borderRadius: getResponsiveWidth(1),
    marginHorizontal: getResponsiveMargin(5),
  },
  nextButton: {
    flex: 1,
    alignItems: 'center',
    padding: getResponsivePadding(15),
    backgroundColor: '#1e90ff',
    borderRadius: getResponsiveWidth(1),
    marginHorizontal: getResponsiveMargin(5),
  },
  cancelButtonText: {
    fontSize: getResponsiveFontSize(16),
    color: '#fff',
  },
  nextButtonText: {
    fontSize: getResponsiveFontSize(16),
    color: '#fff',
  },
});

export default SecondStep;
