import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, Pressable, ScrollView, TextInput, FlatList, SectionList } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';

EStyleSheet.build();

export default function Home({ navigation, route }){
   //From Home page
    const [popularRecs, setPopularRecs] = useState([]);

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN
    const getRecipes = async () => {
        const response = await fetch(API_BASE+"/recipe/get/?general=ham", {method: "POST"})
        .then(res => res.json())
        .then(data => setPopularRecs(data.slice(0,8)))
        .catch(error => console.error(error));
    }
// for search results specificly

//time, cuisine, category
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null); //No initial option selected
    const [searchResults, setSearchResults] = useState([]);
  
    const sortOptions = ['Ascending', 'Descending']; // Your sorting options
  
    const getSearch = async (searchTerm) => {
      const response = await fetch(API_BASE+"/recipe/get/?general="+searchTerm, {method: "POST"})
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
      getRecipes();
      getSearch(route.params.searchTerm);
    }, []);

    return(
        <View>
            <Banner title="Search Results" />
            <View>
            <FlatList scrollEnabled={false}
              data={searchResults}
              renderItem={({ item }) => (
                  <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id})}
                      style={({ pressed }) => [
                          {
                          opacity: pressed
                              ? 0.2
                              : 1,
                          }]}
                  >
                      <View id={item._id}>
                          <Image source={{ uri: item.image }} /> 
                          <Text>{item.title}</Text>
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
                      <Text>View more</Text>
                  </Pressable>
              }
          />
      {/* Filter Button */}
      <Pressable style={styles.filterButton}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </Pressable>

      {/* Sort By Dropdown */}
      
      <View style={styles.sortByContainer}>
        <Pressable onPress={handleSortToggle} style={styles.sortButton}>
          <Text style={styles.sortByText}>
            Sort By: {selectedOption}
          </Text>

        </Pressable>

        {showDropdown && (
          <View style={[styles.dropdown, {zIndex: 1}]}>
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

                
                <View style={styles.recipeSection}>
                    <Text style={styles.categoryTitle}>Suggested Recipes...</Text>
                    <FlatList nestedScrollEnabled = {true}
                        data={popularRecs}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('RecipePages',{'_id':item._id})}>
                                <View style={styles.imageView} id={item._id}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                                    <Text>{item.title}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text>View more</Text>
                </View>
                
                
                
            </View>
            <Pressable
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    navigation.navigate("Skills")
                }}
                >
                <Text>Skills page</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    navigation.navigate("RecipePages")
                }}
                >
                <Text>Recipe page</Text>
            </Pressable>

            <Pressable
                onPress={() => {
                    navigation.navigate("SearchResults")
                }}
                >
                <Text>Search Results</Text>
            </Pressable>
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
        padding: 30,
        paddingBottom: 20,
        overflow: 'visible',
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
        justifyContent: 'flex-end', //align to right
        alignItems: 'center',
        marginBottom: 100,

      },

      sortByText: {
        fontSize: 16,
        fontWeight: 'bold', // Make the text bold
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
        zIndex: 1,
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