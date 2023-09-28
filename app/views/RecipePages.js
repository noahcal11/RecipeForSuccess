// App.js
import React from 'react';
//import styles from './Genstyle';
import { View, Text, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from '../Components/SearchBar'; // Import your search bar component
import Footer from '../Components/Footer';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import Svg, { Image } from 'react-native-svg';

EStyleSheet.build();

const ingredients = [
  '2 cups all-purpose flour',
  '1 cup sugar',
  '1/2 teaspoon salt',
  '2 eggs',
  '1 cup milk',
  // Add more ingredients here
];
const directions = [
  'Preheat the oven to 350°F (180°C).',
  'In a large mixing bowl, combine the flour, sugar, and salt.',
  'Add the eggs and milk and mix until smooth.',
  // Add more directions here
];
const description = "This is a delicious recipe that you'll love to prepare.";
const recipeImage = require('../assets/peanut-butter-chocolate-swirl-cookies-2.png');
export default function RecipePages() {
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <SearchBar />
      <View style={styles.container}>
        {/* Banner title */}
        <BannerTitle title="Recipe Title" />
        {/* Your app content */}
        <ScrollView style={styles.container}>
          <Svg height="250" width="300" >
            <Image href={require('../assets/peanut-butter-chocolate-swirl-cookies-2.png')} width={400} height={300} />
          </Svg>
          {/* Recipe Description */}
          <View style={styles.componentView}>
            <Text style={styles.title}>
              Recipe Description
            </Text>
            <RecipeDescription description={description} />
          </View> 
          {/* Recipe Ingredients */}
          <View style={styles.componentView}>
            <Text style={styles.title}>
              Recipe Ingredients
            </Text>
            <RecipeIngredients ingredients={ingredients} />
          </View>
          {/* Recipe Directions */}
          <View style={styles.componentView}>
            <Text style={styles.title}>
              Recipe Directions
            </Text>
            <RecipeDirections directions={directions} />
          </View>
        </ScrollView>
        {/* Footer component */}
        <Footer />
      </View>
    </View>
  );
};

const styles = {
  image: {
    width: '5',
    height: '5',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20
  },
  componentView: {
    paddingHorizontal: 20,
  },
}