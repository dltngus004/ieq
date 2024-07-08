import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-shape';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveTopPosition  } from '../utils/utils';

const { width } = Dimensions.get('window');
const size = width * 0.6; // 그래프 크기

const data = [
  { key: 1, value: 85, color: '#00CFFF', label: '온도 85점' },
  { key: 2, value: 78, color: '#00FFCC', label: '습도 78점' },
  { key: 3, value: 78, color: '#0080FF', label: 'AQI 78점' },
];

const createPieChart = (data, radius, innerRadius) => {
  const pie = d3.pie().value(d => d.value)(data);
  const arc = d3.arc().outerRadius(radius).innerRadius(innerRadius);

  return pie.map((slice, index) => (
    <G key={index}>
      <Path d={arc(slice)} fill={slice.data.color} />
      <SvgText
        x={(arc.centroid(slice)[0] * 2)}
        y={(arc.centroid(slice)[1] * 2)}
        fill={slice.data.color}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={getResponsiveFontSize(8)} // 폰트 크기 조정
        fontWeight="bold"
      >
        {slice.data.label}
      </SvgText>
    </G>
  ));
};

const AiAnalysisComponent = () => {
  const navigation = useNavigation();
  const outerRadius = size / 2;
  const innerRadius = size / 3;
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AiAnalysisPage')}>
      <View>
        <Text style={styles.aiAnalysisTitle}>나의 AI 분석하기</Text>
        <View style={styles.aiAnalysisContainer}>
          <Svg width={size} height={size}>
            <G x={outerRadius} y={outerRadius}>
              {createPieChart(data, outerRadius, innerRadius)}
            </G>
          </Svg>
          <View style={styles.centerText}>
            <Text style={styles.title}>아기방</Text>
            <Text style={styles.mainScore}>{totalValue}</Text>
          </View>
          <View style={styles.aiComment}>
            <View style={styles.aiTitle}>
              <Icon name="logo-ionitron" size={getResponsiveIconSize(35)} style={styles.icon} />
              <Text style={styles.iconText}>
                AI 매니저
              </Text>
            </View>
            <Text style={styles.infoText}>
              보티 연구소의 온도는 <Text style={styles.boldText}>80점</Text>으로 양호합니다. 더 쾌적한 환경을 위해 온도를 2° 낮추세요.
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  aiAnalysisContainer: {
    padding: getResponsivePadding(20),
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: getResponsiveMargin(20),
    alignItems: 'center',
  },
  aiAnalysisTitle: {
    fontSize: getResponsiveFontSize(16),
    marginBottom: getResponsiveMargin(10),
    textAlign: 'left',
    color: '#000',
    fontWeight: '600',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: getResponsiveTopPosition(size), // 반응형 top 위치 조정
  },
  title: {
    fontSize: getResponsiveFontSize(18), // 폰트 크기 조정
    color: '#000',
  },
  mainScore: {
    fontSize: getResponsiveFontSize(30), // 폰트 크기 조정
    fontWeight: 'bold',
    color: '#165bdd',
  },
  aiComment: {
    flexDirection: 'row',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getResponsivePadding(20),
    flexWrap: 'wrap', // 줄바꿈 추가
  },
  aiTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: getResponsivePadding(20),
  },
  icon: {
    textAlign: 'center',
    color: '#ddd',
  },
  iconText: {
    fontSize: getResponsiveFontSize(12),
    textAlign: 'center',
    color: '#000',
  },
  infoText: {
    fontSize: getResponsiveFontSize(14), // 폰트 크기 조정
    color: '#000',
    textAlign: 'left',
    backgroundColor: '#eaeef3',
    padding: getResponsivePadding(20),
    borderRadius: 10,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default AiAnalysisComponent;
