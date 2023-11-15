import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';

EStyleSheet.build();

export default function Favorites() {
    const [favesList, setFavesList] = useState([]);

    const getFavorites = async () => {
        // API call that gets the favorites list from the user's profile
    }

    return(
        <View style={global.whiteBackground}>
            <Banner title="Favorites"/>
            <ScrollView styles={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Favorites</Text>}
                        data={favesList}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id})}
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text style={global.subText}>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        // ListFooterComponent={
                        //     <Pressable
                        //         onPress={() => {
                        //             navigation.navigate("SearchResults")
                        //         }}
                                
                        //         style={({ pressed }) => [
                        //             {
                        //             opacity: pressed
                        //                 ? 0.2
                        //                 : 1,
                        //             }]}
                        //     >
                        //         <Text style={{ ...global.clickableText, marginBottom: '5%'}}>View more</Text>
                        //     </Pressable>
                        // }
                    />
                </View>
            </ScrollView>
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