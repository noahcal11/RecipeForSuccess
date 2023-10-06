import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";


export default function Favorites({ navigation, route }) {
    return(
        <View>
            <BannerTitle title={'Favorites'} /> 
            <Footer> </Footer>
        </View>
    )
}