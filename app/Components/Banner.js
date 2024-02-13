// BannerTitle.js
import ProfileIcon from "../assets/svg/profile";
import EStyleSheet from 'react-native-extended-stylesheet';
import React, { useState, useContext } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import SearchIcon from '../assets/svg/search';
import { useNavigation,useRoute } from '@react-navigation/core';
import { Context } from "../Context";
import SignInModal from "./SignInModal";

EStyleSheet.build();

const BannerTitle = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const {setRecipePageState, email, searchFilter, setSearchFilter} = useContext(Context);

    const toggleSearchBar = () => {
        setTextInputVisible(!isTextInputVisible);
    };

  return (
    <View style={styles.banner}>
      {!isTextInputVisible ? (
        <>
          <View style={styles.profile}>
            <Pressable onPress={() => {
                navigation.navigate("Profile");
                setRecipePageState("details");
              }
            }
            style={({ pressed }) => [
              {
                  opacity: pressed
                      ? 0.2
                      : 1,
              },
              styles.profileIcon]}>
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
                  navigation.navigate("Home");
                  navigation.navigate("searchResults", { searchTerm: text });
                  setSearchFilter([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
              // route.name === "searchResults" ? ({navigation.navigate("Home"), navigation.navigate("searchResults")}) :
              // navigation.navigate("searchResults",{"searchTerm":text});
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
        fontSize: '1.6rem',
        color: 'black',
        fontFamily: 'Manrope_700Bold',
        textAlign: 'center',
        justifyContent: 'center',
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
        marginHorizontal: '5%',
        backgroundColor: '#ddd',
        borderRadius: 25,
    },
    searchInput: {
        flex: 1,
        fontSize: '1.5rem',
        paddingLeft: 10,
        fontFamily: 'Cairo_500Medium'
    },
    xBox: {
        width: '2.5rem',
        height: '2.5rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
});