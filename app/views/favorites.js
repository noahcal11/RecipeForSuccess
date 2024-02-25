import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, StyleSheet, Modal, ScrollView, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { Dimensions } from 'react-native';
import SignInModal from '../Components/SignInModal';

EStyleSheet.build();

export default function Favorites( {navigation, route} ) {
    const [favesList, setFavesList] = useState([]);
    const {favorited, email} = useContext(Context);

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
        .then(res => res.json())
        setFavesList(response);
    }

    useState(() => {
        getFavorites();
    });

    return(
        <View style={global.whiteBackground}>
            <Banner title="Favorites"/>
            <ScrollView styles={{ flex: 1 }}>
                <View style={{alignItems: 'center'}}>
                    {favesList.length > 0 ?
                    <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Favorites</Text>}
                        data={favesList}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('recipePages',{'_id':item._id})}
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
                    />
                    :<View style={global.grayForeground}>
                        <Text style={global.subheaderText}>You have not added any recipes to your favorites!</Text>
                        <Text style={global.centerBodyText}>Tap on the heart icon on a recipe's page to favorite it!</Text>
                    </View>}
                </View>
            </ScrollView>
            {email === 'Guest' ? <SignInModal blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
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