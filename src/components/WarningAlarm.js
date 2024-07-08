// src/components/WarningAlarm.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
  getResponsiveFontSize, 
  getResponsivePadding, 
  getResponsiveMargin 
} from '../utils/utils.js';


import warningImage from '../assets/images/warning.png';


const WarningAlarm = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }
 
  return (
    <View style={styles.warningContainer}>
      <Image
        source={warningImage}
        style={styles.image}
      />
      <Text style={styles.warningText}>어제 소음이 발생했어요! 알림을 확인해주세요.</Text>
      <TouchableOpacity onPress={handleClose}>
      
        <Icon name="times" type="font-awesome" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222A90',
    padding: getResponsivePadding(8),
    margin: getResponsiveMargin(10),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'none',
    borderWidth: 0
  },
  image: {
    width:20,
    height:20,
    marginHorizontal:5
  },
  warningText: {
    flex: 1,
    color: '#fff',
  },
  closeIcon: {
    marginLeft: 10,
    color: '#fff',
  },
});

export default WarningAlarm;
