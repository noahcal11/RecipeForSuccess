import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import React, { useContext, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeIcon from "../assets/svg/home";
import HeartIcon from "../assets/svg/heart";
import RibbonIcon from "../assets/svg/ribbon";
import { useNavigation } from '@react-navigation/native';
import { Context } from "../Context";

EStyleSheet.build();

const Footer = () => {
  const navigation = useNavigation()
  const [menu, setMenu] = useState(false);
  const {setRecipePageState} = useContext(Context)

  return (

    <View style={styles.footerContainer}>
      <Pressable onPress={() => {navigation.navigate("Favorites"); setRecipePageState("details");}} style={({ pressed }) => [
                                    { opacity: pressed
                                            ? 0.2
                                            : 1, }, {marginHorizontal: "12.5%"}]}>
        <HeartIcon width="40" height='100' stroke="black" fill="red" strokeWidth="0.25"/>
      </Pressable>

      <Pressable onPress={() => {navigation.navigate("Home"); setRecipePageState("details");}} style={({ pressed }) => [
                                    { opacity: pressed
                                            ? 0.2
                                            : 1, }, {marginHorizontal: "12.5%"}]}>
        <HomeIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </Pressable>

      <Pressable onPress={() => {navigation.navigate("Skills"); setRecipePageState("details");}} style={({ pressed }) => [
                                    { opacity: pressed
                                            ? 0.2
                                            : 1, }, {marginHorizontal: "12.5%"}]}>
        <RibbonIcon width="40" height='100' stroke="black" strokeWidth="0.25"/>
      </Pressable>
    </View>
  );
};

const styles = EStyleSheet.create({
  footerContainer: {
    //height: '5rem',
    height: '8%',
    backgroundColor: '#F02727',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default Footer;