import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";


export default function ProfileSettings() {
    return(
        <View>
            <BannerTitle title={'Settings'} /> 
            <Footer />
        </View>
    )
}