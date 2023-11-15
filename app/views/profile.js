import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import SwitchComp from '../Components/Switch';
import SignInModel from '../Components/SignInModel';

EStyleSheet.build();

export default function Profile() {
    const {email} = useContext(Context);
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
            {email === 'Guest' ? <SignInModel blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
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