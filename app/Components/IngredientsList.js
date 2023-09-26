// RecipeIngredients.js

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const RecipeIngredients = ({ ingredients }) => {
  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.ingredientItem}>{item}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    marginBottom: 10,
  },
});

export default RecipeIngredients;
