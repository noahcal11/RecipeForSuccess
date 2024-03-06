import React, { useState, useContext, useEffect } from 'react';
import { Modal, ScrollView, Text, Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Context } from '../Context';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

EStyleSheet.build();

const RecipeAllergiesModal = ({ recipeAllergies }) => {
  console.log("recipe allergies " + recipeAllergies)
  const { isRecipeAllergiesModalVisible, setRecipeAllergiesModalVisible, profileAllergies, setProfileAllergies, email } = useContext(Context);
  const navigation = useNavigation();
  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN;


  useEffect(() => {
    getProfileAllergies();
}, []);

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
      console.log("profile allergies " + profileAllergies);

      // Only show the modal if there are matching allergies
      if (matchingAllergens.length > 0) {
          setRecipeAllergiesModalVisible(true);
      }
  } catch (error) {
      console.error(error);
  }
};


const matchingAllergens = recipeAllergies.filter(recipeAllergies => profileAllergies.includes(recipeAllergies));
console.log("matching allergies " + matchingAllergens);

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
                  {matchingAllergens.length > 0 ? (
                    <>
                      
                      <Text style={global.subheaderText}>
                        This recipe contains{matchingAllergens.length > 1 ? ' the following allergies: ' : ' the following allergy: '} 
                        {matchingAllergens.length > 1 ? 
                          matchingAllergens.slice(0, -1).join(', ') + ', & ' : ''}
                        {matchingAllergens[matchingAllergens.length - 1]}.
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