// BannerTitle.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../Genstyle';

const BannerTitle = ({ title }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};



export default BannerTitle;
