import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { useContext, useState} from 'react';
import bcrypt from 'bcryptjs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Context } from '../App';
import global from '../Genstyle';

EStyleSheet.build();

export default function Login({navigation}) {
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(false);
  const [popupType, setPopupType] = useState('Login');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState('');
  const {username,setUsername,email,setEmail} = useContext(Context)

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
    }).then(navigation.navigate('Home',{'username':username,'email':email}));
  }

  const getUser = async email => {
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
                await setUsername(data[0].username)
                navigation.navigate('Home',{'username':data[0].username,'email':email})
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
    const data = await fetch(API_BASE+"/user/forgot-password/" + email, {method: "POST"})
      .then(setNotification("Email Sent!"),setPopupType("Code"))
      .catch(setNotification("Email is likely not registered"))
  }

  const takeToken = async (email,token,password) => {
    setNotification("")
    await fetch(API_BASE+"/user/new", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: email, token: token, password: password})
    });
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
            <TouchableOpacity
              style={global.button}
              onPress={() => {
                getUser(email,password)
              }}
            >
              <Text style={global.buttonText}>Login</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={global.button}
              onPress={() => {
                createUser(email,username,password)
              }}
            >
              <Text style={global.buttonText}>Register</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={global.button}
              onPress={() => {
                resetPassword(email)
              }}
            >
              <Text style={global.buttonText}>Send Email</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={global.button}
              onPress={() => {
                takeToken(email,token,password)
              }}
            >
              <Text style={global.buttonText}>Update Password</Text>
            </TouchableOpacity>
            </View>
          );
        }
    }

    return (
    <View style={global.background}>
        <View style={global.foreground}>
            <View style={styles.top}>
                <Image style={styles.logo} source={require("../assets/favicon.png")}></Image>
                {/* <Text style={styles.text}>Welcome to Recipe For Success</Text> */}
                <Text style={global.titleText}>Welcome to Recipe For Success</Text>
                <Text style={styles.undertext}>{notification}</Text>
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
                            <Text style={global.bodyText}>x</Text>
                        </TouchableOpacity>
                    </View>
                    :<TouchableOpacity
                    style={global.button}
                    onPress={() => {
                        setPopupActive(!popupActive)
                        setPopupType('Login')
                    }}
                    >
                        <Text style={global.buttonText}>Login</Text>
                    </TouchableOpacity>}
                    <View style={global.horizontal}>
                        <TouchableOpacity
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('Create')
                        }}>
                        <Text style={styles.createText}>Create Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.createAcct}
                            onPress={() => {
                            setPopupActive(true)
                            setPopupType('Forgot')
                        }}>
                            <Text style={styles.createText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={global.centeredText}>Don't have an account?</Text>
                    <TouchableOpacity
                    style={styles.guestLink}
                    onPress={() => {
                      navigation.navigate('Home',{'username':"Guest",'email':"Guest"})
                    }}>
                        <Text style={styles.guestText}>Continue As Guest</Text>
                    </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </View>
    </View>
    )
}

const styles = EStyleSheet.create({
    background: {
      backgroundColor: '#ddd',
      flex: 1
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      marginHorizontal: '2.2rem',
      marginVertical: '2.2rem',
      borderRadius: '2rem'
    },
    top: {
      flex: 1,
      marginTop: '2rem',
      justifyContent: 'center'
    },
    bottom: {
      flex: 3,
      justifyContent: 'center'
    },
    logo: {
      height: '5.5rem',
      width: '5.5rem',
      alignSelf: 'center',
      marginTop: '3rem',
    },
    text: {
      textAlign: 'center',
      fontSize: '2rem',
      padding: '1rem'
    },
    createlinks: {
      flexDirection: 'row',
    },
    createAcct: {
      flex: 1,
      fontSize: '1rem',
      justifyContent: 'center',
      textAlign: 'center'
    },
    createText: {
      fontSize: '1rem',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#444'
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
      fontSize: '0.85rem'
    }
  });