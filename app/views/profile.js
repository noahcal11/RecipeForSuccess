import BannerTitle from '../Components/Banner';
import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView, StyleSheet, Modal } from "react-native";
import ProfileBannerTitle from '../Components/ProfileBanner';


export default function Profile() {
    return(
        <View style={styles.container}>
            <ProfileBannerTitle> </ProfileBannerTitle>
                <ScrollView>
                    <View>
                        <View style={styles.dropDown}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            />
                        </View>
                    </View>
                </ScrollView>
            <Footer/>
        </View>
    )
}