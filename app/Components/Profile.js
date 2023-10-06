import ProfileIcon from "../assets/svg/profile";
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';


EStyleSheet.build();

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View>
      {/* <ProfileIcon style={styles.profile}></ProfileIcon> */}
      <TouchableOpacity onPress={() => {navigation.navigate("Profile")}} style={{marginHorizontal: "12.5%"}}>
        <ProfileIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
    profile: {
        position: 'relative',
        width: '2.5rem',
        height: '2.5rem',
        top: '1.4rem', // Adjust the top position for the top-right corner
        left: '0.5rem', // Adjust the right position for the top-right corner
      },
});

export default Profile;