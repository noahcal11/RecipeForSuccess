// App.js
import React from 'react';
//import styles from './Genstyle';
import { View, Text, FlatList, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from '../Components/SearchBar'; // Import your search bar component
import RecipeFooter from '../Components/RecipeFooter';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import RecipeProgression from '../Components/RecipeProgression';
import { useState } from 'react';

EStyleSheet.build();

export default function RecipePages({ navigation, route }) {
  const [recipe, setRecipe] = useState([]);
  const [pageState, setPageState] = useState('details')

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
  const getRecipes = async () => {
    const response = await fetch(API_BASE+"/recipe/get/?id="+route.params._id)
      .then(res => res.json())
      .then(data => {
        setRecipe(data)
      })
      .catch(error => console.error(error));
  }

  useState(() => {
    getRecipes();
  }, []);
  switch(pageState) {
    case 'details':
      return (
        <View style={styles.container}>
          {/* Search bar */}
          <SearchBar />
          <View style={styles.container}>
            {/* Banner title */}
            <BannerTitle title={recipe.title} />
            {/* Your app content */}
            <FlatList
              data={[recipe]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                  {/* Recipe Description */}
                  <Image source={{uri:item.image}} style={{width: 400, height: 300}} />
                  <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>
                      Recipe Description
                    </Text>
                    <RecipeDescription description={item.desc} />
                  </View>
    
                  {/* Recipe Ingredients */}
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                      Recipe Ingredients
                    </Text>
                    <RecipeIngredients ingredients={item.ingredients} />
                  </View>
    
                  {/* Recipe Directions */}
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>
                      Recipe Directions
                    </Text>
                    <RecipeDirections directions={item.steps} />
                  </View>
                </>
              )}
            />
            {/* Footer component */}
            <RecipeFooter state={setPageState} />
          </View>
        </View>
      );
    case 'progress':
      return (
        <RecipeProgression 
          ingredients={recipe.ingredients}
          directions={recipe.steps}
          state={pageState}
        />
      );
    case 'survey':

  }
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