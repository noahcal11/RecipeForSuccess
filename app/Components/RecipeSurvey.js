import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Banner from './Banner'
import Footer from '../Components/Footer'
import { useContext } from 'react';
import { Context } from '../App'
/* TODO:
    - The background color for each button is set dynamically,
        so it cannot be combined with the regular stylesheet.
        Figure out how to allow the button to use both stylings.

    - There is currently nothing that determines what steps
        correspond to what skills. Find a way to do this.

    - The page was made functional before styling it. Finish
        the stylesheet so it looks presentable.

    - Update the skills page (and this page) so that the new
        skill values from the survey will update the user's
        skills.
*/
const RecipeSurvey = ({directions, title}) => {
    const navigation = useNavigation()
    const [skillList, setSkillList] = useState([0,0,0,0]);
    const [selectedButton, setSelectedButton] = useState(new Array(directions.length + 1).fill(0));
    const [allSelected, setAllSelected] = useState(false);
    const { setRecipePageState, username, email } = useContext(Context);

    const RatingButtons = (skill, stepID) => {
        function setBackgroundColor(id) {
            if(id == selectedButton[stepID]) {
                switch(id) {
                    case 1:
                        return 'green';
                    case 2:
                        return 'yellow';
                    case 3:
                        return 'red';
                    default:
                        return 'gray';
                }
            } else return 'gray';
        }

        return (
            <View style={styles.buttonContainer}>
                <Pressable
                    // TODO: figure out how to combine a dynamic styling with the stylesheet 
                    style={{ backgroundColor: setBackgroundColor(1) }}
                    onPress={() => {
                        setAllSelected(true);
                        // Increment the relevant skill
                        setSkillList(skillList.map((item, index) => {
                            if(index === skill) {
                                // If the button has already been selected, do not increment
                                if(selectedButton[stepID] == 1) {
                                    return item
                                // If switching from bad to good, increment twice
                                } else if(selectedButton[stepID] == 3) {
                                    return item + 2
                                // Otherwise, increment once
                                } else return item + 1
                            } else {return item}
                        }))
                        // Update the color of the button once selected
                        setSelectedButton(selectedButton.map((item, index) => {
                            var newValue = 0;
                            if(index === stepID) {newValue = 1} else {newValue = item}
                            if(newValue == 0) {setAllSelected(false)}
                            return newValue
                        }))
                    }}>
                    <Text style={styles.buttonText}>Good</Text>
                </Pressable>
                <Pressable
                    style={{ backgroundColor: setBackgroundColor(2) }}
                    onPress={() => {
                        setAllSelected(true)
                        // Adjust the relevant skill
                        setSkillList(skillList.map((item, index) => {
                            if(index === skill) {
                                // If switching from good to okay, decrement
                                if(selectedButton[stepID] == 1) {
                                    return item - 1
                                // If switching from bad to okay, increment
                                } else if(selectedButton[stepID] == 3) {
                                    return item + 1
                                // Otherwise, do nothing
                                } else return item
                            } else {return item}
                        }))
                        // Update the color of the button once selected
                        setSelectedButton(selectedButton.map((item, index) => {
                            var newValue = 0;
                            if(index === stepID) {newValue = 2} else {newValue = item}
                            if(newValue == 0) {setAllSelected(false)}
                            return newValue
                        }))
                    }}>
                    <Text style={styles.buttonText}>Okay</Text>
                </Pressable>
                <Pressable
                    style={{ backgroundColor: setBackgroundColor(3) }}
                    onPress={() => {
                        setAllSelected(true)
                        // Decrement the relevant skill
                        setSkillList(skillList.map((item, index) => {
                            if(index === skill) {
                                // If the button has already been selected, do not decrement
                                if(selectedButton[stepID] == 3) {
                                    return item
                                // If swithcing from good to bad, decrement twice
                                } else if(selectedButton[stepID] == 1) {
                                    return item - 2
                                // Otherwise, decrement once
                                } else return item - 1
                            } else {return item}
                        }))
                        // Update the color of the button once selected
                        setSelectedButton(selectedButton.map((item, index) => {
                            var newValue = 0;
                            if(index === stepID) {newValue = 3} else {newValue = item}
                            if(newValue == 0) {setAllSelected(false)}
                            return newValue
                        }))
                    }}>
                    <Text style={styles.buttonText}>Bad</Text>
                </Pressable>
            </View>
        )
    }

    const Finish = () => {
        navigation.navigate("Skills");
        setRecipePageState('details');
    }

    return(
        <View style={styles.container}>
            {/* Header */}
            <Banner title={title}/>
            <Text style={styles.header}>Great Job!</Text>
            <Text style={styles.subheader}>Let us know how you did:</Text>
            {/* First Question (ingredient prep) */}
            <View style={styles.ingredientQuestion}>
                <Text style={styles.ingredientText}>How well did you prepare the ingredients?</Text>
                {/* Insert a pair of buttons where only one can be "activated" */}
                {RatingButtons(0, 0)}
            </View>
            <FlatList
                data={directions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.stepList}>
                        <Text style={styles.stepQuestion}>How well did you do in step {index + 1}?</Text>
                        <Text style={styles.stepInfo}>{item}</Text>
                        {/* Insert same button system as in the ingredient step */}
                        {/* TODO: Determine which skill each step correlates to */}
                        {RatingButtons(1, index + 1)}
                    </View>
                )}
            />
            {/* Insert submit button that is unavailable until all button pairs have a selection */}
            {/* This button will redirect to the skills page and show your improvement */}
            {allSelected ?
                <Pressable
                    style={styles.finishButton}
                    onPress={() => {Finish()}}>
                        <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                :
                <Pressable
                    style={styles.grayButton}
                    onPress={() => {}}>
                        <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            }
        </View>
    );
}

export default RecipeSurvey;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontFamily: 'Manrope_500Medium',
    },
    subheader: {
        fontFamily: 'Manrope_500Medium',
    },
    ingredientQuestion: {
        fontFamily: 'Manrope_500Medium',
    },
    ingredientText: {
        fontFamily: 'Cairo_500Medium',
    },
    stepList: {

    },
    stepQuestion: {
        fontFamily: 'Manrope_500Medium',
    },
    stepInfo: {
        fontFamily: 'Cairo_500Medium',
    },
    buttonContainer: {

    },
    leftButton: {
        
    },
    middleButton: {
        
    },
    rightButton: {

    },
    finishButton: {
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
        fontFamily: 'Manrope_500Medium', //not sure what font I want this to be
    },
})