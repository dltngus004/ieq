// src/components/DailyMoodCarousel.js
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import DailyMood from './DailyMood';

const moodData = [
  { id: 1, iconName: 'moon-o', moodName: '수면' },
  { id: 2, iconName: 'book', moodName: '공부' },
  { id: 3, iconName: 'heartbeat', moodName: '운동' },
];

const { width } = Dimensions.get('window');

const DailyMoodCarousel = () => {
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={moodData}
        renderItem={({ item }) => (
          <DailyMood iconName={item.iconName} moodName={item.moodName} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
});

export default DailyMoodCarousel;
