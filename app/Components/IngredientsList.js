import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import global from '../Genstyle'

const RecipeIngredients = ({ ingredients }) => {
  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.ingredientItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={global.bodyText}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
  },
});

export default RecipeIngredients;
