import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect,useState } from 'react';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GetRecipes();
  }, [])

  const GetRecipes = () => {
    fetch("http://localhost:3001/recipe/get")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err))
  }

  const getUser = async email => {
    const data = await fetch(API_BASE+"http://localhost:3001/user/get?email=" + email, {method: "GET"})
      .then(res => res.json());
    console.log(data.user)
    if (password === data.password) {
      setUser(data.user)
      console.log(data.user)
    }
  }

  return (
    <View style={styles.container}>
      <Text>{recipes}</Text>
      {popupActive ?
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              getUser(email,password)
            }}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.x}
            onPress={() => {
              setPopupActive(!popupActive)
            }}
          >
            <Text style={styles.loginText}>x</Text>
          </TouchableOpacity>
        </View>
      :<TouchableOpacity
          style={styles.login}
          onPress={() => {
            setPopupActive(!popupActive)
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 200,
    height: 50,
    alignSelf:  'left'
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'grey',
    fontSize: 16,
    width: 200,
    padding: 12,
    alignSelf: 'left'
  },
  x: {
    position: 'absolute',
    padding: 2
  }
});