import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, Text, Image, View, Pressable, TextInput, Keyboard, ScrollView } from 'react-native';
import { useContext, useState} from 'react';
import bcrypt from 'bcryptjs';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Context } from '../Context';
import global from '../Genstyle';
import LogoIcon from '../assets/svg/logo';

EStyleSheet.build();

export default function Login({navigation}) {
  const [user, setUser] = useState("");
  const [popupActive,setPopupActive] = useState(true);
  const [popupType, setPopupType] = useState('Login');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const {username,setUsername,email,setEmail,setFavorited,setCompleted,setCreated,setVisibleWidgets} = useContext(Context)

  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

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
            setPassword('');
            setPopupActive(false);
            // Comparing the original password to
            // encrypted password
            if (isMatch) {
                await setUsername(data[0].username);
                await setEmail(data[0].email);
                await setFavorited(data[0].favorited_recipes);
                await setCreated(data[0].created_recipes);
                await setCompleted(data[0].completed_recipes);
                await setVisibleWidgets(data[0].widgets);
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

  const validateIsEmail = async (email) => {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    setEmailValid(isValid);
    setEmailErrorMessage(isValid ? '' : 'Invalid email format');
    return isValid;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    const isValid = passwordRegex.test(password);
    setIsPasswordValid(isValid);
    setPasswordErrorMessage(isValid ? '' : 'Password must have at least 8 characters with at least one uppercase letter, one number, and one symbol.');
    return isValid;
  };  

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
            return (
              <View>
                <TextInput
                  style={[global.input, !emailValid && { marginBottom: 0 }, {padding:0}]}
                  onChangeText={(text) => {
                    setEmail(text);
                    validateIsEmail(text);
                  }}
                  value={email}
                  placeholder="Email"
                />
                {!emailValid && (
                  <Text style={[global.centerBodyText, {flex: 0, margin: '0%', color: 'red'}]}>{emailErrorMessage}</Text>
                )}
                <TextInput
                  style={global.input}
                  onChangeText={setUsername}
                  value={username}
                  placeholder="Username"
                />
                <TextInput
                  style={[global.input, !emailValid && { marginBottom: 0 }]}
                  onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                  }}
                  value={password}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                {!isPasswordValid && (
                  <Text style={[global.centerBodyText, {flex: 0, margin: '0%', color: 'red'}]}>{passwordErrorMessage}</Text>
                )}
                <Pressable
                    style={[
                      global.button,
                      !emailValid || !isPasswordValid && { backgroundColor: 'grey', borderColor: 'grey' },
                    ]}
                    onPress={() => {
                      if (emailValid && isPasswordValid) {
                        createUser(email, username, password);
                      }
                    }}
                    disabled={!emailValid || !isPasswordValid}
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
    <ScrollView>
    <Pressable style={{flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={global.grayBackground}>
          <View style={global.whiteForeground}>
              <View style={styles.top}>
                  <LogoIcon style={styles.logo}></LogoIcon>
                  {/* <Text style={styles.text}>Welcome to Recipe For Success</Text> */}
                  <Text style={{ ...global.titleText, marginTop: 10 }}>Welcome to Recipe For Success</Text>
                  <Text style={styles.undertext}>{notification}</Text>
                      {displayPopup(popupType)}
                      <View style={global.horizontal}>
                          {popupType === "Create" ?
                          <Pressable
                          style={styles.createAcct}
                          onPress={() => {
                          setPopupType('Login')
                          }}>
                            <Text style={styles.createText}>Login</Text>
                          </Pressable> :
                          <Pressable
                              style={styles.createAcct}
                              onPress={() => {
                              setPopupType('Create')
                          }}>
                          <Text style={styles.createText}>Create Account</Text>
                          </Pressable> }
                          {popupType === "Forgot" ?
                          <Pressable
                              style={styles.createAcct}
                              onPress={() => {
                              setPopupType('Login')
                          }}>
                            <Text style={styles.createText}>Login</Text>
                          </Pressable> :
                          <Pressable
                              style={styles.createAcct}
                              onPress={() => {
                              setPopupType('Forgot')
                          }}>
                          <Text style={styles.createText}>Forgot Password?</Text>
                          </Pressable> }
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
    </Pressable>
    </ScrollView>
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