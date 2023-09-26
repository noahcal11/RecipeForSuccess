import { useEffect,useState } from 'react';
import Login from "./views/login";
import Home from "./views/home";
import Skills from "./views/skills"
import RecipePages from "./views/RecipePages"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState([]);

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

  // useEffect(() => {
  //   GetRecipes();
  // }, [])

  const GetRecipes = () => {
    fetch(API_BASE+"/recipe/get")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err))
  }

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