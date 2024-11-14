import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin, 
  getResponsiveWidth, 
  getResponsiveHeight 
} from '../utils/utils';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

// 임시 이미지 경로
import deviceImage from '../assets/images/notilist.png';

const Notifications = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.date}>2024.05.09(수)</Text>
        <View style={styles.whiteBg}>
            <View style={styles.notiList}>
              <View style={styles.listTit}>  
                <Image source={deviceImage} style={styles.image} />
                <View style={styles.notiBox}>
                  <Text style={styles.notiTit}>소음 감지(항목별 경고감지)</Text>
                  <Text style={styles.notiSub}>보티연구소(디바이스 이름)</Text>
                </View>
              </View>
              <Text style={styles.listTime}>04:14(시간들어가는곳)</Text>
            </View>
            <View style={styles.notiList}>
              <View style={styles.listTit}>  
                <Image source={deviceImage} style={styles.image} />
                <View style={styles.notiBox}>
                  <Text style={styles.notiTit}>소음 감지(항목별 경고감지)</Text>
                  <Text style={styles.notiSub}>보티연구소(디바이스 이름)</Text>
                </View>
              </View>
              <Text style={styles.listTime}>04:14(시간들어가는곳)</Text>
            </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.date}>2024.05.09(수)</Text>
        <View style={styles.whiteBg}>
            <View style={styles.notiList}>
              <View style={styles.listTit}>  
                <Image source={deviceImage} style={styles.image} />
                <View style={styles.notiBox}>
                  <Text style={styles.notiTit}>소음 감지(항목별 경고감지)</Text>
                  <Text style={styles.notiSub}>보티연구소(디바이스 이름)</Text>
                </View>
              </View>
              <Text style={styles.listTime}>04:14(시간들어가는곳)</Text>
            </View>
            <View style={styles.notiList}>
              <View style={styles.listTit}>  
                <Image source={deviceImage} style={styles.image} />
                <View style={styles.notiBox}>
                  <Text style={styles.notiTit}>소음 감지(항목별 경고감지)</Text>
                  <Text style={styles.notiSub}>보티연구소(디바이스 이름)</Text>
                </View>
              </View>
              <Text style={styles.listTime}>04:14(시간들어가는곳)</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: getResponsivePadding(10),
    backgroundColor: '#F2F4F8',
    width: '100%'
  },
  date: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(20),
    paddingBottom: getResponsivePadding(10)
  },
  whiteBg: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveMargin(8),
    alignContent: 'flex-start',
  },
  notiList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: getResponsivePadding(10),
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  listTit: {
    flexDirection: 'row',
  },
  image: {
    width: isTablet ? getResponsiveWidth(7) : getResponsiveWidth(10),
    height: isTablet ? getResponsiveHeight(4.5) : getResponsiveHeight(7.4),
  },
  notiBox: {
    paddingHorizontal: getResponsivePadding(15)
  },
  notiTit: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: isTablet ? getResponsiveFontSize(18) : getResponsiveFontSize(16)
  },
  notiSub: {
    color: '#7F7F7F',
    fontSize: isTablet ? getResponsiveFontSize(14) : getResponsiveFontSize(12)
  },
  listTime: {
    color: '#A6A6A6',
    fontSize: isTablet ? getResponsiveFontSize(14) : getResponsiveFontSize(10)
  }
});

export default Notifications;
