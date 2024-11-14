import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import BarChart from '../components/BarChart';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin } from '../utils/utils';

const AnalysisTab = ({ data }) => {
  // 데이터에서 0점과 100점을 제외
  const filteredData = data.filter(d => d.value > 0 && d.value < 100);

  console.log('BarChart Filtered Data:', filteredData); // 필터링된 데이터가 제대로 전달되는지 확인하기 위한 로그

  return (
    <ScrollView style={styles.scorerWrap} contentContainerStyle={styles.scrollContentContainer}>
      <Text style={styles.Fontblack}>점수 (전주 기준)</Text>
      <View style={styles.bgWhite}>
        <BarChart data={filteredData} labels={filteredData.map(d => d.key)} />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#E64A53' }]} />
            <Text style={styles.legendText}>나쁨 0~29</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F4C950' }]} />
            <Text style={styles.legendText}>보통 30~49</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#45C478' }]} />
            <Text style={styles.legendText}>적정 50~79</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3D84FF' }]} />
            <Text style={styles.legendText}>좋음 80~100</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scorerWrap: {
    padding: getResponsivePadding(10),
    height: '100%',
  },
  scrollContentContainer: {
    paddingBottom: getResponsivePadding(20),
  },
  Fontblack: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: '500',
    color: '#000000',
    paddingBottom: getResponsivePadding(10),
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    justifyContent: 'space-between',
    borderRadius: getResponsiveMargin(5),
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: getResponsiveMargin(20),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: getResponsiveMargin(10),
    height: getResponsiveMargin(10),
    borderRadius: getResponsiveMargin(5),
    marginRight: getResponsiveMargin(5),
  },
  legendText: {
    fontSize: getResponsiveFontSize(12),
    color: '#000',
  },
});

export default AnalysisTab;
