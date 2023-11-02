import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import ProfileBannerTitle from '../Components/ProfileBanner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import DropDownPicker from 'react-native-dropdown-picker';
import global from '../Genstyle';


EStyleSheet.build();

export default function Profile() {
    const {username,setUsername,email,setEmail} = useContext(Context)
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [DietItems, setItems] = useState([
        {label: 'Lactose intolerance', value: 'Lactose intolerance'},
        {label: 'Gluten Free', value: 'Gluten Free'},
        {label: 'Vegeterian', value: 'Vegeterian'},
        {label: 'Vegan', value: 'Vegan'},
        {label: 'Kosher', value: 'Kosher'},
        {label: 'Keto', value: 'Keto'},
        {label: 'Dairy Free', value: 'Dairy Free'},
    ]);
    
    return(
        <View style={global.container}>
            <ProfileBannerTitle> </ProfileBannerTitle>
                    <View style={styles.settingsContainer}>
                        <View>
                        <Text style={{...global.subheaderText}}>Dietary Preferences</Text>
                            <DropDownPicker
                                autoScroll={true}
                                multiple={true}
                                open={open}
                                value={value}
                                items={DietItems}
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
    settingsContainer: {
        height: '80%',
        alignItems: 'center',
    }
})