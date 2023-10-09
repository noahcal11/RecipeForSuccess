import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const RecipeSurvey = ({directions}) => {
    return(
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Great Job!</Text>
            <Text style={styles.subheader}>Let us know how you did:</Text>
            {/* First Question (ingredient prep) */}
            <View style={styles.ingredientQuestion}>
                <Text style={styles.ingredientText}>How well did you prepare the ingredients?</Text>
                {/* Insert a pair of buttons where only one can be "activated" */}
            </View>
            <FlatList
                data={directions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.stepList}>
                        <Text style={styles.stepQuestion}>How well did you do in step {index + 1}?</Text>
                        <Text style={styles.stepInfo}>{item}</Text>
                        {/* Insert same button system as in the ingredient step */}
                    </View>
                )}
            />
            {/* Insert submit button that is unavailable until all button pairs have a selection */}
            {/* This button will redirect to the skills page and show your improvement */}
        </View>
    );
}

export default RecipeSurvey;

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    header: {

    },
    subheader: {

    },
    ingredientQuestion: {

    },
    ingredientText: {

    },
    stepList: {

    },
    stepQuestion: {

    },
    stepInfo: {

    },
})