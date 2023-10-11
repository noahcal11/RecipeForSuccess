import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";


export default function Profile({ navigation, route }) {
    return(
        <View>
            <BannerTitle title={'Profile'} /> 
            <Footer username={route.params.username} email={route.params.email} />
        </View>
    )
}