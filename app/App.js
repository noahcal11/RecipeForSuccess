import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect,useState } from 'react';
import bcrypt from 'bcryptjs';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [popupType, setPopupType] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   GetRecipes();
  // }, [])

  const GetRecipes = () => {
    fetch("http://localhost:8080/recipe/get")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err))
  }

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ddd',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 40,
    borderRadius: 40
  },
  top: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center'
  },
  bottom: {
    flex: 3,
    justifyContent: 'center'
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10
  },
  createlinks: {
    flexDirection: 'row',
  },
  create: {
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center'
  },
  undertext: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    marginBottom: 20,
    width: 200,
    height: 50,
    alignSelf:  'center'
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#D1D1D1',
    borderRadius: 30,
    fontSize: 16,
    width: 200,
    padding: 12,
    marginBottom: 20,
    alignSelf: 'center'
  },
  x: {
    alignSelf: 'center',
    padding: 2,
    color: 'black',
    fontSize: 20
  },
  guestLink: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    height: 50,
    width: 150,
    borderRadius: 30
  },
  guestText: {
    color: 'black',
    fontSize: 14
  }
});