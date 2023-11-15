import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import SwitchComp from '../Components/Switch';

EStyleSheet.build();

export default function Profile() {
    return(
        <View style={global.whiteBackground}>
            <Banner title="Profile"/>
                <View style={styles.settingsContainer}>
                    <ScrollView styles={{ flex: 1 }}>
                        <View style={styles.horizontal}>
                            <SwitchComp name="milk">A</SwitchComp>
                            <SwitchComp name="milk">A</SwitchComp>
                            <SwitchComp name="milk">A</SwitchComp>
                            <SwitchComp name="milk">A</SwitchComp>
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
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: '0.5rem',
      },
})