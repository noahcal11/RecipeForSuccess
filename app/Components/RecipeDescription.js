// RecipeDescription.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecipeDescription = ({ description }) => {
  return (
    <View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default RecipeDescription;
