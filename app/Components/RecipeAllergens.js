import React from 'react';
import { View, Text, Pressable, Dimensions } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

const allergenMapping = [
    'Chicken',
    'Dairy',
    'Eggs',
    'Fish',
    'Peanuts',
    'Pork',
    'Red Meat',
    'Shellfish',
    'Soybeans',
    'Tree Nuts',
    'Wheat',
];

const RecipeAllergens = ({ allergies }) => {
  if (!allergies || allergies.length === 0) {
    return <Text style={[global.bodyText, {textAlign: 'center'}]}>No allergens have been uploaded for this recipe.</Text>;
}

  const allergenNames = allergies.map((hasAllergen, index) => {
    if (hasAllergen) {
      return allergenMapping[index];
    }
    return null; // Or any other indicator for absence of allergen
  }).filter(Boolean); // Filter out null values

  return (
    <View style={styles.container}>
      {allergenNames.map((allergy, index) => (
        <Pressable key={index} style={styles.button}>
            <Text style={global.buttonText}>{allergy}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default RecipeAllergens;

const styles = EStyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#f56c42',
        borderRadius: 25,
        width: (Dimensions.get('window').width - 60) / 3, // Adjusting the width dynamically for 3 buttons per row
        height:  50, // Adjust height as needed
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
});