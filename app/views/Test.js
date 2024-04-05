import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import IngInstructionsModel from '../Components/IngInstructionModel';


EStyleSheet.build();

export default function Test() {

    const {isIngInstructionsModelVisible, setIngInstructionsModelVisible} = useContext(Context);

    return(
        <View style={global.whiteBackground}>
            <Banner title="Test model"/>
                <View style={styles.settingsContainer}>
                    <ScrollView styles={{ flex: 1 }}>
                            
                    <Pressable
                        //style={global.buttonMinor}
                        style={({ pressed }) => [
                            global.buttonMinor, 
                            {
                              opacity: pressed ? 0.2 : 1,
                            },
                         ]}
                        onPress={() => {
                            setIngInstructionsModelVisible(true)

                        }}>
                            <Text style={styles.guestText}>Open Ing Ingredients Model</Text>
                    </Pressable>

                    <View style={{ alignItems: 'center' }}>
                        {isIngInstructionsModelVisible ? <IngInstructionsModel /> : null}
                    </View>

                    </ScrollView>
                </View>
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    settingsContainer: {
        height: '80%',
        alignItems: 'center',
    }
})