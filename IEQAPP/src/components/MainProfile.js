// src/components/MainProfile.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon, Overlay, Button } from 'react-native-elements';

const MainProfile = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const goToMyPage = () => {
    setVisible(false);
    navigation.navigate('MyPage');
  };

  const logout = () => {
    setVisible(false);
    // 로그아웃 처리 로직을 여기에 추가하세요.
    console.log('로그아웃');
  };

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={toggleOverlay}>
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.greetingText}>환경123님, 반가워요!</Text>
      <Icon name="bell" type="font-awesome" style={styles.notificationIcon} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlayContainer}>
          <Button title="마이페이지" onPress={goToMyPage} />
          <Button title="로그아웃" onPress={logout} />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingText: {
    fontSize: 18,
    marginVertical: 10,
  },
  notificationIcon: {
    fontSize: 24,
    color: '#000',
  },
  overlayContainer: {
    width: 200,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainProfile;
