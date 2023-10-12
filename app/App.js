import { useEffect, useState, createContext } from 'react';
import Login from "./views/login";
import Home from "./views/home";
import Skills from "./views/skills";
import RecipePages from "./views/RecipePages";
import Profile from "./views/profile";
import Favorites from './views/favorites';
import SearchResults from './views/SearchResults'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const Context = createContext();

export default function App() {
  const [recipePageState, setRecipePageState] = useState('details')
  return (
    <Context.Provider value={{recipePageState, setRecipePageState}}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};