import { useEffect,useState } from 'react';
import Login from "./views/login";
import Home from './views/home';

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
    // <Login recipes={recipes} />
    <Home />
  );

};