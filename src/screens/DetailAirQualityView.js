import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AirQualityStatus from '../components/AirQualityStatus';
import AirQualityStatusChart from '../components/AirQualityStatusChart';
import {
  getResponsiveFontSize,
  getResponsivePadding,
  getResponsiveMargin,
} from '../utils/utils';

const DetailAirQualityView = ({ route }) => {
  const { item } = route.params;
  const [selectedTab, setSelectedTab] = useState('hourly');

  const renderChart = () => {
    return <AirQualityStatusChart label={item.label} dataType={item.dataType} timeRange={selectedTab} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AirQualityStatus label={item.label} value={item.value} icon={item.icon} />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('hourly')} style={[styles.tab, selectedTab === 'hourly' && styles.activeTab]}>
          <Text style={styles.tabText}>시간</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('weekly')} style={[styles.tab, selectedTab === 'weekly' && styles.activeTab]}>
          <Text style={styles.tabText}>주간</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('monthly')} style={[styles.tab, selectedTab === 'monthly' && styles.activeTab]}>
          <Text style={styles.tabText}>월간</Text>
        </TouchableOpacity>
      </View>
      {renderChart()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F4F8',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tab: {
    paddingVertical: getResponsivePadding(10),
    paddingHorizontal: getResponsivePadding(20),
    borderRadius: getResponsiveMargin(20),
    marginHorizontal: getResponsiveMargin(5),
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#0a84ff',
  },
  tabText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(14),
  },
});

export default DetailAirQualityView;
