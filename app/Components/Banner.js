// BannerTitle.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import NavigationBar from './NavBar';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const BannerTitle = ({ title }) => {
  return (
    <View style={styles.banner}>
      <View style={styles.nav}>
        <NavigationBar />
      </View>
      <Text style={styles.bannerTitle}>{title}</Text>
      <View style={styles.search}>
        <SearchBar />
      </View>
    </View>
  );
};

export default BannerTitle;

const styles = EStyleSheet.create({
  banner: {
    backgroundColor: 'salmon', // Set the background color of the banner
    paddingVertical: 10, // Adjust vertical padding as needed
    flexDirection: 'row',
  },
  bannerTitle: {
    fontSize: 24, // Adjust the font size as needed
    color: 'black', // Set the text color
    fontWeight: 'bold', // Adjust font weight as needed
    textAlign: 'center', // Center text
    flex: 1,
    paddingTop: 5,
  },
  nav: {
    flex: 1,
  },
  search: {
    flex: 1,
  },
});