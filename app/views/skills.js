import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar'

EStyleSheet.build();

function levelFunc(n) {
    let logBase2 = Math.floor(Math.log2(n));
    let progress = Math.round((n - Math.pow(2, logBase2))/Math.pow(2, logBase2)*100);
    return [logBase2, progress];
}

const testData = [
    { bgcolor: "#6a1b9a", completed: 65 },
    { bgcolor: "#00695c", completed: 30 },
    { bgcolor: "#ef6c00", completed: 53 },
  ];

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

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                        </View>
                        
                        <View>
                            {testData.map((item, idx) => (
                                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={levelFunc(item.completed)[1]} />
                            ))}
                            <Text style={styles.textBox}> {`${cookingSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                        </View>

                        <View style={styles.textContainer}>
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
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        borderRadius: '2rem', // You can adjust the border radius as needed
        padding: '0.5rem', // You can adjust the padding as needed
        marginTop: '1rem', // You can adjust the margin as needed
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