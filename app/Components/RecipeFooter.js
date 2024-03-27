import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState, useContext, useEffect } from 'react'
import { Context } from '../Context'
import global from '../Genstyle'

const RecipeFooter = () => {
  const { recipePageState, setRecipePageState } = useContext(Context);
    return (
      <View style={styles.footerContainer}>
        <Pressable
          style={{...global.buttonAlt, backgroundColor: "#f56c42"}}
          onPress={() => {setRecipePageState('progress')}}>
          <Text style={global.buttonText}>Start Recipe!</Text>
        </Pressable>
      </View>
    );
  };
  
  
  export default RecipeFooter;

  const styles = EStyleSheet.create({
    footerContainer: {
      backgroundColor: 'transparent', // #f56c42
      padding: 10,
      alignItems: 'center',
      height: '8%',
    }
  })