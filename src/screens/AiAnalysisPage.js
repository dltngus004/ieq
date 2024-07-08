import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Svg, { Rect, G, Text as SvgText, Line, Circle } from 'react-native-svg';
import * as d3 from 'd3-scale';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeviceSelector from '../components/DeviceSelector';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveHeight, getResponsiveWidth } from '../utils/utils';

const Tab = createMaterialTopTabNavigator();

const data = [
  { key: '온도', value: 80, yesterdayValue: 77, difference: 3, color: '#3D84FF' },
  { key: '습도', value: 60, yesterdayValue: 62, difference: -2, color: '#45C478' },
  { key: 'CO2', value: 75, yesterdayValue: 73, difference: 2, color: '#45C478' },
  { key: '소음', value: 30, yesterdayValue: 35, difference: -5, color: '#F4C950' },
  { key: '조도', value: 26, yesterdayValue: 29, difference: -3, color: '#E64A53' },
  { key: 'AQI', value: 55, yesterdayValue: 58, difference: -3, color: '#45C478' },
  { key: 'TVOC', value: 90, yesterdayValue: 85, difference: 5, color: '#3D84FF' },
];

const getStatusColor = (value) => {
  if (value <= 29) return '#E64A53'; // 나쁨
  if (value <= 49) return '#F4C950'; // 보통
  if (value <= 79) return '#45C478'; // 적정
  return '#3D84FF'; // 좋음
};

const ProgressBar = ({ value }) => {
  const color = getStatusColor(value);

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
};

const BarChart = ({ data }) => {
  const width = Dimensions.get('window').width - getResponsiveMargin(40);
  const height = getResponsiveHeight(25); // 이 부분 수정
  const barWidth = width / data.length;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const x = d3.scaleBand()
    .domain(data.map(d => d.key))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  const labels = [
    { label: '나쁨', value: 25, color: '#E64A53' },
    { label: '보통', value: 50, color: '#F4C950' },
    { label: '적정', value: 75, color: '#45C478' },
    { label: '좋음', value: 100, color: '#3D84FF' },
  ];

  return (
    <Svg width={width} height={height} style={styles.graph}>
      <G>
        {y.ticks(5).map((tick, i) => (
          <G key={i} transform={`translate(0, ${y(tick)})`}>
            <Line x1={margin.left} x2={width - margin.right} stroke="#e0e0e0" />
            <SvgText
              x={margin.left - 5}
              fontSize={10}
              fill="#000"
              textAnchor="end"
              dy="0.32em"
            >
              {tick}
            </SvgText>
          </G>
        ))}
      </G>
      <G>
        {data.map((d, i) => (
          <Rect
            key={i}
            x={x(d.key)}
            y={y(d.value)}
            width={x.bandwidth()}
            height={height - margin.bottom - y(d.value)}
            fill='#8996B7'
          />
        ))}
      </G>
      <G>
        {data.map((d, i) => (
          <SvgText
            key={i}
            x={x(d.key) + x.bandwidth() / 2}
            y={y(d.value) - 5}
            fontSize={10}
            fill={d.color}
            textAnchor="middle"
          >
            {d.value}
          </SvgText>
        ))}
      </G>
      <G>
        {x.domain().map((d, i) => (
          <SvgText
            key={i}
            x={x(d) + x.bandwidth() / 2}
            y={height - 5}
            fontSize={10}
            fill="#000"
            textAnchor="middle"
          >
            {d}
          </SvgText>
        ))}
      </G>
      <G>
        {labels.map((label, i) => (
          <G key={i} transform={`translate(0, ${y(label.value)})`}>
            <Circle cx={margin.left - 15} cy={0} r={5} fill={label.color} />
            <SvgText
              x={margin.left - 25}
              fontSize={10}
              fill={label.color}
              textAnchor="end"
              dy="0.32em"
            >
              {label.label}
            </SvgText>
          </G>
        ))}
      </G>
    </Svg>
  );
};

