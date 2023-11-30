import React, { useContext, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import SwitchComp from '../Components/Switch';
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

const DIET = [
    { title: 'Dairy-Free' },
    { title: 'Gluten-Free' },
    { title: 'Vegetarian' },
    { title: 'Vegan' }
];

const SearchFilterModal = ({ blurb }) => {
    const { isSearchFilterModalVisible, setSearchFilterModalVisible } = useContext(Context);
    const navigation = useNavigation();

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
                        <ScrollView style={{ marginTop: '10%' }}>
                            <Text style={global.subheaderText}>Cook Time</Text>
                            {COOKTIME.map((item, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} />
                                </View>
                            ))}
                            <Text style={global.subheaderText}>Cuisine</Text>
                            {CUISINE.map((item, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} />
                                </View>
                            ))}
                            <Text style={global.subheaderText}>Meal Type</Text>
                            {MEALTYPE.map((item, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} />
                                </View>
                            ))}
                            <Text style={global.subheaderText}>Diet</Text>
                            {DIET.map((item, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...global.bodyText, alignSelf: 'center' }}>{item.title}</Text>
                                    <SwitchComp name={item.title} />
                                </View>
                            ))}
                        </ScrollView>

                        <Pressable
                            style={global.button}
                            onPress={() => {
                                setSearchFilterModalVisible(!isSearchFilterModalVisible);
                                setSearchFilterModalVisible(false);
                                navigation.navigate('SearchResults');
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