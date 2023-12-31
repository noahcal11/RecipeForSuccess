import Footer from '../Components/Footer';
import React, { useRef } from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView, TextInput} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import RNPickerSelect from 'react-native-picker-select';


EStyleSheet.build();

export default function upload() {
    const navigation = useNavigation();
    const [ingredients, setIngredients] = useState([{ ingredient: '', qty: '', unit: '' }]);
    const [steps, setSteps] = useState([{ step: '' }]);


    const handleAddIngredient = () => {
        setIngredients(prevIngredients => [...prevIngredients, { ingredient: '', qty: '', unit: '' }]);
    };

    const handleRemoveIngredient = () => {
        setIngredients(prevIngredients => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients.pop();
            return updatedIngredients;
        });
    };

    const handleIngredientChange = (index, field, value) => {
        setIngredients(prevIngredients => {
            const updatedIngredients = [...prevIngredients];
            updatedIngredients[index][field] = value;
            return updatedIngredients;
        });
    };

    const handleAddStep = () => {
        setSteps(prevSteps => [...prevSteps, { step: '' }]);
    };

    const handleRemoveStep = () => {
        setSteps(prevSteps => {
            const updatedSteps = [...prevSteps];
            updatedSteps.pop();
            return updatedSteps;
        });
    };

    const handleStepChange = (index, value) => {
        setSteps(prevSteps => {
            const updatedSteps = [...prevSteps];
            updatedSteps[index].step = value;
            return updatedSteps;
        });
    };

    const units = [
        { label: 'Standard Unit', value: 'Standard Unit' },
        { label: 'Cup', value: 'Cup' },
        { label: 'Pinch', value: 'Pinch' },
        { label: 'Pound', value: 'Pound' },
        { label: 'Teaspoon', value: 'Teaspoon' },
        { label: 'Tablespoon', value: 'Tablespoon' },
        { label: 'Teaspoon', value: 'Teaspoon' },
        
        // Add more units as necessary
    ];

    return(
        <View style={global.whiteBackground}>
            <Banner title="upload"/>
                <ScrollView>
                    <View style={global.grayForeground}>
                        <Text style={global.titleText}>Save area for picture</Text>
                    </View>

                    <View style={global.grayForeground}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput style={styles.input} placeholder="Enter your recipe title..." />

                        <Text style={styles.titleText}>Description</Text>
                        <TextInput style={styles.input} placeholder="Enter your recipe description..." />
                    </View>
                    
                    <View style={global.grayForeground}> 
                        <Text style={styles.titleText}>Ingredients</Text>
                        <Text>Need a better name than standard unit for 1x of the ingredient</Text>
                        {ingredients.map((ingredient, index) => (
                            <View key={index} style={{flexDirection: 'row'}}> 
                                <TextInput 
                                    style={styles.IngredientInput} 
                                    placeholder="Enter your ingredient..." z
                                    value={ingredient.ingredient}
                                    onChangeText={(value) => handleIngredientChange(index, 'ingredient', value)}
                                />
                                <TextInput 
                                    style={styles.QtyUnits} 
                                    keyboardType='numeric'
                                    placeholder="Qty" 
                                    value={ingredient.qty}
                                    onChangeText={(value) => handleIngredientChange(index, 'qty', value)}
                                />
                                <RNPickerSelect
                                    onValueChange={(value) => handleIngredientChange(index, 'unit', value)}
                                    items={units}
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputIOS: {...styles.QtyUnits, color: '#000', width:100},
                                        inputAndroid: {...styles.QtyUnits, color: '#000', width:100},
                                        placeholder: {...styles.QtyUnits, color: '#000', width:100},
                                    }}
                                    placeholder={{ label: "Select unit", value: null }}
                                    value={ingredient.unit}
                                />
                            </View>
                        ))}
                        
                    <Pressable style={global.button} onPress={handleAddIngredient}>
                        <Text>Add ingredient</Text>
                    </Pressable>

                    {ingredients.length > 1 && (
                        <Pressable style={global.button} onPress={handleRemoveIngredient}>
                            <Text>Remove last ingredient</Text>
                        </Pressable>
                    )}
                </View>

                <View style={global.grayForeground}> 
                    <Text style={styles.titleText}>Steps</Text>                            
                    {steps.map((step, index) => (
                        <View key={index} style={{flexDirection: 'row'}}> 
                        <Text style={styles.bodyText}>{index + 1}</Text>
                        <TextInput 
                            style={styles.IngredientInput} 
                            placeholder="Enter your step..." 
                            value={step.step}
                            onChangeText={(value) => handleStepChange(index, value)}
                        />
                        </View>
                    ))}
                    <Pressable style={global.button} onPress={handleAddStep}>
                        <Text>Add step</Text>
                    </Pressable>
                        {steps.length > 1 && (
                        <Pressable style={global.button} onPress={handleRemoveStep}>
                            <Text>Remove last step</Text>
                    </Pressable>
                    )}
                </View>

                <View style={global.grayForeground}> 
                    <Text style={styles.titleText}>Prep Time</Text>
                    <TextInput 
                        style={styles.QtyUnits} 
                        keyboardType='numeric'
                        placeholder="Enter number of total minutes" 
                    />
                    <Text style={styles.titleText}>Servings</Text>
                    <TextInput 
                        style={styles.QtyUnits} 
                        keyboardType='numeric'
                        placeholder="Enter number of total servings" 
                    />
                    <Text style={styles.titleText}>Category</Text>

                </View>
                
                <Pressable style={global.button} > 
                    <Text>Submit</Text>
                </Pressable>

                </ScrollView> 
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    titleText: {
        fontSize: '1.6rem',
        color: 'black',
        fontFamily: 'Manrope_700Bold',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
      input: {
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        width: '20rem',
        height: '3rem',
        paddingLeft: '1rem',
        marginBottom: '1rem',
        alignSelf: 'center'
      },
      IngredientInput: {
        flex: 5,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        paddingLeft: '1rem',
        marginBottom: '1rem',
      },
      QtyUnits: {
        flex: 1,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        textAlign: 'center',
      },
      bodyText: {
        minWidth: 20,
        color: 'black',
        fontSize: '1.5rem',
        fontFamily: 'Cairo_500Medium',
        flex: 0.3,
        paddingLeft: '0.5rem'
      },

})