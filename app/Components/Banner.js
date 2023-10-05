// BannerTitle.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import ProfileIcon from '../assets/svg/profile';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const BannerTitle = ({ title }) => {
  return (
    <View style={styles.banner}>
      {<View style={styles.profile}>
        <ProfileIcon></ProfileIcon>
      </View> }
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
    paddingVertical: '1rem', // Adjust vertical padding as needed
    flexDirection: 'row',
    //justifyContent: 'center'
  },
  bannerTitle: {
    fontSize: '1.5rem', // Adjust the font size as needed
    color: 'black', // Set the text color
    fontWeight: 'bold', // Adjust font weight as needed
    textAlign: 'center', // Center text
    flex: '-1rem',
    paddingTop: '.25rem',
    paddingHorizontal: 50
  },
  profile: {
    width: '3rem', // Adjust the width as needed
    height: '2rem',
  },
  search: {
    //flex: 2,
    flex: '.1rem',
  },
});