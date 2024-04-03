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
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import DropDownPicker from 'react-native-dropdown-picker';



EStyleSheet.build();

export default function Upload() {


    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: '', qty: '', unit: '' }]);
    const [steps, setSteps] = useState(['']);
    const [prepTime, setPrepTime] = useState('')
    const [servings, setServings] = useState('')
    const [category, setCategory] = useState('category')
    const [cusine, setCusine] = useState('cusine')
    const [previewInfo, setPreviewInfo] = useState([]); 
    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');
    const [stepError, setStepError] = useState('');
    const [prepError, setPrepError] = useState('');
    const [servingError, setServingError] = useState('');

        const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
        
        const maxSize = 2 * 1024 * 1024;

        const uploadRecipe = async () => {
            handleIngredientObjectToString
            const data = await fetch(API_BASE+"/recipe/new", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({title: title, desc: desc, total_time: prepTime, yields: servings, steps: steps, ingredients: handleIngredientObjectToString, cuisine: cusine, category: category, image: base64Image, allergies: uploadAllergies, email: email})
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
          const renderAllergyContent = () => {
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
            mediaTypes: ImagePicker.MediaTypeOptions.Image,
            allowsEditing: true,
            selectionLimit: 1,
            aspect: [4, 3],
            quality: 1,
            base64: true,
            type: 'image/jpeg'
          });      
          if (!result.canceled) {
            setImage(result.assets[0].uri);
            setBase64Image(result.assets[0].base64);
          }
        };




        const handleAddIngredient = () => {
            setIngredients(prevIngredients => {
                const updatedIngredients = [...prevIngredients, { ingredient: '', qty: '', unit: '' }];
                handleInputChange('ingredients', updatedIngredients);
                return updatedIngredients;
            });
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
            handleInputChange('ingredients', updatedIngredients); // Update fieldValidity
            return updatedIngredients;
        });
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleCuisineChange = (value) => {
        setCusine(value);
    };

    function handleIngredientObjectToString() {
        return ingredients.map((item, index) => {
            return item.qty + ' ' + item.unit.toString().toLowerCase() + ' ' + item.ingredient;
        });
    }

    const handleAddStep = () => {
        setSteps(prevSteps => {
            const updatedSteps = [...prevSteps, ''];
            handleInputChange('steps', updatedSteps);
            return updatedSteps;
        });
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
            handleInputChange('steps', updatedSteps); // Update fieldValidity
            return updatedSteps;
        });
    };


    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [units, setUnits] = useState([
    //     { label: 'Count', value: 'Count'},
    //     { label: 'Teaspoon', value: 'Teaspoon' },
    //     { label: 'Tablespoon', value: 'Tablespoon' },
    //     { label: 'Fluid ounce', value: 'Fluid ounce' },
    //     { label: 'Cup', value: 'Cup' },
    //     { label: 'Pint', value: 'Pint' },
    //     { label: 'Quart', value: 'Quart' },
    //     { label: 'Gallon', value: 'Gallon' },
    //     { label: 'Pinch', value: 'Pinch' },
    //     { label: 'Pound', value: 'Pound' },
    //     { label: 'Ounce', value: 'Ounce' },
    // ]);
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

    const [fieldValidity, setFieldValidity] = useState({
        title: false,
        desc: false,
        ingredients: false,
        steps: false,
        prep: false,
        servings: false,
    });

    const handleInputChange = (field, value) => {
        let isValid = false;
        if (field === 'ingredients' || field === 'steps') {
            // Check if the array has at least one item
            isValid = value.length > 0;
        } else {
            // For other fields, check if the value is not empty
            isValid = value.trim() !== '';
        }
    
        setFieldValidity(prevState => ({
            ...prevState,
            [field]: isValid,
        }));
    };

    const allFieldsValid = Object.values(fieldValidity).every(valid => valid);
    


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

                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Title</Text>
                            <Text style={styles.asterisk}>*</Text>
                        </View>
                        

                        <AutoGrowingTextInput
                            style={styles.input}  
                            maxLength={50}
                            placeholder="Enter your recipe title..."  
                            onChangeText={(text) => {
                                
                                if (text.length === 50) {
                                    setTitleError('Maximum character limit reached');
                                } else if (titleError && text.length < 50) {
                                    setTitleError('');
                                }       
                                setTitle(text);
                                handleInputChange('title',text);
                            }}
                        />
                        {titleError ? <Text style={{ ...styles.bodyText, color: 'red' }}>{titleError}</Text> : null}

              

                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Description</Text>
                                <Text style={styles.asterisk}>*</Text>
                            </View>
                        <AutoGrowingTextInput  
                            style={styles.input} 
                            maxLength={250}
                            placeholder="Enter your recipe description..." 
                            onChangeText={(text) => {
                                
                                if (text.length === 250) {
                                    setDescError('Maximum character limit reached');
                                } else if (descError && text.length < 250) {
                                    setDescError('');
                                }       
                                setDesc(text);
                                handleInputChange('desc',text);
                            }}
                        />
                        {descError ? <Text style={{ ...styles.bodyText, color: 'red' }}>{descError}</Text> : null}
                    </View>
                    
                    <View style={global.grayForeground}> 
                        

                        <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Ingredients</Text>
                                <Text style={styles.asterisk}>*</Text>
                        </View>

                        {ingredients.map((ingredient, index) => (
                            <View key={index} style={{flexDirection: 'row'}}> 
                                <AutoGrowingTextInput 
                                    style={styles.IngredientInput} 
                                    maxLength={50}
                                    placeholder="Enter your ingredient..."
                                    value={ingredient.ingredient}
                                    onChangeText={(value) => handleIngredientChange(index, 'ingredient', value)}
                                />
                                <TextInput 
                                    style={styles.QtyUnits} 
                                    maxLength={5}
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
                                        inputAndroid: {...styles.QtyUnits, color: "#000000", fontSize:20, width:100},
                                        placeholder: {...styles.QtyUnits, color: "#000000", fontSize:20, width:100},
                                    }}
                                    placeholder={{ label: "Select", value: null }}
                                    value={ingredient.unit  || ''}
                                />

                                {/* <DropDownPicker
                                    containerStyle={{...styles.QtyUnits, color: 'black', width:50, height: 50}}
                                    open={open}
                                    value={value}
                                    items={units}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setUnits}
                                /> */}
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
                    <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>Steps</Text>
                                <Text style={styles.asterisk}>*</Text>
                    </View>
                    {steps.map((step, index) => (
                        <View key={index} style={{flexDirection: 'row'}}> 
                        <Text style={styles.bodyText}>{index + 1}</Text>
                        <AutoGrowingTextInput 
                            style={styles.input} 
                            maxLength={250}
                            placeholder="Enter your step..." 
                            value={step.step}
                            // onChangeText={(value) => handleStepChange(index, value)}
                            onChangeText={(value) => {
                                
                                if (value.length === 250) {
                                    setStepError('Maximum character limit reached');
                                } else if (stepError && value.length < 250) {
                                    setStepError('');
                                }       
                                handleStepChange(index, value)}
                            }
                        />
                        </View>
                    ))}
                    <View>{stepError ? <Text style={{ ...styles.bodyText, color: 'red' }}>{stepError}</Text> : null}</View>
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Prep Time</Text>
                        <Text style={styles.asterisk}>*</Text>
                    </View>                    
                    <TextInput 
                        style={styles.prepServ} 
                        maxLength={5}
                        keyboardType='numeric'
                        placeholder="Time in Minutes" 
                        onChangeText={(text) => {
                                
                            if (text.length === 5) {
                                setPrepError('Maximum character limit reached');
                            } else if (titleError && text.length < 5) {
                                setPrepError('');
                            }       
                            setPrepTime(text);
                            handleInputChange('prep',text);

                        }}
                    />
                    {prepError ? <Text style={{ ...styles.bodyText, color: 'red' }}>{prepError}</Text> : null}
                    <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Servings</Text>
                            <Text style={styles.asterisk}>*</Text>
                    </View>
                    <TextInput 
                        style={styles.prepServ} 
                        maxLength={5}
                        keyboardType='numeric'
                        placeholder="Total Servings"
                        onChangeText={(text) => {
                                
                            if (text.length === 5) {
                                setServingError('Maximum character limit reached');
                            } else if (titleError && text.length < 5) {
                                setServingError('');
                            }       
                            setServings(text);
                            handleInputChange('servings',text);

                        }}
                    />
                    {servingError ? <Text style={{ ...styles.bodyText, color: 'red' }}>{servingError}</Text> : null}
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

                
                <View>
                    {allFieldsValid ? (
                        <Pressable onPress={uploadRecipe} style={global.button}>
                            <Text>Submit</Text>
                        </Pressable>
                    ) : (
                        <>
                            <Pressable onPress={() => {}} style={global.buttonInactive}>
                                <Text>Submit</Text>
                            </Pressable>
                            {/* Add this Text component right after the Pressable component */}
                            <Text style={{...styles.asterisk2, marginBottom: 10}}>Complete all required fields</Text>
                        </>
                    )}
                </View>
                </ScrollView> 
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    asterisk: {
        color: 'red',
        fontFamily: 'Manrope_700Bold',
        fontSize: '1.6rem',
        alignSelf: 'center',
    },
    asterisk2: {
        color: 'red',
        fontFamily: 'Cairo_500Medium',
        fontSize: '1rem',
        alignSelf: 'center',
    },
    titleText: {
        fontSize: '1.6rem',
        color: 'black',
        fontFamily: 'Manrope_700Bold',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
      input: {
        flex: 5,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1.2rem',
        fontFamily: 'Cairo_500Medium',
        width: '20rem',
        paddingLeft: '1rem',
        paddingVertical: '0.5rem',
        marginBottom: '1rem',
        alignSelf: 'center'
      },
      prepServ: {
        flex: 5,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1.2rem',
        fontFamily: 'Cairo_500Medium',
        width: 200,
        marginBottom: '1rem',
        paddingTop: '0.7rem',
        alignSelf: 'center',
        textAlign: 'center',
      },
      IngredientInput: {
        flex: 5,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '0.9rem',
        fontFamily: 'Cairo_500Medium',
        height: '8rem',
        paddingLeft: '1rem',
        marginBottom: '1rem',
      },
      QtyUnits: {
        flex:  2,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        alignItems: 'center', // Add this to center content vertically
        justifyContent: 'center', // Add this to center content horizontally
        textAlign: 'center', // Add this to center text horizontally
      },
      prepServings: {

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