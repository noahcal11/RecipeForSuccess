import React from 'react';
import { View, Text, Pressable, FlatList, ScrollView, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Banner from './Banner'
import Footer from '../Components/Footer'
import { useContext } from 'react';
import { Context } from '../Context'
import FilledStar from '../assets/svg/filledStar';
import EmptyStar from '../assets/svg/emptyStar';
import global from '../Genstyle'
/* TODO:
    - Update the skills page (and this page) so that the new
        skill values from the survey will update the user's
        skills.
    - BIG PLANS:
     - Add a dummy array to this page that determines what skills are present
      - example: [true, true, true, true]
      - This would be automatically updated on page load once the API has tags for each skill
     - Change the questions to ask about each skill rather than each step
      - Have the question only appear if that skill is used
     - Add an API call that adds the on-page skill list to the user's skill list
*/
const RecipeSurvey = ({directions, title, id}) => {
    const navigation = useNavigation()
    const [skillList, setSkillList] = useState([0,0,0,0]);
    const [usedSkills, setUsedSkills] = useState([true, true, true, true]);
    const [selectedButton, setSelectedButton] = useState(new Array(4).fill(0));
    const [allSelected, setAllSelected] = useState(false);
    const [starValue, setStarValue] = useState([1, 1, 1, 1, 1])
    const { setRecipePageState, username, email } = useContext(Context);
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app";

    const updateSkills = async () => {
        navigation.navigate("Skills");
        setRecipePageState('details');
        await fetch(API_BASE+"/user/update-skills/" + email, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"0":skillList[0],"1":skillList[1],"2":skillList[2],"3":skillList[3]})
        }).catch(err => console.error(err));
    }

    const addCompleted = async () => {
        await fetch(API_BASE+"/user/update-completed/" + email, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application.json'
            },
            method: "POST",
            body: JSON.stringify({recipe: id})
        }).catch(err => console.error(err));
    }

    const updateRating = async () => {
        let ratingTotal = -5;
        starValue.forEach(e => {
            ratingTotal += e
        });
        if(ratingTotal > 0) {
            await fetch(API_BASE+"/recipe/update-rating/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({rating: ratingTotal})
            }).catch(err => console.error(err));
        }
    }

    const RatingButtons = (skill, stepID) => {
        function setBackgroundColor(id) {
            if(id == selectedButton[stepID]) {
                switch(id) {
                    case 1:
                        return 'green';
                    case 2:
                        return 'orange';
                    case 3:
                        return 'red';
                    default:
                        return 'gray';
                }
            } else return 'gray';
        }

        const buttonStyles = EStyleSheet.create({
            leftButton: {
                flex: 1,
                backgroundColor: setBackgroundColor(1),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                borderTopLeftRadius: 25,
                borderBottomLeftRadius: 25,
                width: Dimensions.get('window').width*0.5,
                height: Dimensions.get('window').height*0.06
            },
            middleButton: {
                flex: 1,
                backgroundColor: setBackgroundColor(2),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                width: Dimensions.get('window').width*0.5,
                height: Dimensions.get('window').height*0.06
            },
            rightButton: {
                flex: 1,
                backgroundColor: setBackgroundColor(3),
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                borderTopRightRadius: 25,
                borderBottomRightRadius: 25,
                width: Dimensions.get('window').width*0.5,
                height: Dimensions.get('window').height*0.06
            }
        })

        return (
            <View style={global.horizontal}>
                <Pressable
                    style={buttonStyles.leftButton}
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
                    <Text style={global.buttonText}>Good</Text>
                </Pressable>
                <Pressable
                    style={buttonStyles.middleButton}
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
                    <Text style={global.buttonText}>Okay</Text>
                </Pressable>
                <Pressable
                    style={buttonStyles.rightButton}
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
                    <Text style={global.buttonText}>Bad</Text>
                </Pressable>
            </View>
        )
    }

    const RatingValue = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Pressable
                    onPress={() => {
                        setStarValue(starValue.map((item, index) => {
                            if(index < 1) return 2
                            else return 1
                        }))
                    }}>
                    {starValue[0] == 2 ?
                    <FilledStar style={{ flex: 1 }} width='50' height='50' fill='#FFDF00' />
                    :<EmptyStar style={{ flex: 1 }} width='50' height='50' />}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setStarValue(starValue.map((item, index) => {
                            if(index < 2) return 2
                            else return 1
                        }))
                    }}>
                    {starValue[1] == 2 ?
                    <FilledStar style={{ flex: 1 }} width='50' height='50' fill='#FFDF00' />
                    :<EmptyStar style={{ flex: 1 }} width='50' height='50' />}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setStarValue(starValue.map((item, index) => {
                            if(index < 3) return 2
                            else return 1
                        }))
                    }}>
                    {starValue[2] == 2 ?
                    <FilledStar style={{ flex: 1 }} width='50' height='50' fill='#FFDF00' />
                    :<EmptyStar style={{ flex: 1 }} width='50' height='50' />}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setStarValue(starValue.map((item, index) => {
                            if(index < 4) return 2
                            else return 1
                        }))
                    }}>
                    {starValue[3] == 2 ?
                    <FilledStar style={{ flex: 1 }} width='50' height='50' fill='#FFDF00' />
                    :<EmptyStar style={{ flex: 1 }} width='50' height='50' />}
                </Pressable>
                <Pressable
                    onPress={() => {
                        setStarValue(starValue.map((item, index) => {
                            return 2
                        }))
                    }}>
                    {starValue[4] == 2 ?
                    <FilledStar style={{ flex: 1 }} width='50' height='50' fill='#FFDF00' />
                    :<EmptyStar style={{ flex: 1 }} width='50' height='50' />}
                </Pressable>
            </View>
        )
    }

    return(
        <View style={global.whiteBackground}>   
        {/* Header */}
        <Banner title={"Survey"}/>
            <Text style={global.titleText}>Great Job! Let us know how you did:</Text>
            {/* Each question corresponds to a skill */}
            <ScrollView styles={{ flex: 1 }}>
            {usedSkills[0] ?
            <View style={styles.question}>
                <Text style={global.centeredText}>How good were you at cooking the dish?</Text>
                {RatingButtons(0, 0)}
            </View> : <></>}
            {usedSkills[1] ?
            <View style={styles.question}>
                <Text style={global.centeredText}>How well did you work with the ingredients?</Text>
                {RatingButtons(1, 1)}
            </View> : <></>}
            {usedSkills[2] ?
            <View style={styles.question}>
                <Text style={global.centeredText}>How good were you at using a knife or other tools on your ingredients?</Text>
                {RatingButtons(2, 2)}
            </View> : <></>}
            {usedSkills[3] ?
            <View style={styles.question}>
                <Text style={global.centeredText}>How was your time management and temperature control?</Text>
                {RatingButtons(3, 3)}
            </View> : <></>}
            {/* Rating Submission */}
            <View style={styles.question}>
                <Text style={global.centeredText}>Did you like this recipe? Please rate it here:</Text>
                {RatingValue()}
            </View>
            </ScrollView>
            {/* <FlatList 
                data={directions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.question}>
                        <Text style={global.centeredText}>How well did you do in step {index + 1}?</Text>
                        <View style={global.grayForeground}>
                            <Text style={global.centerBodyText}>{item}</Text>
                        </View>
                        {RatingButtons(1, index + 1)}
                    </View>
                )}
            />
             */}
            {/* Insert submit button that is unavailable until all button pairs have a selection */}
            {/* This button will redirect to the skills page and show your improvement */}
            {allSelected ?
                <Pressable
                    style={global.button}
                    onPress={() => {updateRating(); addCompleted(); updateSkills()}}>
                        <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                :
                <Pressable
                    style={global.buttonInactive}
                    onPress={() => {}}>
                        <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            }
        </View>
    );
}

export default RecipeSurvey;

const styles = EStyleSheet.create({
    question: {
        margin: '1%'
    },
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