import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';

EStyleSheet.build();

export default function Favorites() {
    return(
        <View style={global.whiteBackground}>
            <Banner title="Favorites"/>
                <View style={styles.settingsContainer}>
                    <ScrollView styles={{ flex: 1 }}>
                            <Text>Hello, World!</Text>
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