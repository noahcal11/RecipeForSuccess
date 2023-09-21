// NavigationBar.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Genstyle'; // Import of general style sheet

const NavigationBar = ({ onPressMenu }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={onPressMenu} style={styles.menuIcon}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>My App</Text>
    </View>
  );
};

export default NavigationBar;
