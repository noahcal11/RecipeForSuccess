//General Style sheet to be used across different pages of app - Ibi

// styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    backgroundColor: '#F74F4F',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  //Footer


  footerContainer: {
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'black',
    fontSize: 16,
  },

//Login button
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },


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
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
});

export default styles;



//Image Styling

