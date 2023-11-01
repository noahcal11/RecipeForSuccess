// BannerTitle.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GearIcon from '../assets/svg/gear';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import { Context } from "../App";
import { useContext } from "react";
import EStyleSheet from 'react-native-extended-stylesheet';


EStyleSheet.build();

const ProfileBannerTitle = ({ title}) => {
  const navigation = useNavigation();
  const {setRecipePageState} = useContext(Context);
  return (
    <View style={styles.banner}>
      {<View style={styles.profile}>
        <Profile />
      </View> }
      <Text style={styles.bannerTitle}>{title}</Text>
      <View style={styles.gear}>
        <TouchableOpacity onPress={() => {navigation.navigate("ProfileSettings"); setRecipePageState("details");}} style={{marginHorizontal: "12.5%"}}>
          <GearIcon width="40" height='85' stroke="black" strokeWidth="0.25"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileBannerTitle;

const styles = EStyleSheet.create({
  banner: {
    height: '5.5rem',
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
    flex: '1rem',
    paddingTop: '1.75rem',
    paddingHorizontal: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: '2rem', // Adjust the width as needed
    height: '2rem',
  },
  gear: {
    //flex: 2,
    width: '2rem',
    height: '2rem',
    flex: '.2rem',
  },
});