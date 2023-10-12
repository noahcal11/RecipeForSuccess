import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState, useContext, useEffect } from 'react'
import { Context } from '../App'

const RecipeFooter = () => {
  const { recipePageState, setRecipePageState } = useContext(Context);
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {setRecipePageState('progress')}}>
          <Text style={styles.footerText}>Start Recipe!</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  export default RecipeFooter;

  const styles = EStyleSheet.create({
    footerContainer: {
      backgroundColor: '#F74F4F',
      padding: 10,
      alignItems: 'center',
    },
    footerText: {
      color: 'white',
      fontSize: 16,
    },
  })