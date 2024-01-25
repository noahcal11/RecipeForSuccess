import { StatusBar } from 'expo-status-bar';
import { Text, Image, View, Pressable, ScrollView, TextInput, FlatList, Dimensions, Modal } from 'react-native';
import { useEffect } from 'react';  // Import useEffect
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';
import SearchFilterModal from '../Components/SearchFilterModal';
import FilterIcon from '../assets/svg/filter';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useContext, useState } from 'react';
import global from '../Genstyle';
import { Context } from '../Context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the library and icon as needed
import { TouchableHighlight } from 'react-native';

EStyleSheet.build();

export default function SearchResults({ navigation, route }) {
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/" + process.env.REACT_APP_API_TOKEN
    const { isSearchFilterModalVisible, setSearchFilterModalVisible } = useContext(Context);

    //time, cuisine, category
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); //No initial option selected
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsExists, setSearchResultsExists] = useState(true);
    const sortOptions = ['A to Z', 'Z to A']; // Your sorting options

    const getSearch = async (searchTerm) => {
        try {
            const response = await fetch(API_BASE + "/recipe/get/", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ general: searchTerm })
            });
    
            const data = await response.json();
    
            setSearchResults(data);
            setSearchResultsExists(data.length > 0);  // Set searchResultsExists based on the length of data
        } catch (error) {
            console.error(error);
            setSearchResultsExists(false);  // Set searchResultsExists to false in case of an error
        }
    }

    const handleSortToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSortSelect = (option) => {
        setSelectedOption(option);
        setShowDropdown(false);
        // Perform sorting based on the selected option
        // Update searchResults accordingly
        if(option='A to Z') sortAZ(searchResults);
        if(option='Z to A') sortZA(searchResults);
    }

    const sortAZ = (data) => {
        data.sort((a, b) => (a.title > b.title) ? 1 : -1);
        setSearchResults(data);
    }

    const sortZA = (data) => {
        data.sort((a, b) => (a.title < b.title) ? 1 : -1);
        setSearchResults(data);
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
                        { ...global.buttonMinor, position: 'relative', marginLeft: '70%', marginBottom: '2%', width: 60 }]}
                        onPress={() => {
                            setSearchFilterModalVisible(true);
                        }}>
                        <FilterIcon style={styles.filterIcon} />
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

                    {!searchResultsExists ? (

                        <Text style={styles.noResultsText}>No results found.</Text>
                    ) : (
                            <FlatList scrollEnabled={false}
                            data={searchResults}
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
                                        <Text style={global.subText}>{item.title}</Text>
                                    </View>
                                </Pressable>
                            )}
                            numColumns={2}
                            keyExtractor={(item, index) => index}

                        />
                    )}
                    
                    {/* <FlatList scrollEnabled={false}
                        data={searchResults}
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
                                    <Text style={global.subText}>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index}

                    /> */}

                    <View style={{ alignItems: 'center' }}>
                        {isSearchFilterModalVisible ? <SearchFilterModal blurb="Filter Search Results" /> : null}
                    </View>
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
    filterIcon: {
        height: 40,
        width: 40,
        alignItems: 'left'
    },
    sortByContainer: {
        flexDirection: 'row',
        justifyContent: 'flex', //align to right
        alignItems: 'center',
        marginLeft: '2%'
    },

    sortByText: {
        fontSize: '1rem',
        fontFamily: 'Manrope_700Bold'
    },


    dropdown: {
        position: 'absolute',
        top: '120%', // Adjust the distance from the button as needed
        left: '20%',
        backgroundColor: 'white',
        borderWidth: '0.1rem',
        borderColor: 'gray',
        borderRadius: 5,
        width: Dimensions.get('window').width * 0.35, // Adjust the width as needed
        zIndex: 1,
    },
    dropdownOption: {
        padding: '7.5%',
    },

    dropdownOptionText: {
        fontSize: '1rem',
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold'
    }
});