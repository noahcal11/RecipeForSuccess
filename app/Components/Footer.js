import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React, { useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeIcon from "../assets/svg/home";
import HeartIcon from "../assets/svg/heart";
import RibbonIcon from "../assets/svg/ribbon";
import { useNavigation } from '@react-navigation/native';

EStyleSheet.build();

const Footer = () => {
  const navigation = useNavigation();
  const [menu, setMenu] = useState(false);

  return (

    //NEED TO CHANGE THE NAV FOR FAVORITES WHEN THAT PAGE IS CREATED
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate("Skills")}} style={{marginHorizontal: "12.5%"}}>
        <HeartIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigation.navigate("Home", { username: "Guest" })}} style={{marginHorizontal: "12.5%"}}>
        <HomeIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {navigation.navigate("Skills")}} style={{marginHorizontal: "12.5%"}}>
        <RibbonIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  footerContainer: {
    height: '5rem',
    backgroundColor: '#F74F4F',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default Footer;