// src/components/WarningAlarm.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Icon name="warning" type="font-awesome" style={styles.warningIcon} />
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
    backgroundColor: '#fff3cd',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffeeba',
  },
  warningIcon: {
    marginRight: 10,
    color: '#856404',
  },
  warningText: {
    flex: 1,
    color: '#856404',
  },
  closeIcon: {
    marginLeft: 10,
    color: '#856404',
  },
});

export default WarningAlarm;
