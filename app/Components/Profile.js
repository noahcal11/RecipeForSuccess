import ProfileIcon from "../assets/svg/profile";
import React from 'react';
import { View, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const Profile = () => {
  return (
    <View>
      <ProfileIcon style={styles.profile}></ProfileIcon>
    </View>
  );
}

const styles = EStyleSheet.create({
    profile: {
        position: 'relative',
        width: '2.5rem',
        height: '2.5rem',
        top: '1.2rem', // Adjust the top position for the top-right corner
        left: '0.5rem', // Adjust the right position for the top-right corner
        paddingTop: '1rem',
      },
});

export default Profile;