const AnalysisDetail = ({ item }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'hourly', title: '시간' },
    { key: 'weekly', title: '주간' },
    { key: 'monthly', title: '월간' },
  ]);

  const renderScene = SceneMap({
    hourly: () => <BarChart data={[item]} />,
    weekly: () => <BarChart data={[item]} />,
    monthly: () => <BarChart data={[item]} />,
  });

  return (
    <View style={styles.detailContainer}>
      <View style={styles.w100}>
        <View style={styles.detailHeader}>
          <Text style={styles.detailScore}>{item.value}</Text>
          <View style={styles.row}>
            <Text style={styles.detailTitle}>{item.key}</Text>
            <Text style={styles.detailDifference}>{item.difference > 0 ? `어제보다 ${item.difference}점 ↑` : `어제보다 ${Math.abs(item.difference)}점 ↓`}</Text>
          </View>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.chartTitle}>온도 평균(어제기준)</Text>
          <View style={styles.bgWhite}>
            <View style={styles.w100}>
              <View style={styles.progressBarWrapper}>
                <Text style={styles.progressLabel}>현재</Text>
                <ProgressBar value={item.value} />
                <Text style={styles.progressScore}>28º</Text>
              </View>
              <View style={styles.progressBarWrapper}>
                <Text style={styles.progressLabel}>어제</Text>
                <ProgressBar value={item.yesterdayValue} />
                <Text style={styles.progressScore}>20º</Text>
              </View>
            </View>
            <View style={styles.aiConment}>
              <View style={styles.aiTitle}>
                <Icon name="logo-ionitron" size={getResponsiveIconSize(35)} style={styles.icon} />
                <Text style={styles.iconText}>AI 매니저</Text>
              </View>
              <View style={styles.infoWrap}>
                <Text style={styles.infoText}>
                  평균 온도 20°C로 최적 온도 대비 <Text style={styles.boldText}>5% </Text>낮습니다.
                  낮 시간대 갑작스럽게 기온이 떨어지는 시점을 주의하여 실내 기온을 높여보세요.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.w100}>
          <Text style={styles.chartTitle}>추세</Text>
          <View style={styles.bgWhite}>
            <View style={[styles.chartWrapper]}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={(props) => (
                  <TabBar
                    {...props}
                    style={styles.tabBar}
                    renderLabel={({ route }) => (
                      <Text style={styles.tabBarLabel}>{route.title}</Text>
                    )}
                  />
                )}
              />
            </View>
            <View style={styles.aiConment}>
              <View style={styles.aiTitle}>
                <Icon name="logo-ionitron" size={getResponsiveIconSize(35)} style={styles.icon} />
                <Text style={styles.iconText}>AI 매니저</Text>
              </View>
              <View style={styles.infoWrap}>
                <Text style={styles.infoText}>
                  평균 온도 20°C로 최적 온도 대비 <Text style={styles.boldText}>5% </Text>낮습니다.
                  낮 시간대 갑작스럽게 기온이 떨어지는 시점을 주의하여 실내 기온을 높여보세요.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const AnalysisTab = ({ data }) => {
  return (
    <ScrollView style={styles.scorerWrap} contentContainerStyle={styles.scrollContentContainer}>
      <Text style={styles.Fontblack}>점수 (전주 기준)</Text>
      <View style={styles.bgWhite}>
        <BarChart data={data} />
        <View style={styles.progressContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.progressBarWrapper}>
              <Text style={styles.progressLabel}>{item.key}</Text>
              <ProgressBar value={item.value} />
              <Text style={styles.progressScore}>{item.value}점</Text>
            </View>
          ))}
        </View>
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

const AiAnalysisPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.selector}>
        <DeviceSelector />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen name="All" component={AnalysisTabScreen} />
        {data.map((item) => (
          <Tab.Screen key={item.key} name={item.key} component={AnalysisTabScreen} />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const AnalysisTabScreen = ({ route }) => {
  const isAllTab = route.name === "All";
  const dataToDisplay = isAllTab ? data : data.filter((d) => d.key === route.name);
  return isAllTab ? (
    <AnalysisTab data={dataToDisplay} />
  ) : (
    <ScrollView style={styles.scorerWrap}>
      {dataToDisplay.map((item, index) => (
        <AnalysisDetail key={index} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  selector: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(10),
  },
  scorerWrap: {
    padding: getResponsivePadding(20),
    height: '100%'
  },
  scrollContentContainer: {
    paddingBottom: getResponsivePadding(40),
  },
  detailContainer: {
    marginBottom: getResponsiveMargin(20),
    width: '100%',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(30),
    backgroundColor: '#3D84FF',
    padding: getResponsivePadding(15),
    borderRadius: getResponsiveMargin(100),
  },
  detailScore: {
    fontSize: getResponsiveFontSize(40),
    fontWeight: 'bold',
    color: '#fff',
    marginRight: getResponsiveMargin(20),
  },
  row: {},
  detailTitle: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '500',
    color: '#ddd',
  },
  Fontblack: {
    fontSize: getResponsiveFontSize(18),
    fontWeight: '500',
    color: '#000000',
    paddingBottom: getResponsivePadding(20),
  },
  detailDifference: {
    fontSize: getResponsiveFontSize(20),
    color: '#fff',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResponsiveMargin(10),
  },
  progressBarContainer: {
    height: getResponsiveHeight(1), // 20픽셀 높이
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: getResponsiveMargin(10),
    overflow: 'hidden',
    marginHorizontal: getResponsiveMargin(10),
  },
  progressContainer: {
    marginTop: getResponsiveMargin(30),
  },
  progressBar: {
    height: '100%',
  },
  progressLabel: {
    fontSize: getResponsiveFontSize(15),
    color: '#000',
    width: getResponsiveMargin(50),
  },
  progressScore: {
    fontSize: getResponsiveFontSize(15),
    color: '#000',
    width: getResponsiveMargin(70),
    textAlign: 'right',
  },
  detailDescription: {
    fontSize: getResponsiveFontSize(14),
    color: '#666',
    marginBottom: getResponsiveMargin(20),
  },
  w100: {
    width: '100%',
  },
  chartTitle: {
    fontSize: getResponsiveFontSize(16),
    fontWeight: 'bold',
    marginBottom: getResponsiveMargin(10),
    color: '#000',
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: getResponsivePadding(20),
    justifyContent: 'space-between',
    borderRadius: getResponsiveMargin(5),
  },
  aiConment: {
    flexDirection: 'row',
    marginTop: getResponsiveMargin(20),
    width: '87%'
  },
  aiTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: getResponsiveMargin(10),
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
  infoWrap: {
    backgroundColor: '#eaeef3',
    padding: getResponsivePadding(20),
    borderRadius: getResponsiveMargin(10),
    marginTop: getResponsiveMargin(10),
  },
  infoText: {
    fontSize: getResponsiveFontSize(12),
    color: '#000',
    textAlign: 'left',
  },
  chartWrapper: {
    height: getResponsiveHeight(30), // 200픽셀 높이
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
  tabBar: {
    backgroundColor: '#fff',
  },
  tabBarLabel: {
    color: '#000',
    fontSize: getResponsiveFontSize(12),
    margin: 0,
  },
});

export default AiAnalysisPage;
