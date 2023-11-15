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
import StarIcon from '../assets/svg/star';
import HeartIcon from '../assets/svg/heart';
import { useState, useContext } from 'react';
import { Context } from '../App'
import global from '../Genstyle'
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the library and icon as needed
import { TouchableHighlight } from 'react-native';
import filledHeart from '../assets/svg/filledHeart';


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


  const [isFavorite, setIsFavorite] = useState(false);
  const iconColor = isFavorite ? 'pink' : 'currentColor';


  const handleFavoritesPress = () => {
    
    setIsFavorite(!isFavorite);
     // Toggle the isFavorite state when pressed
  };

  useState(() => {
    getRecipes();
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
                  {/* Recipe Description */}
                  <Image source={{uri:item.image}} style={{width: 400, height: 300}} />
                  
                  <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>

                  

            
                    <Text style={{ fontSize: 18, marginBottom: 20 }}/>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                      Recipe Description
                    </Text>
                    <RecipeDescription description={item.desc} />
                  </View>

                  
                  <View>
                  <TouchableHighlight onPress={handleFavoritesPress} style={styles.icon}>
            {isFavorite ? (
            <HeartIcon width="40" height='85' stroke="black" strokeWidth="0.25" fill={iconColor}/>
            ) : (
            <filledHeart width="40" height='85' stroke="black" strokeWidth="0.25" fill={iconColor}/>
            )}
            </TouchableHighlight>
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
  },

  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});