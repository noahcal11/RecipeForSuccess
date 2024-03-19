import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, Modal, ScrollView, Dimensions, Image } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import SignInModal from '../Components/SignInModal';

EStyleSheet.build();

export default function Completed( {navigation, route} ) {
    const {username, setUsername, email, setEmail} = useContext(Context)
    const [completed, setCompleted] = useState([]);
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getCompleted = async () => {
        try {
            const response = await fetch(API_BASE + '/user/get/' + email);
            const data = await response.json();
            const recipeIds = data[0].completed_recipes;
    
            // Make a POST request to the /recipe/get endpoint with the recipe IDs in the request body
            const recipeResponse = await fetch(API_BASE + '/recipe/get', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: recipeIds })
            });
            const recipeData = await recipeResponse.json();
            setCompleted(recipeData);
        } catch (error) {
            console.error(error);
        }
    }

    // Shortens longer titles so any given recipe title only takes up two lines
    function makeTwoLines(title) {
        if (title.length >= 25) {
            return title.substring(0, 25) + "...";
        } else return title;
    }

    useState(() => {
        if (email !== "Guest") {
            getCompleted();
        }
    }, []);

    return(
        <View style={global.whiteBackground}>
            <Banner title="Completed Recipes"/>
            <View style={styles.settingsContainer}>
                    <ScrollView styles={{ flex: 1 }}>
                    {completed.length != 0 ?
                    <FlatList scrollEnabled={false}
                        style={{...global.grayForeground, marginVertical: '0%', marginBottom: '5%'}}
                        ListHeaderComponent={<Text style={global.titleText}>Your Recipes</Text>}
                        data={completed}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages', { '_id': item._id })}
                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text style={global.subText}>{makeTwoLines(item.title)}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />:
                    <View style={global.grayForeground}>
                        <Text style={global.subheaderText}>You have not uploaded any recipes!</Text>
                        <Text style={global.centerBodyText}>Add your own recipes to the app through your profile!</Text>
                    </View>}
                    </ScrollView>
                </View>
                {email === 'Guest' ? <SignInModal blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
            <Footer/>
        </View>
    )
}

const styles = EStyleSheet.create({
    settingsContainer: {
        height: '80%',
        alignItems: 'center',
    },
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
})