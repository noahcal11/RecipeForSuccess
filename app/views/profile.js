import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext, PropsWithChildren } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import SwitchComp from '../Components/Switch';

EStyleSheet.build();

export default function Profile() {
    return(
        <View style={global.whiteBackground}>
            <Banner title="Profile"/>
                <View style={global.grayForeground}>
                    <Text styles={global.subheaderText}>Allergens (i am not centered)</Text>
                    <ScrollView>
                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Dairy</Text>
                                <SwitchComp name="Dairy"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Eggs</Text>
                                <SwitchComp name="Eggs"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Fish</Text>
                                <SwitchComp name="Fish"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Shellfish</Text>
                                <SwitchComp name="Shellfish"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Tree Nuts</Text>
                                <SwitchComp name="Tree Nuts"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Peanuts</Text>
                                <SwitchComp name="Peanuts"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Wheat</Text>
                                <SwitchComp name="Wheat"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Soybeans</Text>
                                <SwitchComp name="Soybeans"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Chicken</Text>
                                <SwitchComp name="Chicken"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Pork</Text>
                                <SwitchComp name="Pork"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Red Meat</Text>
                                <SwitchComp name="Red Meat"> </SwitchComp>
                            </View>

                            <View style={global.horizontal}>
                                <Text style={global.bodyText}>Gluten</Text>
                                <SwitchComp name="Gluten"> </SwitchComp>
                            </View>
                    </ScrollView>
                </View>
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({

})