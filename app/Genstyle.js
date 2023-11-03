//General Style sheet to be used across different pages of app - Ibi

// styles.js

import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

EStyleSheet.build();

const global = EStyleSheet.create({
  
  // Generic containers

  // Backgrounds
  // White background
  whiteBackground: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  // Gray background
  grayBackground: {
    backgroundColor: '#eee',
    flex: 1,
  },

  //Foregrounds
  // White foreground
  whiteForeground: {
    backgroundColor: '#f6f6f6',
    marginHorizontal: '5%',
    marginVertical: '5%',
    borderRadius: 25,
    flex:1
  },
  // Gray foreground
  grayForeground: {
    backgroundColor: '#eee',
    marginHorizontal: '5%',
    marginVertical: '5%',
    borderRadius: 25,
    flex:1
  },

  // Buttons 

  // Action button
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    marginVertical: '1rem',
    width: Dimensions.get('window').width*0.5,
    height:  Dimensions.get('window').height*0.06,
    textAlign: 'center',
  },
  // Grey button that does nothing
  buttonInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bbb',
    borderRadius: 25,
    marginVertical: '1rem',
    width: Dimensions.get('window').width*0.5,
    height:  Dimensions.get('window').height*0.06,
    textAlign: 'center',
  },
  // Light gray button for less important buttons
  buttonMinor: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 25,
    marginVertical: '1rem',
    width: Dimensions.get('window').width*0.5,
    height:  Dimensions.get('window').height*0.06,
    textAlign: 'center',
  },
  // Alt colored button
  buttonAlt: {
    backgroundColor: '#F67D7D',
    borderRadius: 25,
    width: Dimensions.get('window').width*0.5,
    height:  Dimensions.get('window').height*0.06,
    textAlign: 'center',
  },

  //Text

  // Text for buttons
  buttonText: {
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    textAlign: 'center',
  },
  // Generic text
  text: {
    fontSize: '2rem',
    color: 'black',
    fontFamily: 'Cairo_500Medium',
  },
  // Slightly smaller text for paragraphs
  bodyText: {
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    flex: 1,
  },
  // Centered version of bodyText
  centerBodyText: {
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    flex: 1,
    textAlign: 'center',
    margin: '5%'
  },
  // Even smaller text for captions
  subText: {
    color: 'black',
    fontSize: '0.9rem',
    fontFamily: 'Cairo_500Medium',
    lineHeight: '1.2rem',
  },
  // Centered text
  centeredText: {
    color: 'black',
    fontSize: '1.25rem',
    padding: '0.25rem',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'Cairo_500Medium',
  },
    // Header
  titleText: {
    fontSize: '1.6rem',
    color: 'black',
    fontFamily: 'Manrope_700Bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  // Section header
  subheaderText: {
    fontSize: '1.4rem',
    color: 'black',
    fontFamily: 'Manrope_500Medium',
    textAlign: 'center',
    justifyContent: 'center',
  },
  creditsText: {
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  clickableText: {
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  // Text input field
  input: {
    backgroundColor: '#D1D1D1',
    borderRadius: '2rem',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    width: '13rem',
    height: '3rem',
    paddingLeft: '1rem',
    marginBottom: '1rem',
    alignSelf: 'center'
  },

// Leagcy (old)

// Generic horizontal flex
  horizontal: {
    flexDirection: 'row',
    margin: '0.5rem'
  },
//Login button (old, don't use)
  loginButton: {
    backgroundColor: '#F74F4F',
    padding: 10,
    borderRadius: 50, // Adjust the border radius to make it an oval shape
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the button absolutely
    top: 20, // Adjust the top position for the top-right corner
    right: 20, // Adjust the right position for the top-right corner
  },

  //NavBar

  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  menuIcon: {
    padding: 10,
  },
  menuText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Cairo_500Medium',
  },
  // Header
  titleText: {
    fontSize: '1.6rem',
    color: 'black',
    fontFamily: 'Manrope_700Bold',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '0.5rem',
  },
  // Section header
  subheaderText: {
    fontSize: '1.4rem',
    color: 'black',
    fontFamily: 'Manrope_500Medium',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '0.5rem',
  },

//Banner.js styling
  banner: {
    backgroundColor: 'salmon', // Set the background color of the banner
    paddingVertical: 10, // Adjust vertical padding as needed
    alignItems: 'center', // Center the title horizontally
  },
  title: {
    fontSize: 24, // Adjust the font size as needed
    color: 'black', // Set the text color
    fontFamily: 'Manrope_500Medium',
  },
});

export default global;