import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, ScrollView, TextInput, FlatList, SectionList, Pressable, Dimensions } from 'react-native';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer'
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState,useContext } from 'react';
import { Context } from '../App';
import global from '../Genstyle';

EStyleSheet.build();

export default function Home({ navigation, route }){
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);
    const [breakfastRecs, setBreakfastRecs] = useState([]);
    const [chickenRecs, setChickenRecs] = useState([]);
    const {username,setUsername,email,setEmail} = useContext(Context)

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    // https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
    function getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    const getPopular = async () => {
        const response = await fetch(API_BASE+"/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({cuisine: "American"})
        })
        .then(res => res.json())
        .then(data => setPopularRecs(getRandom(data,8)))
        .catch(error => console.error(error));
    }

    const getDessert = async () => {
        const response = await fetch(API_BASE+"/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({category: "Dessert"})
        })
        .then(res => res.json())
        .then(data => setDessertRecs(getRandom(data,4)))
        .catch(error => console.error(error));
    }

    const getBreakfast = async() => {
        const response = await fetch(API_BASE+"/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({category: "Breakfast"})
        })
        .then(res => res.json())
        .then(data => setBreakfastRecs(getRandom(data,4)))
        .catch(error => console.error(error));
    }

    const getChicken = async() => {
        const response = await fetch(API_BASE+"/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({title: "Chicken"})
        })
        .then(res => res.json())
        .then(data => setChickenRecs(getRandom(data,8)))
        .catch(error => console.error(error));
    }
        
    useState(() => {
        getPopular();
        getDessert();
        getBreakfast();
        getChicken();
    }, []);

    return(
        <View style={global.whiteBackground}>
            <Banner title="Home"/>
            <ScrollView styles={{ flex: 1 }}>
                <View style={{alignItems: 'center'}}>
                    <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Popular Recipes</Text>}
                        data={popularRecs}
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
                    <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Top Desserts</Text>}
                        data={dessertRecs}
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
                        keyExtractor={(item, index) => index}
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
                    <View style={global.grayForeground}>
                    <Text style={global.titleText}>Chicken!</Text>
                    <FlatList
                        horizontal
                        data={chickenRecs}
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
                        keyExtractor={(item, index) => index}
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
                                <Text style={global.clickableText}>View more</Text>
                            </Pressable>
                        }
                    />
                    </View>
                    <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Breakfast Creations</Text>}
                        data={breakfastRecs}
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
                        keyExtractor={(item, index) => index}
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
            <Footer  />
        </View>
    );
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