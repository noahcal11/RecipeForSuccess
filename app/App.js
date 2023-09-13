import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect,useState } from 'react';
import bcrypt from 'bcryptjs';

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
    const data = await fetch("http://localhost:8080/user/get/" + email, {method: "GET"})
      .then(res => res.json());
    if (data.length == 0) {
      console.log("Email is not registered!");
      setPassword("")
      return;
    }
    bcrypt.compare(password, data[0].hash,
      async function (err, isMatch) {

          // Comparing the original password to
          // encrypted password
          if (isMatch) {
              await setUser(data[0].username)
              console.log('Welcome ' + user +'!');
          }

          if (!isMatch) {

              // If password doesn't match the following
              // message will be sent
              console.log('Wrong Password');
              setPassword("");
          }
    });
  }

  return (
    <View style={styles.background}>
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.logo} src={'https://reactnative.dev/img/tiny_logo.png'}></Image>
        <Text>{recipes}</Text>
        <Text style={styles.text}>Welcome to Recipe For Success</Text>
        <Text style={styles.undertext}>Get started by logging in:</Text>
      </View>
      <View style={styles.bottom}>
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
    justifyContent: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'center'
  },
  logo: {
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    padding: 10
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
  }
});