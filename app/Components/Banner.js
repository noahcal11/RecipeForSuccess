// BannerTitle.js
import ProfileIcon from "../assets/svg/profile";
import EStyleSheet from 'react-native-extended-stylesheet';
import React, { useState, useContext } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import SearchIcon from '../assets/svg/search';
import { useNavigation } from '@react-navigation/core';
import { Context } from "../App";

EStyleSheet.build();

const BannerTitle = ({ title }) => {
  const navigation = useNavigation()
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const {setRecipePageState} = useContext(Context);

  const toggleSearchBar = () => {
    setTextInputVisible(!isTextInputVisible);
  };

  return (
    <View style={styles.banner}>
      {!isTextInputVisible ? (
        <>
          <View style={styles.profile}>
            <Pressable onPress={() => {navigation.navigate("Profile"); setRecipePageState("details");}} style={styles.profileIcon}>
              <ProfileIcon />
            </Pressable>
          </View>
          <Text style={styles.bannerTitle}>{title}</Text>
          <View style={styles.search}>
            <Pressable onPress={toggleSearchBar} style={styles.searchIcon}>
              <SearchIcon />
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            autoFocus
            onSubmitEditing={({ nativeEvent: { text } }) => {
              navigation.navigate("SearchResults",{"searchTerm":text});
              toggleSearchBar();
            }}
          />
          <Pressable onPress={toggleSearchBar}>
            <View style={styles.xBox}><Text>X</Text></View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BannerTitle;

const styles = EStyleSheet.create({
  banner: {
    height: '12%',
    width: '100%',
    backgroundColor: '#F02727',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10%'
  },
  bannerTitle: {
    fontSize: '1.5rem',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  profile: {
    width: '2.5rem',
    height: '2.5rem',
    marginLeft: '5%',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  search: {
    width: '2.5rem',
    height: '2.5rem',
    marginRight: '5%',
  },
  searchIcon: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'right',
    marginHorizontal:'5%',
    backgroundColor: '#ddd',
    borderRadius: 25,
  },
  searchInput: {
    flex: 1,
    fontSize: '1.5rem',
    paddingLeft: 10
  },
  xBox: {
    width: '2.5rem',
    height: '2.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});