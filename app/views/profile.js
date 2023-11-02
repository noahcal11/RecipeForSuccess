import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import ProfileBannerTitle from '../Components/ProfileBanner';


export default function Profile() {
    return(
        <View>
            <ProfileBannerTitle title={'Profile'} /> 
            <Footer />
        </View>
    )
}