import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveImageSize, getResponsiveWidth, getResponsiveHeight } from '../utils/utils'; // 유틸리티 함수 임포트

const imageUrls = [
  require('../assets/images/onbording01.png'),
  require('../assets/images/kako.png'),
  require('../assets/images/onbording01.png'),
];

const Onboarding = ({ navigation }) => {
  return (
    <LinearGradient colors={['#DAE3F3', '#F6F7F9']} style={styles.linearGradient}>
      <Text style={styles.headerText}>
        Smart <Text style={styles.highlightText}>Changes,</Text> joyful <Text style={styles.highlightText}>life</Text>
      </Text>
      <Text style={styles.subHeaderText}>우리집 스마트 환경 관리, IEQ에게 맡겨보세요.</Text>
      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          height={getResponsiveHeight(30)} // 슬라이드 높이 반응형 설정
          paginationStyle={{ bottom: -10 }} // 슬라이드 높이에 맞게 페이지네이션 위치 조정
          scrollEnabled={true} // 슬라이드를 손으로 밀 수 있도록 설정
        >
          <View style={styles.slide}>
            <Image source={imageUrls[0]} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={imageUrls[1]} style={styles.slideImage} />
          </View>
          <View style={styles.slide}>
            <Image source={imageUrls[2]} style={styles.slideImage} />
          </View>
        </Swiper>
      </View>
      <View style={styles.footerWrap}>
        <Text style={styles.footerText}>회원가입하고 나한테 맞는 환경 찾기!</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.startButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsivePadding(30),
  },
  headerText: {
    width: '100%',
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: getResponsiveMargin(10),
    backgroundColor: '#0C3796',
    paddingVertical: getResponsivePadding(20),
    borderRadius: 100,
    color: '#ffffff',
  },
  highlightText: {
    color: '#0df4fc',
  },
  subHeaderText: {
    fontSize: getResponsiveFontSize(18),
    textAlign: 'center',
    marginVertical: getResponsiveMargin(10),
    color: '#666',
  },
  swiperContainer: {
    width: '100%',
    height: getResponsiveHeight(50), // 슬라이드와 페이지네이션이 포함된 컨테이너 높이 설정
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // 이미지 크기를 조정하여 뷰에 맞게 조정
  },
  footerWrap: {
    width: '100%',
    alignItems: 'center'
  },
  footerText: {
    fontSize: getResponsiveFontSize(15),
    textAlign: 'center',
    marginVertical: getResponsiveMargin(10),
    color: '#000',
    padding: getResponsivePadding(10),
    width: getResponsiveWidth(70),
    borderRadius: 100,
    backgroundColor: '#fff',
    marginBottom: getResponsiveMargin(20),
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 3.84, // 그림자 반경
    elevation: 5, // 안드로이드에서의 그림자
  },
  startButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    padding: getResponsivePadding(15),
    borderRadius: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(18),
    marginLeft: getResponsiveMargin(10),
  },
});

export default Onboarding;
