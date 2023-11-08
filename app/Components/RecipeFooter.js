import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState, useContext, useEffect } from 'react'
import { Context } from '../App'
import global from '../Genstyle'

const RecipeFooter = () => {
  const { recipePageState, setRecipePageState } = useContext(Context);
    return (
      <View style={styles.footerContainer}>
        <Pressable
          style={global.buttonAlt}
          onPress={() => {setRecipePageState('progress')}}>
          <Text style={global.buttonText}>Start Recipe!</Text>
        </Pressable>
      </View>
    );
  };
  
  
  export default RecipeFooter;

  const styles = EStyleSheet.create({
    footerContainer: {
      backgroundColor: 'transparent', // #F67D7D
      padding: 10,
      alignItems: 'center',
      height: '8%',
    }
  })