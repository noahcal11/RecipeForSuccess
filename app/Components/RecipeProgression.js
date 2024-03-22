import React from 'react';
import { View, Text, Pressable, FlatList, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from 'expo-checkbox';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../Context';
import { useNavigation } from '@react-navigation/native';
import DefinitionModal from './IngInstructionModel';
import Banner from './Banner';
import Footer from '../Components/Footer';
import global from '../Genstyle';

// TODO: Make buttons go to the bottom of the page, add a timer
const RecipeProgression = ({ingredients, directions, title}) => {
    const navigation = useNavigation()
    // Variables
    const [stepNum, setStepNum] = useState(0);
    // Variables for Checkbox section
    const [allChecked, setAllChecked] = useState(false);
    const [toggleCheck, setToggleCheck] = useState(new Array(ingredients.length).fill(false));
    const [selectAll, setSelectAll] = useState(false);
    // Variables for Timer section
    const [isActive, setIsActive] = useState(false);
    const [passedTime, setPassedTime] = useState(0);
    const [time, setTime] = useState("00:00:00");
    // Variables for Keyword Display
    const [keywords, setKeywords] = useState(['abfhbfaifbiabifae']);
    const [selKey, setSelKey] = useState("");
    var startTime = new Date();
    // Global variables
    const { recipePageState, setRecipePageState, username, email, isIngInstructionsModelVisible, setIngInstructionsModelVisible } = useContext(Context);
    const recipeTitle = title;

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

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
                                    // setIsActive(true)
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
                <View style={{flex: 1}}>
                {/* <ScrollView style={{ flex: 1 }}> */}
                    <Text style={global.titleText}>Step {stepNum}:</Text>
                    {/* TODO: Make keywords display as buttons */}
                    <ScrollView style={{ flex: 1 }}>
                    <Text style={global.centeredText}>
                        {parseStep(directions[stepNum - 1])}
                        {/* {directions[stepNum - 1]} */}
                    </Text>
                    </ScrollView>
                    {/* Definition Modal */}
                    {isIngInstructionsModelVisible ?
                        <DefinitionModal word={selKey} />
                        :<></>}
                    {/* Next button */}
                    {stepNum == directions.length ?
                        <Pressable // If on the last step, button sends user to the survey page
                            onPress={() => {
                                if(username === "Guest") {navigation.navigate('Home')}
                                setRecipePageState('survey')
                            }}
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
                        <View style={{flexDirection: 'row', marginBottom: '5%'}}>
                            <Pressable
                                onPress={() => {setIsActive(!isActive)}}
                                style={{...global.buttonAlt, width: '40%', marginRight: '2%'}}>
                                {isActive ?
                                <Text style={global.subText}>Pause</Text>
                                :<View>
                                    {time == "00:00:00" ?
                                    <Text style={global.subText}>Start</Text>
                                    :<Text style={global.subText}>Resume</Text>}
                                </View>}
                            </Pressable>
                            {isActive ?
                            <Pressable onPress={() => {}}
                                style={{...global.buttonInactive, width: '40%', marginLeft: '2%'}}>
                                <Text style={global.subText}>Reset</Text>
                            </Pressable>
                            :<Pressable onPress={() => {
                                    setTime("00:00:00");
                                    setPassedTime(0);
                                }}
                                style={{...global.buttonAlt, width: '40%', marginLeft: '2%'}}>
                                <Text style={global.subText}>Reset</Text>
                            </Pressable>}
                        </View>
                    </View>
                {/* </ScrollView> */}
                </View>
            );
        }
    }

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay))
    }

    const updateTime = (time) => {
        const sec = Math.floor(time % 60).toString().padStart(2, "0");
        const min = Math.floor((time / 60) % 60).toString().padStart(2, "0");
        const hour = Math.floor((time / 60) / 60).toString().padStart(2, "0");
        setTime(hour + ":" + min + ":" + sec);
    }

    // Ensures the timer updates constantly
    useEffect(() => {
        if(!isActive) return;
        timeout(1000).then(() => {
            setPassedTime(passedTime + 1)
            updateTime(passedTime)
        });
        // Failsafe if timer goes negative
        if(passedTime <= 0) {
            setTime("00:00:00");
            setPassedTime(0);
        }
    }, [isActive, passedTime])

    // Get the keyword data
    useEffect(() => {
        getKeywords();
    }, [])

    const getKeywords = async () => {
        // Fill "keywords" with the list of keywords from the database
        const key = await fetch(API_BASE+"/keyword/get-all", {
            method: "GET"
        }).then(res => res.json())
        .catch(error => console.error(error));
        // Get the list of suffixes
        let list = [];
        key.forEach(e => {
            // Turn the suffix list into an array
            sfx = e.suffixes[0].split(' ');
            // Trim commas off the end of each word
            sfx = sfx.map((item, index) => {
                if(item.includes(",")) {
                    return item.slice(0, item.length - 1);
                } else return item;
            })
            // Add the current list to the overall list
            list = list.concat(sfx);
        });
        setKeywords(list);
    }

    function parseStep(step) {
        // Parse the step into an array, with each value being an individual word.
        let words = step.split(' ');
        // Create a new array with both text and pressables
        let objects = words.map((word, index) => {
            // Conform the word to match the format of the keywords
            let newWord = formatWord(word);
            // Compare the word to the list of keywords
            // TODO: Add an API call that gets keywords.suffixes for all keywords
            const match = keywords.find((keyword) => keyword === newWord)
            if(typeof match !== "undefined") {
                // If a match is found, turn the word into a pressable
                // NOTE: Text doesn't align properly if made into a pressable, might break on web
                return <Text><Text
                 style={styles.keywordText}
                 onPress={(() => {setSelKey(formatWord(word)); setIngInstructionsModelVisible(true);})}>
                    {word}
                </Text><Text> </Text></Text>
                // If not match, keep the word as-is
            } else return word + " "
        })
        // Display the resulting array of objects
        return <Text style={styles.output}>
            {objects.map(item => {
                return item
            })}
        </Text>
    }

    function formatWord(word) {
        let newWord = word.slice(0,1).toUpperCase() + word.slice(1, word.length);
        if(newWord.includes(".") || newWord.includes(",")) {
            newWord = newWord.slice(0, newWord.length - 1)
        }
        return newWord;
    }

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
        flex: 0.3,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: '5%',
        marginBottom: '5%',
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
    keywordText: {
        fontSize: '1.25rem',
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'underline',
        paddingHorizontal: '0.25rem',
        marginBottom: '0.5rem',
    },
    output: {
        marginVertical: '1rem'
    },
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
})