import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import SwitchComp from './SearchFilterSwitch';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';

EStyleSheet.build();

const COOKTIME = [
    { title: 'Under 15 Min' },
    { title: '15-30 Min' },
    { title: '30-60 Min' },
    { title: '60+ Min' }
];

const CUISINE = [
    { title: 'African' },
    { title: 'American' },
    { title: 'Asian' },
    { title: 'Italian' },
    { title: 'Mexican' },
    { title: 'Spanish' },
];

const MEALTYPE = [
    { title: 'Appetizer' },
    { title: 'Breakfast' },
    { title: 'Lunch' },
    { title: 'Dinner' },
    { title: 'Dessert' },
    { title: 'Snack' },
];

const SearchFilterModal = ({ blurb }) => {
    const { isSearchFilterModalVisible, setSearchFilterModalVisible, searchFilter, setSearchFilter, searchResults, setSearchResults } = useContext(Context);
    const navigation = useNavigation();

    function filterSearch() {
        filterCookTime();
        filterCuisine();
        filterMealType();
    }


    function filterCookTime() {
        setSearchResults(searchResults.map((recipe) => {
            // we run filterCookTime first, so we do not check if recipe is already hidden - this "resets" the filter
            if (recipe.total_time < 15) {
                recipe.visibility = searchFilter[0]
                return recipe
            }
            if (recipe.total_time <= 30) {
                recipe.visibility = searchFilter[1]
                return recipe
            }
            if (recipe.total_time <= 60) {
                recipe.visibility = searchFilter[2]
                return recipe
            }
            else {
                recipe.visibility = searchFilter[3]
                return recipe
            };
        }))
    }

    function filterCuisine() {
        setSearchResults(searchResults.map((recipe) => {
            // we first check if recipe has already been hidden by filterCookTime
            if (recipe.visibility) {
                if (recipe.cuisine === 'African') {
                    recipe.visibility = searchFilter[4]
                    return recipe
                }
                if (recipe.cuisine === 'American') {
                    recipe.visibility = searchFilter[5]
                    return recipe
                }
                if (recipe.cuisine === 'Asian') {
                    recipe.visibility = searchFilter[6]
                    return recipe
                }
                if (recipe.cuisine === 'Italian') {
                    recipe.visibility = searchFilter[7]
                    return recipe
                }
                if (recipe.cuisine === 'Mexican') {
                    recipe.visibility = searchFilter[8]
                    return recipe
                }
                if (recipe.cuisine === 'Spanish') {
                    recipe.visibility = searchFilter[9]
                    return recipe
                }
                else {
                    return recipe
                }
            } else return recipe
        }))
    }

    function filterMealType() {
        setSearchResults(searchResults.map((recipe) => {
            // we first check if recipe has already been hidden by filterCookTime or filterCuisine
            try {
                recipe.category.includes("");
            }
            catch {
                return recipe
            }
            if (recipe.visibility) {
                if (recipe.category.includes('Appetizer')) {
                    recipe.visibility = searchFilter[10]
                    return recipe
                }
                if (recipe.category.includes('Breakfast')) {
                    recipe.visibility = searchFilter[11]
                    return recipe
                }
                if (recipe.category.includes('Lunch')) {
                    recipe.visibility = searchFilter[12]
                    return recipe
                }
                if (recipe.category.includes('Dinner')) {
                    recipe.visibility = searchFilter[13]
                    return recipe
                }
                if (recipe.category.includes('Dessert')) {
                    recipe.visibility = searchFilter[14]
                    return recipe
                }
                if (recipe.category.includes('Snack')) {
                    recipe.visibility = searchFilter[15]
                    return recipe
                }
                else {
                    return recipe
                }
            } else return recipe
        }))
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isSearchFilterModalVisible}
                onRequestClose={() => {
                    setSearchFilterModalVisible(!isSearchFilterModalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={global.titleText}>{blurb}</Text>
                        <ScrollView style={{ marginTop: '5%' }}>
                            <Text style={global.subheaderText}>Cook Time</Text>
                            {COOKTIME.map((item, index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} index={index} state={searchFilter[index]} />
                                </View>
                            ))}
                            <Text style={global.subheaderText}>Cuisine</Text>
                            {CUISINE.map((item, index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} index={index + 4} state={searchFilter[index + 4]} />
                                </View>
                            ))}
                            <Text style={global.subheaderText}>Meal Type</Text>
                            {MEALTYPE.map((item, index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} index={index + 10} state={searchFilter[index + 10]} />
                                </View>
                            ))}
                        </ScrollView>

                        <Pressable
                            style={global.button}
                            onPress={() => {
                                filterSearch();
                                setSearchFilterModalVisible(!isSearchFilterModalVisible);
                                setSearchFilterModalVisible(false);
                                navigation.navigate('searchResults');
                            }}>
                            <Text style={global.buttonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = EStyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 0.7,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: '10%',
        //alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
});

export default SearchFilterModal