import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import ProfileBannerTitle from '../Components/ProfileBanner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import DropDownPicker from 'react-native-dropdown-picker';



EStyleSheet.build();

export default function Profile() {
    const {username,setUsername,email,setEmail} = useContext(Context)
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    
    return(
        <View style={styles.pageContainer}>
            <ProfileBannerTitle> </ProfileBannerTitle>
                    <View style={styles.settingsContainer}>
                        <View>
                            <DropDownPicker
                                autoScroll={true}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                />
                        </View>
                    </View>
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    pageContainer: {
        flex: 1,
        height: '100%',
      },
    settingsContainer: {
        height: '80%',
        alignItems: 'center',
    }
})