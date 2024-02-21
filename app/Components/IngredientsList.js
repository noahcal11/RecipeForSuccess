import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import global from '../Genstyle'
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

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

const styles = EStyleSheet.create({
  ingredientItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    paddingTop: 5,
  },
  ingredientText: {
    fontSize: 16,
  },
});

export default RecipeIngredients;
