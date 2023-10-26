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
  // Generic container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // Generic text
  text: {
    fontSize: '2rem',
    color: 'black',
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
  // Slightly smaller text for paragraphs
  bodyText: {
    color: 'black',
    fontSize: '1rem',
  },
  // Centered text
  centeredText: {
    color: 'black',
    fontSize: '1.25rem',
    padding: '0.5rem',
    textAlign: 'center',
    justifyContent: 'center'
  },
  // Text input field
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
  // Generic horizontal flex
  horizontal: {
    flexDirection: 'row',
    marginHorizontal: '0.2rem'
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
  },
  // Header
  titleText: {
    fontSize: '1.8rem',
    color: 'black',
    // font: manrope
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: '0.5rem',
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
  },
});

export default global;