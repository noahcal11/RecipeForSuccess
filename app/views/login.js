import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useEffect,useState } from 'react';
import bcrypt from 'bcryptjs';

export default function App() {
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [popupType, setPopupType] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

function displayPopup(type) {
  switch(type) {
    case 'Login':
      return(
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
      </View>
      );
    case 'Create':
      return(
        <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput 
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
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
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        </View>
      );
    case 'Forgot':
      return(
        <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TouchableOpacity
          style={styles.login}
          onPress={() => {
            getUser(email,password)
          }}
        >
          <Text style={styles.loginText}>Send Email</Text>
        </TouchableOpacity>
        </View>
      );
        }
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

export default function Login() {
    return (
        <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image style={styles.logo} source={require("../assets/favicon.png")}></Image>
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
              {displayPopup(popupType)}
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
                setPopupType('Login')
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>}
            <View style={styles.createlinks}>
              <TouchableOpacity
                style={styles.create}
                onPress={() => {
                  setPopupActive(true)
                  setPopupType('Create')
              }}>
                <Text style={styles.create}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.create}
                onPress={() => {
                  setPopupActive(true)
                  setPopupType('Forgot')
              }}>
                <Text style={styles.create}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.undertext}>Don't have an account?</Text>
            <TouchableOpacity
             style={styles.guestLink}
             onPress={() => {
    
             }}>
              <Text style={styles.guestText}>Continue As Guest</Text>
            </TouchableOpacity>
          <StatusBar style="auto" />
          </View>
        </View>
        </View>
    );
}};
