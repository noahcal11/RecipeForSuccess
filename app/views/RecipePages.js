// App.js
import React from 'react';
//import styles from './Genstyle';
import { View, Text, FlatList, Image, Linking, Pressable, Dimensions } from 'react-native';
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
import HeartIcon from '../assets/svg/heart';
import FilledHeart from '../assets/svg/filledHeart';
import { useState, useContext } from 'react';
import { Context } from '../Context'
import global from '../Genstyle'

EStyleSheet.build();

export default function recipePages({ navigation, route }) {
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(5.0);
  const { recipePageState, setRecipePageState, username,setUsername, email,setEmail, favorited,setFavorited } = useContext(Context);

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

  const getRecipes = async () => {
    const response = await fetch(API_BASE+"/recipe/get/", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({id: route.params._id})
  })
      .then(res => res.json())
      .then(data => {
        setRecipe(data)
      })
      .catch(error => console.error(error));
  }

  // Set isFavorite based on whether or not the current recipe is in the user's list of favorites
  const getFavorite = async () => {
    if (favorited.includes(route.params._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  // Add or remove the current recipe from the user's list of favorites
  const setFavorite = async () => {
    setIsFavorite(!isFavorite);
    await fetch(API_BASE+"/user/update-favorite/", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: email, id: route.params._id})
    }).then(res => res.json()).catch(err => console.error(err));
    
    const data = await fetch(API_BASE+"/user/get/" + email, {method: "GET"}).then(res => res.json());
    setFavorited(data[0].favorited_recipes);
  }

  useState(() => {
    getRecipes();
    getFavorite();
  }, []);
  switch(recipePageState) {
    case 'details':
      return (
        <View style={global.whiteBackground}>
          <BannerTitle title={'Recipe'} />
          <View style= {global.grayForeground}>
            {/* Your app content */}
            <FlatList
              data={[recipe]}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle = {{ paddingBottom: 10 }} // Why was this at 1000?
              renderItem={({ item }) => (
                <>
                <Text style={global.titleText}> {recipe.title} </Text>
                  {/* Recipe Image */}
                  <View style={{ position: 'relative' }}>
                    <Image source={{uri:item.image}} style={styles.image} />
                    <Pressable
                      style={{position: 'absolute', marginTop:'15%', marginLeft: '75%'}}
                      onPress={() => {email !== "Guest"? setFavorite():<View></View>}}>
                      {isFavorite?
                        <FilledHeart width='40' height='40' fill='red' />
                        :<HeartIcon fill='white' width='40' height='40' />}
                    </Pressable>
                  </View>
                  {/* Star Rating */}
                  <View style={{ flexDirection: 'row' }}>
                      {rating >= 1 ?
                      <Text></Text>
                      :<Text></Text>}
                  </View>
                  {/* Recipe Description */}
                  <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <View>
                      <Text style={global.subheaderText}>
                        Recipe Description
                      </Text>
                    </View>
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
                  <Text style={global.creditsText} onPress={() => Linking.openURL(item.link)}>Credits</Text>
                </>
              )}
            />
            {/* Footer component */}
            <RecipeFooter />
          </View>
          <Footer />
        </View>
      );
    case 'progress':
      return (
        <View style={global.whiteBackground}>
          <RecipeProgression 
            ingredients={recipe.ingredients}
            directions={recipe.steps}
            title = {recipe.title}
            username={route.params.username}
            email={route.params.email}
          />
          <Footer />
        </View>
      );
    case 'survey':
        return (
          <View style={global.whiteBackground}>
            <RecipeSurvey
              directions={recipe.steps}
              title = {recipe.title}
              username={route.params.username}
              email={route.params.email}
            />
            <Footer />
          </View>
        );
  };
}
const styles = EStyleSheet.create({
  image: {
    width: '80%',
    height: Dimensions.get('window').height *.3,
    margin: '10%',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'center',
  }
});