import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, Image, View, Pressable, TextInput } from 'react-native';
import { useContext, useState} from 'react';
import bcrypt from 'bcryptjs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Context } from '../Context';
import global from '../Genstyle';
import LogoIcon from '../assets/svg/logo';

EStyleSheet.build();

export default function Login({navigation}) {
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [popupType, setPopupType] = useState('Login');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState('');
  const {username,setUsername,email,setEmail,setFavorited,setCompleted,setCreated} = useContext(Context)

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
  // const API_BASE = "http://localhost:8080/"+process.env.REACT_APP_API_TOKEN

  const createUser = async (email,username,password) => {
    setNotification("")
    const data = await fetch(API_BASE+"/user/new", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: email, username: username, password: password})
    }).then(navigation.navigate('Home'));
  }

  const getUser = async () => {
      setNotification("")
      const data = await fetch(API_BASE+"/user/get/" + email, {method: "GET"})
        .then(res => res.json())
      if (data.length == 0) {
        setNotification("Email is not registered!");
        setPassword("");
        return;
      } 
      bcrypt.compare(password, data[0].hash,
        async function (err, isMatch) {

            // Comparing the original password to
            // encrypted password
            if (isMatch) {
                await setUsername(data[0].username);
                await setEmail(data[0].email);
                await setFavorited(data[0].favorited_recipes);
                await setCreated(data[0].created_recipes);
                await setCompleted(data[0].completed_recipes);
                navigation.navigate('Home');

            }

            if (!isMatch) {

                // If password doesn't match the following
                // message will be sent
                setNotification('Wrong Password');
                setPassword("");
            }
      });
    }

  const resetPassword = async email => {
    setNotification("")
    await fetch(API_BASE+"/user/forgot-password/" + email, {method: "POST"})
      .then(setNotification("Email Sent!"))
      .then(setPopupType("Code"))
      .catch(err => console.error(err))
  }

  const takeToken = async (token) => {
    setNotification("")
    await fetch(API_BASE+"/user/reset-password", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: email, code: token, password: password})
    }).then(getUser()).catch(err => console.error(err));
  }

  function displayPopup(type) {
      switch(type) {
        case 'Login':
          return(
          <View>
            <TextInput
              style={global.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={global.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Pressable
              style={global.button}
              onPress={() => {
                getUser(email,password)
              }}
            >
              <Text style={global.buttonText}>Login</Text>
            </Pressable>
          </View>
          );
        case 'Create':
          return(
            <View>
            <TextInput
              style={global.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput 
              style={global.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={global.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Pressable
              style={global.button}
              onPress={() => {
                createUser(email,username,password)
              }}
            >
              <Text style={global.buttonText}>Register</Text>
            </Pressable>
            </View>
          );
        case 'Forgot':
          return(
            <View>
            <TextInput
              style={global.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <Pressable
              style={global.button}
              onPress={() => {
                resetPassword(email)
              }}
            >
              <Text style={global.buttonText}>Send Email</Text>
            </Pressable>
            </View>
          );
          case 'Code':
          return(
            <View>
            <TextInput
              style={global.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            <TextInput
              style={global.input}
              onChangeText={setToken}
              value={token}
              placeholder="Code"
            />
            <TextInput
              style={global.input}
              onChangeText={setPassword}
              value={password}
              placeholder="New Password"
              secureTextEntry={true}
            />
            <Pressable
              style={global.button}
              onPress={() => {
                takeToken(email,token,password)
              }}
            >
              <Text style={global.buttonText}>Update Password</Text>
            </Pressable>
            </View>
          );
        }
    }

    return (
    <View style={global.grayBackground}>
        <View style={global.whiteForeground}>
            <View style={styles.top}>
                <LogoIcon style={styles.logo}></LogoIcon>
                {/* <Text style={styles.text}>Welcome to Recipe For Success</Text> */}
                <Text style={{ ...global.titleText, marginTop: 10 }}>Welcome to Recipe For Success</Text>
                <Text style={styles.undertext}>{notification}</Text>
            
            {/* <Pressable
            style={styles.login}>
            <Text style={styles.loginText}>Register</Text>
            </Pressable> */}
                {popupActive ?
                    <View> 
                        {displayPopup(popupType)}
                        <Pressable
                            style={styles.x}
                            onPress={() => {
                            setPopupActive(!popupActive)
                            }}
                        >
                            <Text style={global.bodyText}>x</Text>
                        </Pressable>
                    </View>
                    :<Pressable
                    style={global.button}
                    onPress={() => {
                        setPopupActive(!popupActive)
                        setPopupType('Login')
                    }}
                    >
                        <Text style={global.buttonText}>Login</Text>
                    </Pressable>}
                    <View style={global.horizontal}>
                        <Pressable
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('Create')
                        }}>
                        <Text style={styles.createText}>Create Account</Text>
                        </Pressable>
                        <Pressable 
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('Forgot')
                        }}>
                            <Text style={styles.createText}>Forgot password?</Text>
                        </Pressable>
                    </View>
                    <Text style={global.centeredText}>Don't have an account?</Text>
                    <Pressable
                    style={global.buttonMinor}
                    onPress={() => {
                      navigation.navigate('Home');
                      setUsername("Guest");
                      setEmail("Guest");
                    }}>
                        <Text style={styles.guestText}>Continue As Guest</Text>
                    </Pressable>
                <StatusBar style="auto" />
            </View>
        </View>
    </View>
    )
}

const styles = EStyleSheet.create({
    logo: {
      position: 'relative',
      alignSelf: 'center',
      marginTop: 50,
    },
    text: {
      textAlign: 'center',
      fontSize: '2rem',
      padding: '1rem'
    },
    createAcct: {
      flex: 1,
      fontSize: '1rem',
      justifyContent: 'center',
      textAlign: 'center'
    },
    createText: {
      fontSize: '0.9rem',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#444',
      textDecorationLine: 'underline',
      fontFamily: 'Cairo_500Medium',
    },
    undertext: {
      textAlign: 'center',
      fontSize: '1.25rem',
      padding: '1rem'
    },
    login: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      borderRadius: '2rem',
      marginBottom: '1rem',
      width: '13rem',
      height: '3rem',
      alignSelf:  'center'
    },
    loginText: {
      color: 'white',
      fontSize: '1rem',
    },
    input: {
      backgroundColor: '#D1D1D1',
      borderRadius: '2rem',
      fontSize: '1rem',
      width: '13rem',
      height: '3rem',
      paddingLeft: '1rem',
      marginBottom: '1rem',
      alignSelf: 'center'
    },
    x: {
      alignSelf: 'center',
      padding: '0.2rem',
      marginBottom: '0.5rem',
      padding: '0.3rem',
      // borderWidth: '0.05rem',
      // borderRadius: 7,
      fontSize: '1.2rem'
    },
    guestLink: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ddd',
      height: '3rem',
      width: '13rem',
      borderRadius: '2rem'
    },
    guestText: {
      color: 'black',
      fontSize: '0.9rem',
      fontFamily: 'Cairo_500Medium',
    }
  });