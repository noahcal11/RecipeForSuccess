// App.js

import React from 'react';
//import styles from './Genstyle';
import { View, Text, ScrollView } from 'react-native';
import SearchBar from '../Components/SearchBar'; // Import your search bar component
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavBar';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import Svg, { Image } from 'react-native-svg';

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


const App = () => {
  return (


    
    
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      
      <SearchBar />
      <View style={{ flex: 1 }}>
      {/* Banner title */}
      <BannerTitle title="Recipe Title" />

      {/* Your app content */}
      <ScrollView style={{ flex: 1 }}>


      <Svg width={300} height={300}  >
              <Image
                href={require('../assets/peanut-butter-chocolate-swirl-cookies-2.png')}
                width={300}
                height={300}
                
                
                />
            </Svg>
      {/* Recipe Description */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Recipe Description
        </Text>
        <RecipeDescription description={description} />
      </View> 

      {/* Recipe Ingredients */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Recipe Ingredients
        </Text>
        <RecipeIngredients ingredients={ingredients} />
      </View>

      {/* Recipe Directions */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>
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




export default App;
//after i tried implementing the footer, the search bar stopped appearing