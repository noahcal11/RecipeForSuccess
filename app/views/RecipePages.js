import React from 'react';
import { View, Text, FlatList } from 'react-native';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavBar';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import { useState } from 'react';

const App = ({ navigation, route }) => {
  const [recipe, setRecipe] = useState([]);

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

  const getRecipes = async () => {
    const response = await fetch(API_BASE+"/recipe/get/?title=ham")
      .then(res => res.json())
      .then(data => {
        setRecipe(data[0]);
      })
      .catch(error => console.error(error));
  }

  useState(() => {
    getRecipes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      <SearchBar />
      
      <View style={{ flex: 1 }}>
        {/* Banner title */}
        <BannerTitle title={recipe.title} />

        {/* Your app content */}
        <FlatList
          data={[recipe]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              {/* Recipe Description */}
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
        <Footer />
      </View>
    </View>
  );
};

export default App;
