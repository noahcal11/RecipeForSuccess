import { useEffect, useState, createContext } from 'react';
import Login from "./views/Login";
import Home from "./views/Home";
import Skills from "./views/Skills";
import recipePages from "./views/RecipePages";
import Profile from "./views/Profile";
import Favorites from './views/Favorites';
import searchResults from './views/SearchResults'
import PageTemplate from './views/PageTemplate';
import Created from './views/Created';
import Completed from './views/Completed';
import Upload from './views/Upload';
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
  const [isHomeFiltersModelVisible, setHomeFiltersModelVisible] = useState(false);
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] = useState(false)

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
        isHomeFiltersModelVisible, setHomeFiltersModelVisible,
        recipePageState, setRecipePageState, 
        username, setUsername, 
        email, setEmail, 
        favorited, setFavorited,
        completed, setCompleted,
        created, setCreated,
        isChangePasswordModelVisible, setChangePasswordModelVisible,
        isSearchFilterModalVisible, setSearchFilterModalVisible
      }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Skills" component={Skills}/>
          <Stack.Screen name="recipePages" component={recipePages}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Favorites" component={Favorites}/>
          <Stack.Screen name="searchResults" component={searchResults}/>
          <Stack.Screen name="PageTemplate" component={PageTemplate}/>
          <Stack.Screen name="Created" component={Created}/>
          <Stack.Screen name="Completed" component={Completed}/>
          <Stack.Screen name="Upload" component={Upload}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};