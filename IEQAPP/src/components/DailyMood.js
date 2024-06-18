// src/components/DailyMood.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const DailyMood = ({ iconName, moodName }) => {
  const [rating, setRating] = useState(3);
  const circles = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <Icon name={iconName} type="font-awesome" style={styles.moodIcon} />
      <Text style={styles.moodText}>{moodName}</Text>
      <View style={styles.ratingContainer}>
        {circles.map((circle) => (
          <TouchableOpacity
            key={circle}
            style={[
              styles.circle,
              { backgroundColor: rating >= circle ? '#1e90ff' : '#add8e6' },
            ]}
            onPress={() => setRating(circle)}
          />
        ))}
      </View>
      <Text style={styles.ratingText}>{rating}점</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    width: 250,
  },
  moodIcon: {
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  ratingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DailyMood;
