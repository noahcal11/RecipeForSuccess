import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { Dimensions } from 'react-native';

EStyleSheet.build();

export default function Favorites() {
    const [favesList, setFavesList] = useState([]);
    const {favorited} = useContext(Context);

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getFavorites = async () => {
        const response = await fetch(API_BASE+"/recipe/get/", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ids: favorited})
        })
        console.log(response[0]);
        // setFavesList(response[0])
    }

    useState(() => {
        getFavorites();
    });

    return(
        <View style={global.whiteBackground}>
            <Banner title="Favorites"/>
            <ScrollView styles={{ flex: 1 }}>
                <View style={{alignItems: 'center'}}>
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
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("SearchResults")
                                }}
                                
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%'}}>View more</Text>
                            </Pressable>
                        }
                    />
                </View>
            </ScrollView>
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    imageView: {
        margin: 10,
        width: (Dimensions.get('window').width * .85) * .5 - 10,
        justifyContent: 'center',
        alignItems: 'left'
    },
    imageThumbnail: {
        height: Dimensions.get('window').height * .85 / 8 - 10,
        width: '100%',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: '5%'
    },
});