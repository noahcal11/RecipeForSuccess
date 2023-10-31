// SearchBarComponent.js

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import SearchIcon from '../assets/svg/search';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();


const SearchBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isTextInputVisible, setTextInputVisible] = useState(false);

  const getPopular = async (searchTerm) => {
    const response = await fetch(API_BASE+"/recipe/get/?general="+searchTerm)
    .then(res => res.json())
    .then(data => setPopularRecs(getRandom(data,8)))
    .catch(error => console.error(error));
  }

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
        <TouchableOpacity onPress={openSearchBar}>
          {!isTextInputVisible ? (
            <SearchIcon style={styles.icon}></SearchIcon>
          ) : null}
        </TouchableOpacity>
      </View>

      {isTextInputVisible ? (
        <View>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            autoFocus
          />
          <TouchableOpacity onPress={closeSearchBar}>
            <View style={styles.xBox}> 
              <Text>X</Text>
            </View>
          </TouchableOpacity>
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