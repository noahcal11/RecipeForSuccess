import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, ScrollView, TextInput, FlatList, SectionList } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';

EStyleSheet.build();

export default function Home({ navigation, route }){
   //From Home page
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);
    const [breakfastRecs, setBreakfastRecs] = useState([]);

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getRecipes = async () => {
        const response = await fetch(API_BASE+"/recipe/get/all")
        .then(res => res.json())
        .then(data => setPopularRecs(data.slice(0,8)))
        .catch(error => console.error(error));
    }
// for search results specificly

//time, cuisine, category
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Sort By');
    const [searchResults, setSearchResults] = useState([
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
      // Add more search results here
    ]);
  
    const sortOptions = ['Ascending', 'Descending', 'Most Poular']; // Your sorting options
  
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
        getRecipes();
    }, []);

    return(
        <View>
            <Banner title="Search Results" username={route.params.username} email={route.params.email} />
            <View>
            <View style={styles.container}>
      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>

      {/* Sort By Dropdown */}
      <View style={styles.sortByContainer}>
        <TouchableOpacity onPress={handleSortToggle} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>{selectedOption}</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            {sortOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSortSelect(option)}
                style={styles.dropdownOption}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Search Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>

                {/* <View style={styles.recipeSection}>
                    <SectionList
                        renderSectionHeader={({ section: { title } }) => <Text style={styles.categoryTitle}>{title}</Text>}
                        sections={[
                            { title: 'Popular Recipes', data: popularRecs, renderItem: ({ item }) => (
                                <View style={styles.imageView}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            )},
                            { title: 'Top Desserts', data: dessertRecs, renderItem: ({ item }) => (
                                <View style={styles.imageView}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                                    <Text>{item.id}</Text>
                                </View>
                            )},
                            { title: 'Breakfast Creations', data: breakfastRecs, renderItem: ({ item }) => (
                                <View style={styles.imageView}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                                    <Text>{item.id}</Text>
                                </View>
                            )},
                        ]}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={() => <Text>View more</Text>}
                    />
                </View> */}
                <View style={styles.recipeSection}>
                    <Text style={styles.categoryTitle}>Popular Recipes</Text>
                    <FlatList nestedScrollEnabled = {true}
                        data={popularRecs}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('RecipePages',{'_id':item._id})}>
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text>View more</Text>
                </View>
                
                
                
            </View>
            <TouchableOpacity
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
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("RecipePages")
                }}
                >
                <Text>Recipe page</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("SearchResults")
                }}
                >
                <Text>Search Results</Text>
            </TouchableOpacity>


            
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
        flex: 1,
        flexDirection: 'column',
        margin: '1rem',
        width: '9rem',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem',
        width: '9rem',
        borderRadius: '4.5rem',
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
        padding: 20,
      },
      filterButton: {
        backgroundColor: '#F74F4F',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
      },
      filterButtonText: {
        color: 'white',
      },
      sortByContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align to the right
        alignItems: 'center',
        marginBottom: 10,
      },
      sortButton: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
      },
      sortButtonText: {
        fontSize: 16,
      },
      dropdown: {
        position: 'absolute',
        top: 40, // Adjust the distance from the button as needed
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: 150, // Adjust the width as needed
      },
      dropdownOption: {
        padding: 10,
      },

      dropdownOptionText: {
        fontSize: 16,

      },
      resultItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },

    
});