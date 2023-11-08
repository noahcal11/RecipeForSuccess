// RecipeDirections.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import global from '../Genstyle'

const RecipeDirections = ({ directions }) => {
  return (
    <FlatList
      data={directions}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.directionItem}>
          <Text style={styles.directionNumber}>{index + 1}.</Text>
          <Text style={global.bodyText}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  directionItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
  },
  directionNumber: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  directionText: {
    flex: 1,
  },
});

export default RecipeDirections;
