// SearchBar.js

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 2, // Adjust the top position for the top-right corner
    right: 5, // Adjust the right position for the top-right corner
  },
  searchInput: {
    width: 150, // Adjust the width as needed
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
});

export default SearchBar;
