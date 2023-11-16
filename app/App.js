import { useEffect, useState, createContext } from 'react';
import Login from "./views/login";
import Home from "./views/home";
import Skills from "./views/skills";
import RecipePages from "./views/RecipePages";
import Profile from "./views/profile";
import Favorites from './views/favorites';
import SearchResults from './views/SearchResults'
import PageTemplate from './views/pageTemplate';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Cairo_500Medium } from '@expo-google-fonts/cairo';
import { Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { Context } from './Context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipePageState, setRecipePageState] = useState('details');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [favorited, setFavorited] = useState([]);
  const [created, setCreated] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isChangePasswordModelVisible, setChangePasswordModelVisible] = useState(false);

  let [fontsLoaded, fontError] = useFonts({
    Cairo_500Medium,
    Manrope_500Medium,
    Manrope_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Context.Provider value={{ 
        recipePageState, setRecipePageState, 
        username, setUsername, 
        email, setEmail, 
        favorited, setFavorited,
        completed, setCompleted,
        created, setCreated,
        isChangePasswordModelVisible, setChangePasswordModelVisible 
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Skills" component={Skills}/>
          <Stack.Screen name="RecipePages" component={RecipePages}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Favorites" component={Favorites}/>
          <Stack.Screen name="SearchResults" component={SearchResults}/>
          <Stack.Screen name="PageTemplate" component={PageTemplate}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};