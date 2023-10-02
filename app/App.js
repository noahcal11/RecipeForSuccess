import { useEffect,useState } from 'react';
import Login from "./views/login";
import Home from "./views/home";
import Skills from "./views/skills"
import RecipePages from "./views/RecipePages"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
  );

};