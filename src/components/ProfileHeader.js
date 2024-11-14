import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileHeader = ({ nickname, profileImage, toggleOverlay }) => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={toggleOverlay}>
        {profileImage ? (
          <Image 
            source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage} 
            style={styles.profileImage} 
          />
        ) : (
          <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />
        )}
      </TouchableOpacity>
      <Text style={styles.greetingText}>{nickname}님, 반가워요!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  greetingText: {
    paddingHorizontal: 20,
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfileHeader;
