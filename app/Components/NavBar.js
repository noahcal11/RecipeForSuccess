// NavigationBar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const NavigationBar = ({ onPressMenu }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={onPressMenu} style={styles.menuIcon}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;

const styles = EStyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'salmon',
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 30,
    color: 'black',
  },
});