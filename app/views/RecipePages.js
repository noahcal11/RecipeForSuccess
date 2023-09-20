
import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from '../Components/Footer'
import SearchBar from '../Components/SearchBar';

import styles from '../Genstyle' ;
import NavigationBar from '../Components/NavBar'; // Import your navigation bar component


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <NavigationBar />

      
      <Footer />
    </View>
  );
};

export default App;
