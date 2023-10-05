import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';

EStyleSheet.build();

export default function Skills({ navigation, route }){
    return(
        <View style={styles.container}>
            <SearchBar />
            <Banner title="Skills" />
                <ScrollView>
                    <View style={styles.textBox}>
                            {/* <Text>Welcome {route.params.username}!</Text> */}
                        <Text>Hey USERNAME check out your skill levels here!</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        {/* https://github.com/FaiChou/react-native-star-view */}

                        <View style={styles.skillContainer}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                        </View>

                        <View style={styles.skillContainer}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                        </View>

                        <View style={styles.skillContainer}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                        </View>

                        <View style={styles.skillContainer}>
                            <Text style={styles.textBox}>Time & Temperature Rating</Text>
                        </View>
                    </View>
                </ScrollView>
            <Footer />
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex:1,
      },
    skillContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        borderRadius: '2rem', // You can adjust the border radius as needed
        padding: '1rem', // You can adjust the padding as needed
        marginVertical: '1rem', // You can adjust the margin as needed
        width: '15rem',
      },
    textBox: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize:'1rem',
        fontWeight: 'bold',
    },
  });