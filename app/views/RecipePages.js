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
import RecipeAllergens from '../Components/RecipeAllergens';
import RecipeSurvey from '../Components/RecipeSurvey';
import Footer from '../Components/Footer';
import HeartIcon from '../assets/svg/heart';
import FilledHeart from '../assets/svg/filledHeart';
import FilledStar from '../assets/svg/filledStar';
import HalfStar from '../assets/svg/halfStar';
import EmptyStar from '../assets/svg/emptyStar';
import RecipeAllergiesModal from '../Components/RecipeAllergiesModal'
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Context'
import global from '../Genstyle'

EStyleSheet.build();

export default function RecipePages({ navigation, route }) {
  const [recipe, setRecipe] = useState({rating: [0,0]});
  // Until rating is added to the database, this test variable is used
  const [dummyRating, setDummyRating] = useState(3.5);
  const [isFavorite, setIsFavorite] = useState(false);
  const {profileAllergies, setProfileAllergies, recipePageState, setRecipePageState, username,setUsername, email,setEmail, favorited,setFavorited,isRecipeAllergiesModalVisible, setRecipeAllergiesModalVisible } = useContext(Context);

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


  useEffect(() => {
    setRecipeAllergiesModalVisible(true);
   }, [recipe]);

  function displayRating(rating) {
    let star2, star3, star4, star5 = new Object;
    if (rating >= 2) {
      star2 = <FilledStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else if (rating >= 1.5) {
      star2 = <HalfStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00'/>
    } else {
      star2 = <EmptyStar style={{ flex: 1 }} width='40' height='40' />
    }
    if (rating >= 3) {
      star3 = <FilledStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else if (rating >= 2.5) {
      star3 = <HalfStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else {
      star3 = <EmptyStar style={{ flex: 1 }} width='40' height='40' />
    }
    if (rating >= 4) {
      star4 = <FilledStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else if (rating >= 3.5) {
      star4 = <HalfStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else {
      star4 = <EmptyStar style={{ flex: 1 }} width='40' height='40' />
    }
    if (rating >= 5) {
      star5 = <FilledStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else if (rating >= 4.5) {
      star5 = <HalfStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
    } else {
      star5 = <EmptyStar style={{ flex: 1 }} width='40' height='40' />
    }
    if(rating != 0) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <FilledStar style={{ flex: 1 }} width='40' height='40' fill='#FFDF00' />
        {star2}
        {star3}
        {star4}
        {star5}
        <Text style={global.centeredText}>{rating}</Text>
      </View>
    )} else {
      return (
        <View>
          <Text style={global.subheaderText}>This recipe has no ratings yet!</Text>
        </View>
      )
    }
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
          <View style={[global.grayForeground, { padding:   20 }]}>
            {/* Your app content */}
            {
              (isRecipeAllergiesModalVisible && email !== "Guest") ? (
                <RecipeAllergiesModal
                  visible={isRecipeAllergiesModalVisible}
                  setVisible={setRecipeAllergiesModalVisible}
                  recipeAllergies={recipe.allergies} // Pass the allergies directly from the recipe state
                  profileAllergies={profileAllergies}
                />
              ) : null
            }

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
                  {displayRating(recipe.rating[0])}
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

                    <Text style={global.subheaderText}>Recipe Allergens</Text>
                    <RecipeAllergens allergies={recipe.allergies} />
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
              id={route.params._id}
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