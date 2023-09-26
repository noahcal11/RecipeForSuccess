import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';

EStyleSheet.build();

export default function Home({ navigation, route }){
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);

    useState(() => {
        let items = Array.apply(null, Array(8)).map((v, i) => {
            return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        setPopularRecs(items);
    }, []);

    useState(() => {
        let items = Array.apply(null, Array(4)).map((v, i) => {
            return { id: i, src: 'http://placehold.it/200x200?text=' + (i + 1) };
        });
        setDessertRecs(items);
    }, []);

    return(
        <View>
            <Banner title="Home" />
            <Text style={{ textAlign: 'center', fontSize: '1.2rem' }}>Welcome, {route.params.username}!</Text>
            <View style={styles.container}>
                <View style={styles.popular}>
                    <Text style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Popular Recipes</Text>
                    <FlatList nestedScrollEnabled = {true}
                    data={popularRecs}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: '1rem'}}>
                            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                            <Text>{item.id}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    />
                    <Text>View more</Text>
                </View>
                <View style={styles.desserts}>
                    <Text style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Top Desserts</Text>
                    <FlatList nestedScrollEnabled = {true}
                    data={dessertRecs}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: '1rem'}}>
                            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                            <Text>{item.id}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    />
                    <Text>View more</Text>
                </View>
            </View>
            <Text>Bottom text</Text>

            {/* <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Skills")
                }}
                >
                <Text>Skills page</Text>
            </TouchableOpacity> */}

        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem',
    },
    popular: {
        padding: '1rem',
        backgroundColor: '#eee',
    },
    desserts: {
        padding: '1rem',
        backgroundColor: '#eee',
    }
});