//General Style sheet to be used across different pages of app - Ibi

// styles.js

// import { StyleSheet } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";

EStyleSheet.build();

const global = EStyleSheet.create({
  // Gray background
  background: {
    backgroundColor: '#ddd',
    flex: 1
  },
  // White foreground
  foreground: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginHorizontal: '2.2rem',
    marginVertical: '4rem',
    borderRadius: '2rem'
  },
  // Gray foreground
  reverseForeground: {
    flex: 1,
    backgroundColor: '#eee',
    //justifyContent: 'center',
    marginHorizontal: '0.6rem',
    marginVertical: '1rem',
    borderRadius: '2rem'
  },
  // Generic container
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  // Generic text
  text: {
    fontSize: '2rem',
    color: 'black',
    fontFamily: 'Cairo_500Medium',
  },
  // Action button
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    marginBottom: '1rem',
    width: '13rem',
    height: '3rem',
    alignSelf:  'center'
  },
  // Text for buttons
  buttonText: {
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    fontWeight: 'bold',
  },
  // Grey button that does nothing
  buttonInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderRadius: 25,
    marginBottom: '1rem',
    width: '13rem',
    height: '3rem',
    alignSelf:  'center'
  },
  // Light gray button for less important buttons
  buttonMinor: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 25,
    marginBottom: '1rem',
    width: '13rem',
    height: '3rem',
  },
  // Alt colored button
  buttonAlt: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F67D7D',
    borderRadius: 25,
    marginBottom: '1rem',
    width: '13rem',
    height: '3rem',
    alignSelf:  'center'
  },
  // Slightly smaller text for paragraphs
  bodyText: {
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'Cairo_500Medium',
    flex: 1,
  },
  // Even smaller text for captions
  subText: {
    color: 'black',
    fontSize: '0.8rem',
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
    fontWeight: 'bold',
    fontFamily: 'Manrope_500Medium',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '0.5rem',
  },
  // Section header
  subheaderText: {
    fontSize: '1.4rem',
    color: 'black',
    fontWeight: 'bold',
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
    fontWeight: 'bold', // Adjust font weight as needed
    fontFamily: 'Manrope_500Medium',
  },
});

export default global;