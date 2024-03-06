import React, { useState, useContext, useEffect } from 'react';
import { Modal, ScrollView, Text, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Context } from '../Context';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

EStyleSheet.build();

const RecipeAllergiesModal = ({ recipeAllergies }) => {
  const [def, setDef] = useState("");
  const { isRecipeAllergiesModalVisible, setRecipeAllergiesModalVisible, profileAllergies, setProfileAllergies, email } = useContext(Context);
  const navigation = useNavigation();
  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN;

  const allergenMapping = [
    'Dairy', 'Eggs', 'Fish', 'Shellfish',
    'Tree Nuts', 'Peanuts', 'Wheat', 'Soybeans',
    'Chicken', 'Pork', 'Red Meat', 'Gluten',
  ];

  useEffect(() => {
    const getProfileAllergies = async () => {
      try {
        const response = await fetch(`${API_BASE}/user/get/${email}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "GET"
        });
        const data = await response.json();
        const allergies = data[0].allergies;
        setProfileAllergies(allergies);
      } catch (error) {
        console.error(error);
      }
    };
    getProfileAllergies();
  }, []);

  

  const matchingAllergens = allergenMapping.filter((_, index) => profileAllergies && profileAllergies[index]);

  // Filter the recipeAllergies array against matchingAllergens
  const matchingRecipeAllergies = recipeAllergies ? recipeAllergies.filter(allergy => matchingAllergens.includes(allergy)) : [];

  if (matchingRecipeAllergies.length === 0) {
    setRecipeAllergiesModalVisible(false);
  }
 

  return (
    <GestureHandlerRootView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRecipeAllergiesModalVisible}
          onRequestClose={() => {
            setRecipeAllergiesModalVisible(!isRecipeAllergiesModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={global.titleText}>
                      Warning: This recipe contains allergens that match your profile. 
                      </Text>
              <ScrollView>
                <View style={styles.instructionsContainer}>
                  {matchingRecipeAllergies.length > 0 ? (
                    <>
                      
                      <Text style={global.subheaderText}>
                        This recipe contains{matchingRecipeAllergies.length > 1 ? ' the following allergies: ' : ' the following allergy: '} 
                        {matchingRecipeAllergies.length > 1 ? 
                          matchingRecipeAllergies.slice(0, -1).join(', ') + ', & ' : ''}
                        {matchingRecipeAllergies[matchingRecipeAllergies.length - 1]}.
                      </Text>



                    </>
                  ) : (
                    <Text style={global.bodyText}>
                      This recipe does not contain any of your profile allergies.
                    </Text>
                  )}
                </View>
              </ScrollView>

              <Pressable
                style={global.buttonMinor}
                onPress={() => { setRecipeAllergiesModalVisible(!isRecipeAllergiesModalVisible); }}>
                <Text style={global.buttonMinorText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '22.5rem',
    height: '25rem',
  },
  instructionsContainer: {
    justifyContent: 'center',
  }
});

export default RecipeAllergiesModal;