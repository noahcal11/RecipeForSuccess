// App.js

import React from 'react';
//import styles from './Genstyle';
import { View } from 'react-native';
import SearchBar from './Components/SearchBar'; // Import your search bar component
import Footer from './Components/Footer';
import NavigationBar from './Components/NavBar';
import BannerTitle from './Components/Banner';
import RecipeDirections from './Components/RecipeDirections';
const directions = [
  'Preheat the oven to 350°F (180°C).',
  'In a large mixing bowl, combine the flour, sugar, and salt.',
  'Add the eggs and milk and mix until smooth.',
];
const App = () => {
  return (
    
    <View style={{ flex: 1 }}>
      {/* Search bar */}
      
      <SearchBar />
      <View style={{ flex: 1 }}>
      {/* Banner title */}
      <BannerTitle title="Recipe Title" />

      <NavigationBar />  
      {/*NavBar Here*/}

      {/* Your app content */}
    <View style={{ flex: 1 }}>
        {/* Main content goes here */}
     </View>
     
     <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Recipe Directions
      </Text>
      <RecipeDirections directions={directions} />
    </View>

       {/* Footer component */}
       <Footer />
    </View>
    </View>
  );
};

export default App;
//after i tried implementing the footer, the search bar stopped appearing