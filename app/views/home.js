import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, ScrollView, TextInput, FlatList, Pressable, Dimensions } from 'react-native';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState, useContext } from 'react';
import { Context } from '../Context';
import global from '../Genstyle';
import FilterIcon from '../assets/svg/filter';
import HomeFiltersModal from '../Components/HomeFiltersModal';

EStyleSheet.build();

export default function Home({ navigation, route }) {
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);
    const [breakfastRecs, setBreakfastRecs] = useState([]);
    const [lunchRecs, setLunchRecs] = useState([]);
    const [dinnerRecs, setDinnerRecs] = useState([]);
    const [chickenRecs, setChickenRecs] = useState([]);
    const [saladRecs, setSaladRecs] = useState([]);
    const [americanRecs, setAmericanRecs] = useState([]);
    const [mexicanRecs, setMexicanRecs] = useState([]);
    const [italianRecs, setItalianRecs] = useState([]);
    const [chineseRecs, setChineseRecs] = useState([]);
    const [surpriseRecs, setSurpriseRecs] = useState([]);
    const { username, setUsername, email, setEmail, isHomeFiltersModalVisible, setHomeFiltersModalVisible, visibleWidgets, setVisibleWidgets } = useContext(Context)

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN

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
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cuisine: "American" })
        })
            .then(res => res.json())
            .then(data => setPopularRecs(getRandom(data, 8)))
            .catch(error => console.error(error));
    }

    const getDessert = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ category: "Dessert" })
        })
            .then(res => res.json())
            .then(data => setDessertRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getBreakfast = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ category: "Breakfast" })
        })
            .then(res => res.json())
            .then(data => setBreakfastRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getChicken = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ title: "Chicken" })
        })
            .then(res => res.json())
            .then(data => setChickenRecs(getRandom(data, 8)))
            .catch(error => console.error(error));
    }

    const getLunch = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ category: "Lunch" })
        })
            .then(res => res.json())
            .then(data => setLunchRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getDinner = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ category: "Dinner" })
        })
            .then(res => res.json())
            .then(data => setDinnerRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getSalad = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ category: "Dinner" })
        })
            .then(res => res.json())
            .then(data => setSaladRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getAmerican = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cuisine: "American" })
        })
            .then(res => res.json())
            .then(data => setAmericanRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getMexican = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cuisine: "Mexican" })
        })
            .then(res => res.json())
            .then(data => setMexicanRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getItalian = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cuisine: "Italian" })
        })
            .then(res => res.json())
            .then(data => setItalianRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getChinese = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ cuisine: "Chinese" })
        })
            .then(res => res.json())
            .then(data => setChineseRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    const getSurprise = async () => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(data => setSurpriseRecs(getRandom(data, 4)))
            .catch(error => console.error(error));
    }

    // Shortens longer titles so any given recipe title only takes up two lines
    function makeTwoLines(title) {
        if (title.length >= 25) {
            return title.substring(0, 25) + "...";
        } else return title;
    }

    useState(() => {
        getPopular();
        getDessert();
        getBreakfast();
        getChicken();
        getDinner();
        getLunch();
        getSalad();
        getAmerican();
        getMexican();
        getItalian();
        getChinese();
        getSurprise();
    }, []);

    const WIDGETS = [
        { title: 'Popular Recipes', data: popularRecs },
        { title: 'Breakfast Creations', data: breakfastRecs },
        { title: 'Lunch Options', data: lunchRecs },
        { title: 'Dinners', data: dinnerRecs },
        { title: 'Top Desserts', data: dessertRecs },
        { title: 'Chicken', data: chickenRecs },
        { title: 'Salads', data: saladRecs },
        { title: 'American', data: americanRecs },
        { title: 'Mexican', data: mexicanRecs },
        { title: 'Italian', data: italianRecs },
        { title: 'Chinese', data: chineseRecs },
        { title: 'Surprise Me!', data: surpriseRecs },
    ]

    return (
        <View style={global.whiteBackground}>
            <Banner title="Home" />
            <ScrollView styles={{ flex: 1 }}>

                <Pressable
                    style={{ ...global.buttonMinor, position: 'relative', marginLeft: '70%', marginTop: '5%', width: 60 }}
                    onPress={() => {
                        setHomeFiltersModalVisible(true);
                    }} >
                    <FilterIcon style={styles.filterIcon}></FilterIcon>
                </Pressable>

                <View style={{ alignItems: 'center' }}>
                    {isHomeFiltersModalVisible ? <HomeFiltersModal /> : null}
                </View>

                <View style={{ alignItems: 'center' }}>
                    {visibleWidgets[0] && <FlatList scrollEnabled={false}
                        style={{ ...global.grayForeground, marginVertical: '0%', marginBottom: '5%' }}
                        ListHeaderComponent={<Text style={global.titleText}>Popular Recipes</Text>}
                        data={popularRecs}
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
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[1] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Breakfast Creations</Text>}
                        data={breakfastRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[2] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Lunch Options</Text>}
                        data={lunchRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[3] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Dinners</Text>}
                        data={dinnerRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[4] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Top Desserts</Text>}
                        data={dessertRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[5] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Chicken</Text>}
                        data={chickenRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
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
                    />}
                    {visibleWidgets[6] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Salads</Text>}
                        data={saladRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[7] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>American</Text>}
                        data={americanRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[8] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Mexican</Text>}
                        data={mexicanRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[9] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Italian</Text>}
                        data={italianRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[10] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Chinese</Text>}
                        data={chineseRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                    {visibleWidgets[11] && <FlatList scrollEnabled={false}
                        style={global.grayForeground}
                        ListHeaderComponent={<Text style={global.titleText}>Surprise me!</Text>}
                        data={surpriseRecs}
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
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("searchResults")
                                }}

                                style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    }]}
                            >
                                <Text style={{ ...global.clickableText, marginBottom: '5%' }}>View more</Text>
                            </Pressable>
                        }
                    />}
                </View>
            </ScrollView>
            <Footer />
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
    filterIcon: {
        height: 40,
        width: 40,
        alignItems: 'left'
    },
});