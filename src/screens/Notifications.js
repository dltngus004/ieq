// MyHome.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// 임시 이미지 경로
import deviceImage from '../assets/images/notilist.png';

const Notifications = () => {
  return (
    <View >
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
    padding: 10,
    backgroundColor: '#F2F4F8',
    width: '100%'
  },
  date: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10
  },
  whiteBg: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignContent: 'flex-start',
  },
  notiList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  listTit: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60
  },
  notiBox: {
    paddingHorizontal: 15
  },
  notiTit: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
  notiSub: {
    color: '#7F7F7F',
    fontSize: 14
  },
  listTime: {
    color: '#A6A6A6'
  }
});

export default Notifications;
