// SearchBarComponent.js

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';
import Svg, { Image } from 'react-native-svg';


const SearchBar = () => {
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
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={openSearchBar}>
          {!isTextInputVisible ? (
            <Svg width={30} height={30}>
              <Image
                href={require('./zoom-bold.svg')}
                width={30}
                height={30}
                />
            </Svg>
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
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
      position: 'absolute',
      top: 1, // Adjust the top position for the top-right corner
      right: 10, // Adjust the right position for the top-right corner
    },
    searchInput: {
      width: 100, // Adjust the width as needed
      height: 30,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 5,
    }
  });

export default SearchBar;
