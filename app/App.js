import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect,useState } from 'react';
// import { Link } from '@react-navigation/native';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [email, setEmail] = useState('');
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

  const getUser = async email => {
    const data = await fetch(API_BASE+"http://localhost:8080/user/get?email=" + email, {method: "GET"})
      .then(res => res.json());
    console.log(data.user)
    if (password === data.password) {
      setUser(data.user)
      console.log(data.user)
    }
  }

  return (
    <View style={styles.background}>
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.logo} source={require("./assets/favicon.png")}></Image>
        <Text>{recipes}</Text>
        {/* <Text style={styles.text}>Welcome to Recipe For Success</Text> */}
        <Text style={styles.undertext}>Get started by logging in:</Text>
      </View>
      <View style={styles.bottom}>
        {/* <TouchableOpacity
         style={styles.login}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity> */}
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
            <Text style={styles.x}>x</Text>
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
        <View style={styles.createlinks}>
          <Text style={styles.create}>Create Account</Text>
          <Text style={styles.create}>Forgot password?</Text>
        </View>
        <Text style={styles.undertext}>Follow us:</Text>
        <View style={styles.socials}>
          <Image></Image>
          <Image></Image>
          <Image></Image>
        </View>
      <StatusBar style="auto" />
      </View>
    </View>
    </View>
  );
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
    backgroundColor: 'grey',
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
  }
});