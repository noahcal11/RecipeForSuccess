import { useEffect, useState, createContext } from 'react';
import Login from "./views/login";
import Home from "./views/home";
import Skills from "./views/skills"
import RecipePages from "./views/RecipePages"
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
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );

};