// App.js
import React from 'react';
//import styles from './Genstyle';
import { View, Text, FlatList, Image, Linking, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from '../Components/SearchBar'; // Import your search bar component
import RecipeFooter from '../Components/RecipeFooter';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import RecipeProgression from '../Components/RecipeProgression';
import RecipeSurvey from '../Components/RecipeSurvey';
import Footer from '../Components/Footer';
import { useState, useContext } from 'react';
import { Context } from '../App'
import global from '../Genstyle'

EStyleSheet.build();

export default function RecipePages({ navigation, route }) {
  const [recipe, setRecipe] = useState([]);
  const { recipePageState, setRecipePageState, username,setUsername, email,setEmail } = useContext(Context);

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
  switch(recipePageState) {
    case 'details':
      return (
        <View style={global.container}>
          {/* Search bar */}
          <SearchBar />
          <View style={{ flex: 1 }}>
            {/* Banner title */}
            <BannerTitle title={'Recipe'} />
            {/* Your app content */}
            <FlatList
              data={[recipe]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                <Text style={global.titleText}> {recipe.title} </Text>
                  {/* Recipe Description */}
                  <Image source={{uri:item.image}} style={styles.image} />
                  <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <Text style={global.subheaderText}>
                      Recipe Description
                    </Text>
                    <RecipeDescription description={item.desc} />
                  </View>
    
                  {/* Recipe Ingredients */}
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={global.subheaderText}>
                      Recipe Ingredients
                    </Text>
                    <RecipeIngredients ingredients={item.ingredients} />
                  </View>
    
                  {/* Recipe Directions */}
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={global.subheaderText}>
                      Recipe Directions
                    </Text>
                    <RecipeDirections directions={item.steps} />
                  </View>
                  <Text style={styles.credits} onPress={() => Linking.openURL(item.link)}>Credits</Text>
                </>
              )}
            />
            {/* Footer component */}
            <RecipeFooter />
            <Footer username={route.params.username} email={route.params.email} />
          </View>
        </View>
      );
    case 'progress':
      return (
        <View style={styles.container}>
          <RecipeProgression 
            ingredients={recipe.ingredients}
            directions={recipe.steps}
            title = {recipe.title}
            username={route.params.username}
            email={route.params.email}
          />
          <Footer username={route.params.username} email={route.params.email} />
        </View>
      );
    case 'survey':
        return (
          <View style={styles.container}>
            <RecipeSurvey
              directions={recipe.steps}
              title = {recipe.title}
              username={route.params.username}
              email={route.params.email}
            />
            <Footer username={route.params.username} email={route.params.email} />
          </View>
        );
  };
}
const styles = EStyleSheet.create({
  image: {
    width: 320,
    height: 220,
    margin: '1rem',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: '0.05rem',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  componentView: {
    paddingHorizontal: 20,
  },
  credits: {
    fontSize: '1rem',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});