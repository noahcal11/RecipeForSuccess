import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from 'expo-checkbox';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Context'
import Banner from './Banner';
import Footer from '../Components/Footer'
import { ScrollView } from 'react-native-gesture-handler';
import global from '../Genstyle'

// TODO: Make buttons go to the bottom of the page, add a timer
const RecipeProgression = ({ingredients, directions, title}) => {
    // Variables
    const [stepNum, setStepNum] = useState(0);
    // Variables for Checkbox section
    const [allChecked, setAllChecked] = useState(false);
    const [toggleCheck, setToggleCheck] = useState(new Array(ingredients.length).fill(false));
    const [selectAll, setSelectAll] = useState(false);
    // Variables for Timer section
    const [isActive, setIsActive] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const [time, setTime] = useState("00:00");
    var startTime = new Date();
    // Global variables
    const { recipePageState, setRecipePageState, username, email } = useContext(Context);
    const recipeTitle = title;

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
                <View style={{ flex: 1 }}>
                    <Text style={global.titleText}>Ingredients for {recipeTitle}:</Text>
                    <View style={global.horizontal}>
                        <Text style={styles.globalSelect}>Select All</Text>
                        <CheckBox style={styles.checkbox}
                            disabled={false}
                            value={selectAll}
                            onValueChange={() => {
                                setSelectAll(!selectAll)
                                setAllChecked(!selectAll)
                                setToggleCheck(toggleCheck.map(() => {return !selectAll}))
                            }}
                        />
                    </View>
                    <FlatList // List that displays each ingredient, as well as a checkbox
                        data={ingredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>{item}</Text>
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
                            <Pressable
                                onPress={() => {{
                                    setStepNum(stepNum + 1)
                                    setIsActive(true)
                                }}}
                                style={styles.nextButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </Pressable>
                            :<Pressable // Otherwise, display a gray button that does nothing
                                onPress={() => {}}
                                style={styles.grayButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </Pressable>
                        }
                        <Pressable
                            onPress={() => {setRecipePageState('details')}}
                            style={global.buttonMinor}>
                            <Text style={global.subText}>Go Back</Text>
                        </Pressable>
                    </View>
                </View>
            );
        } else { // Displays the directions in order
            return (
                <View style={{ flex: 1 }}>
                    <Text style={global.titleText}>Step {stepNum}:</Text>
                    <Text style={global.centeredText}>{directions[stepNum - 1]}</Text>
                    {/* TODO: Add a timer to track time spent on recipe */}
                    {/* Next button */}
                    {stepNum == directions.length ?
                        <Pressable // If on the last step, button sends user to the survey page
                            onPress={() => {setRecipePageState('survey')}}
                            style={global.button}>
                                <Text style={global.buttonText}>Finish!</Text>
                        </Pressable>
                        :<Pressable // Otherwise, button just leads to the next step
                            onPress={() => {setStepNum(stepNum + 1)}}
                            style={global.button}>
                                <Text style={global.buttonText}>Next</Text>
                        </Pressable>
                    }
                    {/* Back button */}
                    <Pressable // Decrement step count when going back
                        onPress={() => {setStepNum(stepNum - 1)}}
                        style={global.buttonMinor}>
                            <Text style={global.subText}>Go Back</Text>
                    </Pressable>
                    {/* Timer */}
                    <View style={styles.timer}>
                        <Text style={global.centeredText}>{time}</Text>
                        <Pressable
                            onPress={() => {setIsActive(!isActive)}}
                            style={global.buttonAlt}>
                            {isActive ?
                            <Text style={global.subText}>Pause</Text>
                            :<Text style={global.subText}>Resume</Text>}
                        </Pressable>
                    </View>
                </View>
            );
        }
    }

    const updateTime = (ms) => {
        const sec = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
        const min = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
        setTime(min + ":" + sec);
    }

    // Ensures the timer updates constantly
    useEffect(() => {
        if(!isActive) return;
        var id = setInterval(() => {
            var remainder = passedTime + (new Date() - startTime);
            setPassedTime(remainder);
            updateTime(remainder);
            // Failsafe if timer goes negative
            if(remainder <= 0) {
                setTime("00:00");
                clearInterval(id);
            }
        }, 1)
        return () => clearInterval(id);
    }, [isActive])

    return (
        <View style={styles.container}>
            <Banner title={"Progression"}/>
            {/* //almost working except the page does not know where to get recipe title from
            <Text style={styles.title}> {recipe.title} </Text> */}
            {steps()}
        </View>
    )
}

export default RecipeProgression;

const styles=EStyleSheet.create({
    timer: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        width: '60%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Manrope_500Medium',
        marginVertical: 20,
        textAlign: 'center',
      },
    heading: {
        fontSize: '2rem',
        fontFamily: 'Manrope_500Medium',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    globalSelect: {
        color: 'black',
        fontSize: '1.1rem',
        fontFamily: 'Cairo_500Medium',
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
        marginRight: '5%'
    },
    ingredientList: {
        flexDirection: 'row',
        margin: '0.7rem'
    },
    ingredientItem: {
        flex: 7,
    },
    checkbox: {
        width: 27,
        height: 27,
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
        fontFamily: 'Cairo_500Medium',
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