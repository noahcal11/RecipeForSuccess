import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import ProfileBannerTitle from '../Components/ProfileBanner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import global from '../Genstyle';
import ToggleComponent from '../Components/Toggle';

EStyleSheet.build();

export default function Profile() {
    return(
        <View style={global.whiteBackground}>
            <ProfileBannerTitle> </ProfileBannerTitle>
                    <View style={styles.settingsContainer}>
                        <View>
                            <Text>Hello, World!</Text>
                            <ToggleComponent> </ToggleComponent>
                        </View>
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