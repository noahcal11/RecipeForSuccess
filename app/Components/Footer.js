import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeIcon from "../assets/svg/home";
import HeartIcon from "../assets/svg/heart";
import RibbonIcon from "../assets/svg/ribbon"

const Footer = () => {
    return (
      <View style={styles.footerContainer}>

        {/* This is working when I move to styles it is not working */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{marginHorizontal: "12.5%"}}>
            <HeartIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{marginHorizontal: "12.5%"}}>
            <HomeIcon style={styles.icons}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{marginHorizontal: "12.5%"}}>
            <RibbonIcon style={styles.icons}/>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  export default Footer;

  const styles = EStyleSheet.create({
    footerContainer: {
      backgroundColor: '#F74F4F',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icons: {
      width: '40',
      height: '100',
      stroke: 'black',
      strokeWidth: '0.25'
    }
  })