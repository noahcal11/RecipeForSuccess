import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, ScrollView, TextInput, FlatList, SectionList, Pressable } from 'react-native';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer'
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';

EStyleSheet.build();

export default function Home({ navigation, route }){
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);
    const [breakfastRecs, setBreakfastRecs] = useState([]);
    const [chickenRecs, setChickenRecs] = useState([]);

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
        const response = await fetch(API_BASE+"/recipe/get/?cuisine=American")
        .then(res => res.json())
        .then(data => setPopularRecs(getRandom(data,8)))
        .catch(error => console.error(error));
    }

    const getDessert = async () => {
        const response = await fetch(API_BASE+"/recipe/get/?category=Dessert")
        .then(res => res.json())
        .then(data => setDessertRecs(getRandom(data,4)))
        .catch(error => console.error(error));
    }

    const getBreakfast = async() => {
        const response = await fetch(API_BASE+"/recipe/get/?category=Breakfast")
        .then(res => res.json())
        .then(data => setBreakfastRecs(getRandom(data,4)))
        .catch(error => console.error(error));
    }

    const getChicken = async() => {
        const response = await fetch(API_BASE+"/recipe/get/?title=Chicken")
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
        <View style={styles.container}>
            <Banner title="Home" username={route.params.username} email={route.params.email}/>
            <ScrollView styles={{ flex: 1 }}>
                <View style={styles.recipeSection}>
                    <FlatList scrollEnabled={false}
                        style={styles.recList}
                        ListHeaderComponent={<Text style={styles.categoryTitle}>Popular Recipes</Text>}
                        data={popularRecs}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id,'username':route.params.username,'email':route.params.email})}
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("SearchResults",{'username':username,'email':email})
                                }}
                                
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <Text style={styles.viewMore}>View more</Text>
                            </Pressable>
                        }
                    />
                    <FlatList scrollEnabled={false}
                        style={styles.recList}
                        ListHeaderComponent={<Text style={styles.categoryTitle}>Top Desserts</Text>}
                        data={dessertRecs}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id,'username':route.params.username,'email':route.params.email})}
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("SearchResults",{'username':username,'email':email})
                                }}
                                
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <Text style={styles.viewMore}>View more</Text>
                            </Pressable>
                        }
                    />
                    <View style={styles.recList}>
                    <Text style={styles.categoryTitle}>Chicken!</Text>
                    <FlatList
                        style={styles.recList}
                        horizontal
                        data={chickenRecs}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id,'username':route.params.username,'email':route.params.email})}
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("SearchResults",{'username':username,'email':email})
                                }}
                                
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <Text style={styles.viewMore}>View more</Text>
                            </Pressable>
                        }
                    />
                    </View>
                    <FlatList scrollEnabled={false}
                        style={styles.recList}
                        ListHeaderComponent={<Text style={styles.categoryTitle}>Breakfast Creations</Text>}
                        data={breakfastRecs}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id,'username':route.params.username,'email':route.params.email})}
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("SearchResults",{'username':username,'email':email})
                                }}
                                
                                style={({ pressed }) => [
                                    {
                                    opacity: pressed
                                        ? 0.2
                                        : 1,
                                    }]}
                            >
                                <Text style={styles.viewMore}>View more</Text>
                            </Pressable>
                        }
                    />
                </View>
            </ScrollView>
            <Footer username={route.params.username} email={route.params.email} />
        </View>
    );
}

const styles = EStyleSheet.create({
    welcomeText: {
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageView: {
        margin: '1rem',
        width: '9rem',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem',
        width: '9rem',
        borderRadius: '2rem',
        borderWidth: '0.2rem'
    },
    recipeSection: {
        padding: '1rem',
        flex: 1,
    },
    categoryTitle: {
        paddingTop: '0.4rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    recList: {
        backgroundColor: "#eee",
        margin: '0.5rem',
    },
    viewMore: {
        fontSize: '1.05rem',
        fontWeight: 'bold',
        fontStyle: 'italic',
        paddingLeft: '1rem',
        paddingBottom: '0.7rem',
        paddingRight: '0.25rem',
        color: '#ad0603',
    }
});