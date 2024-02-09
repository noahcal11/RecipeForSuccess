import Footer from '../Components/Footer';
import React, { useRef } from 'react';
import { Text, View, FlatList, SafeAreaView, StyleSheet, Modal, TouchableOpacity, ScrollView, TextInput, Button, Image, Platform, Pressable} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext,useEffect } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import AllergySwitchComp from '../Components/UploadAllergySwitch';


EStyleSheet.build();

export default function Upload() {

        const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
        

        const uploadRecipe = async () => {
            handleIngredientObjectToString
            const data = await fetch(API_BASE+"/recipe/new", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({title: title, desc: desc, total_time: prepTime, yields: servings, steps: steps, ingredients: handleIngredientObjectToString, cuisine: cusine, category: category, link: "yourmom.com", allergies: uploadAllergies, email: email})
            }).then(navigation.navigate('Profile'));
        }
        
        function preview() {
            setPreviewInfo([title, desc, ingredients, steps, image]);
            navigation.navigate('Preview', { info: previewInfo });
        }

        const [image, setImage] = useState(null);
      
        const allergies = [
            {
              content: [
                { title: 'Chicken' },
                { title: 'Dairy'},
                { title: 'Eggs'},
                { title: 'Fish'},
                { title: 'Peanuts'},
                { title: 'Pork'},
                { title: 'Red Meat'},
                { title: 'Shellfish'},
                { title: 'Soybeans'},
                { title: 'Tree Nuts'},
                { title: 'Wheat'},
              ],
            },
          ];

          const {uploadAllergies, setUploadAllergies, email} = useContext(Context);

          const renderContent = () => {
            return (
              <View>
                {allergies.map((section, sectionIndex) => (
                  <View key={sectionIndex}>
                    <Text style={global.centerBodyText}>{section.title}</Text>
                    {section.content.map((item, index) => (
                      <View style={global.horizontal} key={index}>
                        <Text style={global.bodyText}>{item.title}</Text>
                        <AllergySwitchComp name={item.title} index={index} state={uploadAllergies[index]}> </AllergySwitchComp>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            );
        };


        const pickImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        };

    const navigation = useNavigation();
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [ingredients, setIngredients] = useState([{ ingredient: '', qty: '', unit: '' }]);
    const [steps, setSteps] = useState([]);
    const [prepTime, setPrepTime] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('category')
    const [cusine, setCusine] = useState('cusine')
    const [previewInfo, setPreviewInfo] = useState([]); 

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

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleCuisineChange = (value) => {
        setCusine(value);
    };

    const handleIngredientObjectToString = ingredients.map((item, index) => {
        return item.qty + ' ' + item.unit.toString().toLowerCase() + ' ' + item.ingredient;
    })

    const handleAddStep = () => {
        setSteps(prevSteps => [...prevSteps, '']);
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
            updatedSteps[index] = value;
            return updatedSteps;
        });
    };

    const units = [
        { label: 'Count', value: 'Count'},
        { label: 'Teaspoon', value: 'Teaspoon' },
        { label: 'Tablespoon', value: 'Tablespoon' },
        { label: 'Fluid ounce', value: 'Fluid ounce' },
        { label: 'Cup', value: 'Cup' },
        { label: 'Pint', value: 'Pint' },
        { label: 'Quart', value: 'Quart' },
        { label: 'Gallon', value: 'Gallon' },
        { label: 'Pinch', value: 'Pinch' },
        { label: 'Pound', value: 'Pound' },
        { label: 'Ounce', value: 'Ounce' },
    ];

    const categories = [
        { label: 'Snack', value: 'Snack'},
        { label: 'Appetizer', value: 'Appetizer'},
        { label: 'Breakfast', value: 'Breakfast'},
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Dessert', value: 'Dessert' },
    ];

    const cuisine = [
        { label: 'African', value: 'African'},
        { label: 'American', value: 'American'},
        { label: 'Asian', value: 'Asian'},
        { label: 'Australian', value: 'Australian' },
        { label: 'European', value: 'European' },
        { label: 'Indian', value: 'Indian'},
        { label: 'Italian', value: 'Italian'},
        { label: 'Latin American', value: 'Latin American' },
        { label: 'Mediterranean', value: 'Mediterranean' },
        { label: 'Mexican', value: 'Mexican' },
        { label: 'Middle Eastern', value: 'Middle Eastern' },
    ];


    return(
        <View style={global.whiteBackground}>
            <Banner title="Upload"/>
                <ScrollView>
                    
                <View style={styles.grayForeground}>
                    <TouchableOpacity onPress={pickImage} style={styles.opacityStyle}>
                        <Text style={{...styles.titleText,color:'blue'}}>Press to Select Image</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

                    <View style={global.grayForeground}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput style={styles.input} placeholder="Enter your recipe title..." onChangeText={setTitle}/>


                        <Text style={styles.titleText}>Description</Text>
                        <TextInput style={styles.input} placeholder="Enter your recipe description..." onChangeText={setDesc}/>
                    </View>
                    
                    <View style={global.grayForeground}> 
                        <Text style={styles.titleText}>Ingredients</Text>
                        {ingredients.map((ingredient, index) => (
                            <View key={index} style={{flexDirection: 'row'}}> 
                                <TextInput 
                                    style={styles.IngredientInput} 
                                    placeholder="Enter your ingredient..."
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
                                    onValueChange={(value) => handleIngredientChange(index, 'unit', value || '')}
                                    items={units}
                                    useNativeAndroidPickerStyle={false}
                                    style={{
                                        inputIOS: {...styles.QtyUnits, color: 'black', width:100},
                                        inputAndroid: {...styles.QtyUnits, color: 'black', width:100},
                                        placeholder: {...styles.QtyUnits, color: 'black', width:100},
                                    }}
                                    placeholder={{ label: "Select", value: null }}
                                    value={ingredient.unit  || ''}
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
                        onChangeText={setPrepTime}
                    />
                    <Text style={styles.titleText}>Servings</Text>
                    <TextInput 
                        style={styles.QtyUnits} 
                        keyboardType='numeric'
                        placeholder="Enter number of total servings"
                        onChangeText={setServings}
                    />
                    <Text style={styles.titleText}>Category</Text>
                    <Text style={styles.bodyText}>Select Category</Text>
                    <RNPickerSelect
                        items={categories}
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputIOS: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                            inputAndroid: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                            placeholder: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                        }}
                        placeholder={{ label: "Select", value: null }}
                        onValueChange={handleCategoryChange}
                    />
                    <Text style={styles.bodyText}>Select Cuisine</Text>
                    <RNPickerSelect
                        items={cuisine}
                        useNativeAndroidPickerStyle={false}
                        style={{
                            inputIOS: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                            inputAndroid: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                            placeholder: {...styles.QtyUnits, color: 'black', width:200, alignSelf: 'center'},
                        }}
                        placeholder={{ label: "Select", value: null }}
                        onValueChange={handleCuisineChange}
                    />
                </View>
                
                <View style={global.grayForeground}> 
                    <Text style={styles.titleText}>Select Allergies</Text>
                    <Text style={styles.bodyText}>Select any allergies that your recipe contains</Text>
                    {renderAllergyContent()}
                </View>

                <Pressable style={global.button} onPress={preview}> 
                    <Text>Preview</Text>
                </Pressable>

                <Pressable onPress={uploadRecipe} style={global.button }>
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
        flex: 2,
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
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        flex: 0.3,
        paddingLeft: '0.5rem',
        textAlign: 'center',
      },
      image: {
        width: '20rem',
        height: '20rem',
        alignSelf: 'center',
        marginBottom: '1rem'
      },
      grayForeground: {
        backgroundColor: '#eee',
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderRadius: 25,
        flex:1,
        hheight: '30rem',
      },
      opacityStyle: {
        fontSize: '100rem',
        justifyContent: 'center', 
        alignItems: 'center',
      },
      icon: {
        height: 200,
        width: 200,
        alignItems: 'left'
    },
})