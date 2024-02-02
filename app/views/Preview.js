// App.js
import React from 'react';
//import styles from './Genstyle';
import { View, Text, FlatList, Image, Linking, Pressable, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SearchBar from '../Components/SearchBar'; // Import your search bar component
import RecipeFooter from '../Components/RecipeFooter';
import BannerTitle from '../Components/Banner';
import RecipeIngredients from '../Components/IngredientsList';
import RecipeDirections from '../Components/RecipeDirections';
import RecipeDescription from '../Components/RecipeDescription';
import RecipeProgression from '../Components/RecipeProgression';
import RecipeSurvey from '../Components/RecipeSurvey';
import Footer from '../Components/Footer';
import HeartIcon from '../assets/svg/heart';
import FilledHeart from '../assets/svg/filledHeart';
import { useState, useContext } from 'react';
import { Context } from '../Context'
import global from '../Genstyle'

EStyleSheet.build();

export default function Preview({ navigation, route }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { email, setEmail } = useContext(Context);
    const { info } = route.params;

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN

    if(info[0] == undefined) info[0] = "Title"
    if(info[1] == undefined) info[1] = "Description here"
    if(info[2] == undefined) info[2] = [{ingredient: "dummy", qty: '0', unit: 'test'}]
    if(info[3] == undefined) info[3] = [{step: "placeholder"}]

    const ingPreview = info[2].map((item, index) => {
        return item.qty + ' ' + item.unit.toString().toLowerCase() + ' ' + item.ingredient;
    });

    const dirPreview = info[3].map((item, index) => {
        return item.step;
    });

    return (
        <View style={global.whiteBackground}>
            <BannerTitle title={'Recipe Preview'} />
            <View style={global.grayForeground}>
                {/* Your app content */}
                <FlatList
                    data={[info]}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    renderItem={({ item }) => (
                        <>
                            <Text style={global.titleText}> {info[0]} </Text>
                            {/* Recipe Description */}
                            <View style={{ position: 'relative' }}>
                                <Image source={{ uri: info[4] }} style={styles.image} />
                                <Pressable
                                    style={{ position: 'absolute', marginTop: '15%', marginLeft: '75%' }}
                                    onPress={() => { email !== "Guest" ? setFavorite() : <View></View> }}>
                                    {isFavorite ?
                                        <FilledHeart width='40' height='40' fill='red' />
                                        : <HeartIcon fill='white' width='40' height='40' />}
                                </Pressable>
                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                                <View>
                                    <Text style={global.subheaderText}>
                                        Recipe Description
                                    </Text>
                                </View>
                                <RecipeDescription description={info[1]} />
                            </View>

                            {/* Recipe Ingredients */}
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={global.subheaderText}>
                                    Recipe Ingredients
                                </Text>
                                <RecipeIngredients ingredients={ingPreview} />
                            </View>

                            {/* Recipe Directions */}
                            <View style={{ paddingHorizontal: 20 }}>
                                <Text style={global.subheaderText}>
                                    Recipe Directions
                                </Text>
                                <RecipeDirections directions={dirPreview} />
                            </View>
                            <Text style={global.creditsText} onPress={() => Linking.openURL('www.allrecipes.com')}>Credits</Text>
                        </>
                    )}
                />
                {/* Footer component */}
                <View style={styles.footerContainer}>
                    <Pressable
                        style={global.buttonAlt}
                        onPress={() => { navigation.navigate('Upload') }}>
                        <Text style={global.buttonText}>Return</Text>
                    </Pressable>
                </View>
            </View>
            <Footer />
        </View>
    );
}
const styles = EStyleSheet.create({
    image: {
        width: '80%',
        height: Dimensions.get('window').height * .3,
        margin: '10%',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 2,
        alignSelf: 'center',
    },
    footerContainer:{
        backgroundColor: 'transparent', // #F67D7D
        padding: 10,
        alignItems: 'center',
        height: '8%',
    }
});