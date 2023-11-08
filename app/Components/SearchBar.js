// SearchBarComponent.js

import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet} from 'react-native';
import SearchIcon from '../assets/svg/search';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/core';

EStyleSheet.build();


const SearchBar = () => {
  const navigation = useNavigation()
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTextInputVisible, setTextInputVisible] = useState(false);

  const openSearchBar = () => {
    setSearchVisible(true);
    setTextInputVisible(true); // Show the text input when opening the search bar
  };

  const closeSearchBar = () => {
    setSearchVisible(false);
    setTextInputVisible(false); // Hide the text input when closing the search bar
  };

  return (
    <View style={styles.searchContainer}>
      <View>
        <Pressable onPress={openSearchBar}>
          {!isTextInputVisible ? (
            <SearchIcon style={styles.icon}></SearchIcon>
          ) : null}
        </Pressable>
      </View>

      {isTextInputVisible ? (
        <View>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            autoFocus
            onSubmitEditing={({ nativeEvent: { text } }) => {navigation.navigate("SearchResults",{"searchTerm":text}); closeSearchBar();}}
          />
          <Pressable onPress={closeSearchBar}>
            <View style={styles.xBox}> 
              <Text>X</Text>
            </View>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};


const styles = EStyleSheet.create({
  icon: {
    width: '2rem',
    height: '2rem',
  },
  searchContainer: {
    position: 'absolute',
    top: '0.25rem', // Adjust the top position for the top-right corner
    right: '0.5rem', // Adjust the right position for the top-right corner
    paddingTop: '1.4rem',
  },
  searchInput: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    //width: '100%',
    width: '25rem', // Adjust the width as needed
    height: '2.1rem',
    borderWidth: '0.1rem',
    borderColor: 'gray',
    borderRadius: 25,
    padding: '.25rem',
  },
  xBox: {
    top: '-0.15rem',
    right:'-22.5rem'
  }
});

// const styles = StyleSheet.create({
//     searchContainer: {
//       position: 'absolute',
//       top: 1, // Adjust the top position for the top-right corner
//       right: 10, // Adjust the right position for the top-right corner
//     },
//     searchInput: {
//       width: 100, // Adjust the width as needed
//       height: 30,
//       backgroundColor: 'white',
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 5,
//       padding: 5,
//     }
//   });

// const styles = StyleSheet.create({
//     searchContainer: {
//       position: 'absolute',
//       top: 1, // Adjust the top position for the top-right corner
//       right: 10, // Adjust the right position for the top-right corner
//     },
//     searchInput: {
//       width: 100, // Adjust the width as needed
//       height: 30,
//       backgroundColor: 'white',
//       borderWidth: 1,
//       borderColor: 'gray',
//       borderRadius: 5,
//       padding: 5,
//     }
//   });

export default SearchBar;