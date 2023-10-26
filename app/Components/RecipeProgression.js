import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Touchable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from 'expo-checkbox';
import { useState, useContext } from 'react';
import { Context } from '../App'
import Banner from './Banner';
import Footer from '../Components/Footer'
import { ScrollView } from 'react-native-gesture-handler';

// TODO: style this page so it actually looks good
const RecipeProgression = ({ingredients, directions, title}) => {
    // Variables
    const [stepNum, setStepNum] = useState(0);
    const [allChecked, setAllChecked] = useState(false);
    const [toggleCheck, setToggleCheck] = useState(new Array(ingredients.length).fill(false));
    const { recipePageState, setRecipePageState, username, email } = useContext(Context);

    // Handler for when you click on a checkbox
    function changeHandler(pos) {
        setAllChecked(true);
        setToggleCheck(toggleCheck.map((item, index) => {
            var newValue = false;
            if(index === pos) {newValue = !item} else {newValue = item}
            if(!newValue) {setAllChecked(false)}
            return newValue
        }));
    }

    // The main function
    function steps() {
        if(stepNum == 0) { // Displays the ingredient list
            return (
                <View>
                    <Text style={styles.heading}>First, prepare the ingredients:</Text>
                    <FlatList // List that displays each ingredient, as well as a checkbox
                        data={ingredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.ingredientList}>
                                <Text style={styles.ingredientItem}>{item}</Text>
                                <CheckBox style={styles.checkbox}
                                    disabled={false}
                                    value={toggleCheck[index]}
                                    // color={}
                                    onValueChange={() => {changeHandler(index)}}
                                />
                            </View>
                        )}
                    />
                    {/* Button that selects or deselects all checkboxes */}
                    <View> 
                        {allChecked ? // If all checkboxes are selected, display a button
                                        // that progresses to the directions section
                            <TouchableOpacity
                                onPress={() => {{setStepNum(stepNum + 1)}}}
                                style={styles.nextButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </TouchableOpacity>
                            :<TouchableOpacity // Otherwise, display a gray button that does nothing
                                onPress={() => {}}
                                style={styles.grayButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            );
        } else { // Displays the directions in order
            return (
                <View>
                    <Text style={styles.header}>Step {stepNum}:</Text>
                    <Text style={styles.step}>{directions[stepNum - 1]}</Text>
                    {stepNum == directions.length ?
                        <TouchableOpacity // If on the last step, button sends user to the survey page
                            onPress={() => {setRecipePageState('survey')}}
                            style={styles.nextButton}>
                                <Text style={styles.buttonText}>Finish!</Text>
                        </TouchableOpacity>
                        :<TouchableOpacity // Otherwise, button just leads to the next step
                            onPress={() => {setStepNum(stepNum + 1)}}
                            style={styles.nextButton}>
                                <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    }
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Banner title={title} username={username} email={email}/>
            {steps()}
            <Footer username={username} email={email} />
        </View>
    )
}

export default RecipeProgression;

const styles=EStyleSheet.create({
    heading: {
        fontSize: '2rem',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    ingredientList: {
        flexDirection: 'row',
        margin: '0.7rem'
    },
    ingredientItem: {
        flex: 7,
    },
    checkbox: {
        flex: 1,
        width: '1rem',
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: '2rem',
        marginBottom: '1rem',
        width: '13rem',
        height: '3rem',
        alignSelf:  'center'
    },
    grayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bbb',
        borderRadius: '2rem',
        marginBottom: '1rem',
        width: '13rem',
        height: '3rem',
        alignSelf:  'center'
    },
    buttonText: {
        color: 'white',
        fontSize: '1rem',
    },
    step: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
})