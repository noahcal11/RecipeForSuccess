import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView, TextInput} from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import RNPickerSelect from 'react-native-picker-select';


EStyleSheet.build();

export const Dropdown = ({ items, onValueChange }) => {
    return <RNPickerSelect onValueChange={onValueChange} items={items} />;
  };

export default function PageTemplate() {
    return(
        <View style={global.whiteBackground}>
            <Banner title="Upload"/>
                <ScrollView>
                    <View style={global.grayForeground}>
                        <Text style={global.titleText}>Save area for picture</Text>
                    </View>

                    <View style={global.grayForeground}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput style={styles.input} placeholder="Enter your title..." autoFocus/>

                        <Text style={styles.titleText}>Description</Text>
                        <TextInput style={styles.input} placeholder="Enter your description..." autoFocus/>

                        <Text style={styles.titleText}>Ingredients</Text>
                                                
                        <View style={{flexDirection: 'row'}}> 
                            <TextInput style={styles.IngredientInput} placeholder="Enter your ingredient..." autoFocus/>
                            <TextInput style={styles.IngredientQty} keyboardType='numeric'placeholder="Qty" />
                            <Pressable style={global.buttonInactive}>
                                <Dropdown style={styles.IngredientUnit}
                                    items={[
                                        { label: 'Football', value: 'football' },
                                        { label: 'Baseball', value: 'baseball' },
                                        { label: 'Hockey', value: 'hockey' },
                                    ]}
                                    onValueChange={(value) => console.log(value)}
                                />  
                            </Pressable>
                            
                        </View>
                        <Pressable style={global.button}>
                            <Text>Add ingredient</Text>
                        </Pressable>

                    </View>

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
        flex: 3,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        paddingLeft: '1rem',
        marginBottom: '1rem',
        alignSelf: 'left',
      },
      IngredientQty: {
        flex: 1,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        alignSelf: 'left',
        textAlign: 'center',
      },
      IngredientUnit: {
        flex: 1,
        backgroundColor: '#D1D1D1',
        borderRadius: '2rem',
        fontSize: '1rem',
        fontFamily: 'Cairo_500Medium',
        height: '3rem',
        marginLeft: '1rem',
        marginBottom: '1rem',
        alignSelf: 'left',
        textAlign: 'center',
      },

})