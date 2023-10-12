import ProfileIcon from "../assets/svg/profile";
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';


EStyleSheet.build();

const Profile = (username,email) => {
  const navigation = useNavigation();
  return (
    <View>
      {/* <ProfileIcon style={styles.profile}></ProfileIcon> */}
      <TouchableOpacity onPress={() => {navigation.navigate("Profile",{'username':username,'email':email})}} style={{marginHorizontal: "12.5%"}}>
        <ProfileIcon width="40" height='85' stroke="black" strokeWidth="0.25"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
    profile: {
        position: 'relative',
        width: '2.5rem',
        height: '2.5rem',
        left: '0.5rem', // Adjust the right position for the top-right corner
      },
});

export default Profile;