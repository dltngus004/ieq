import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getResponsiveFontSize, getResponsivePadding, getResponsiveMargin, getResponsiveIconSize, getResponsiveTopPosition  } from '../utils/utils';

export const renderItem = (item, handleSetRating, navigation) => (
  <TouchableOpacity
    key={item.id}
    style={[styles.moodContainer, styles.flexRow]}
    onPress={() => navigation.navigate('AiMordHome')}
  >
    <View style={styles.flexRow}>
      <Image source={item.image} style={styles.moodImage} />
      <Text style={styles.moodText}>{item.moodName}</Text>
    </View>
    <View style={styles.flexRow}>
      {[1, 2, 3, 4, 5].map((circle) => (
        <TouchableOpacity
          key={circle}
          style={[
            styles.circle,
            { backgroundColor: item.rating >= circle ? '#1e90ff' : '#add8e6' },
          ]}
          onPress={() => handleSetRating(item.id, circle)}
        />
      ))}
    </View>
  </TouchableOpacity>
);

const DailyMood = ({ moodItems, setMoodItems }) => {
  const handleSetRating = (id, rating) => {
    const updatedMoodItems = moodItems.map(item => {
      if (item.id === id) {
        return { ...item, rating };
      }
      return item;
    });
    setMoodItems(updatedMoodItems);
  };

  return (
    <View style={styles.listContainer}>
      {moodItems.map(item => renderItem(item, handleSetRating))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodContainer: {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    padding: getResponsivePadding(10),
    marginBottom: 10,
  },
  moodImage: {
    width: 50,
    height: 50,
  },
  moodText: {
    fontSize: getResponsiveFontSize(16),
    color: '#000',
    fontWeight: 'bold',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin:  getResponsiveMargin(5),
  },
});

export default DailyMood;
