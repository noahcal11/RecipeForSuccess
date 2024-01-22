import Footer from '../Components/Footer';
import React from 'react';
import { Text, View, Pressable, FlatList, SafeAreaView, Modal, ScrollView, Dimensions } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../Context'
import Banner from '../Components/Banner';
import global from '../Genstyle';
import { useNavigation } from '@react-navigation/core';
import SignInModel from '../Components/SignInModel';

EStyleSheet.build();

export default function PageTemplate() {
    const {username, setUsername, email, setEmail} = useContext(Context)
    const [completed, setCompleted] = useState([]);
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getCompleted = async () => {
        const response = await fetch(API_BASE + '/user/get/' + email)
        .then(res => res.json())
        .then(data => setCompleted(data[0].completed_recipes))
        .catch(error => console.error(error));
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
                        ListHeaderComponent={<Text style={global.titleText}>Finished Recipes</Text>}
                        data={completed}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('recipePages', { '_id': item._id })}
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
                        <Text style={global.subheaderText}>You have not completed any recipes!</Text>
                        <Text style={global.centerBodyText}>Select any recipe and finish it to add it here!</Text>
                    </View>}
                    </ScrollView>
                </View>
                {email === 'Guest' ? <SignInModel blurb="In order to use this feature, you have to be signed in!" /> : <View></View>}
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