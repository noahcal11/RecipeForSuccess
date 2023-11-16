import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, Pressable, ScrollView, TextInput, FlatList, Dimensions } from 'react-native';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';
import FilterIcon from '../assets/svg/filter';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';
import global from '../Genstyle';

EStyleSheet.build();

export default function Home({ navigation, route }) {
    //From Home page
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN

    //time, cuisine, category
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); //No initial option selected
    const [searchResults, setSearchResults] = useState([]);

    const sortOptions = ['A to Z', 'Newest', 'Oldest']; // Your sorting options

    const getSearch = async (searchTerm) => {
        const response = await fetch(API_BASE + "/recipe/get/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ general: searchTerm })
        })
            .then(res => res.json())
            .then(data => setSearchResults(data))
            .catch(error => console.error(error));
    }

    const handleSortToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSortSelect = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
        // Perform sorting based on the selected option
        // Update searchResults accordingly


    }

    useState(() => {
        getSearch(route.params.searchTerm);
    }, []);

    return (
        <View style={global.whiteBackground}>
            <Banner title="Search Results" />
            <View style={global.grayForeground}>
                <ScrollView styles={{ flex: 1 }}>
                    {/* Filter Button */}
                    <Pressable style={({ pressed }) => [
                                    {
                                        opacity: pressed
                                            ? 0.2
                                            : 1,
                                    },
                                    styles.filterButton]}>
                        <FilterIcon width="25" height='25' stroke="black" fill="#141414" strokeWidth="0.25"/>
                    </Pressable>

                    {/* Sort By Dropdown */}

                    <View style={styles.sortByContainer}>
                        <Pressable onPress={handleSortToggle} style={styles.sortButton}>
                            <Text style={styles.sortByText}>
                                Sort By: {selectedOption}
                            </Text>

                        </Pressable>

                        {showDropdown && (
                            <View style={[styles.dropdown, { zIndex: 1 }]}>
                                {sortOptions.map((option, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleSortSelect(option)}
                                        style={styles.dropdownOption}
                                    >
                                        <Text style={styles.dropdownOptionText}>{option}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>

                    <FlatList scrollEnabled={false}
                        data={searchResults}
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
                                    <Text style={global.subText}>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index}

                    />
                </ScrollView>
            </View>
            <Footer />
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
    recipeSection: {
        padding: '1rem',
        backgroundColor: '#eee',
    },
    categoryTitle: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },

    //for filter and sort by
    container2: {
        flex: 1,
        padding: 30,
        paddingBottom: 20,
        overflow: 'visible',
    },
    filterButton: {
        backgroundColor: '#F74F4F',
        paddingHorizontal: '3%',
        paddingVertical: '1.5%',
        borderRadius: 25,
        alignSelf: 'flex-start',
        marginTop: '5%',
        marginLeft: '5%'
    },
    filterButtonText: {
        color: 'white',
        fontFamily: 'Cairo_500Medium',
    },
    sortByContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', //align to right
        alignItems: 'center',
        marginRight: '2%'
    },

    sortByText: {
        fontSize: '1rem',
        fontFamily: 'Manrope_700Bold'
    },


    dropdown: {
        position: 'absolute',
        top: '120%', // Adjust the distance from the button as needed
        right: '0%',
        backgroundColor: 'white',
        borderWidth: '0.1rem',
        borderColor: 'gray',
        borderRadius: 5,
        width: Dimensions.get('window').width*0.35, // Adjust the width as needed
        zIndex: 1,
    },
    dropdownOption: {
        padding: '7.5%',
    },

    dropdownOptionText: {
        fontSize: '1rem',

    },
});