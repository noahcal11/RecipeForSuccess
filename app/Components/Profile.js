import ProfileIcon from "../assets/svg/profile";
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from "../Context";
import { useContext } from "react";

EStyleSheet.build();

const Profile = () => {
  const navigation = useNavigation();
  const {setRecipePageState} = useContext(Context);
  return (
    <View>
      {/* <ProfileIcon style={styles.profile}></ProfileIcon> */}
      <Pressable onPress={() => {navigation.navigate("Profile"); setRecipePageState("details");}} style={{marginHorizontal: "12.5%"}}>
        <ProfileIcon width="40" height='85' stroke="black" strokeWidth="0.25"/>
      </Pressable>
    </View>
  );
}

export default Profile;