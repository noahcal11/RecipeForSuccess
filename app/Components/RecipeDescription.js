// RecipeDescription.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import global from '../Genstyle'

const RecipeDescription = ({ description }) => {
  return (
    <View>
      <Text style={global.bodyText}>{description}</Text>
    </View>
  );
};

export default RecipeDescription;
