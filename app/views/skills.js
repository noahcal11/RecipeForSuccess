import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar'

EStyleSheet.build();

const cookingSkills = [
    { bgcolor: "#6a1b9a", completed: 10 },
  ];

const IngredientsSkills = [
    { bgcolor: "#6a1b9a", completed: 10 },
];

const KnifeSkills = [
    { bgcolor: "#6a1b9a", completed: 10 },
];

const TTSkills = [
    { bgcolor: "#6a1b9a", completed: 10 },
];

export default function Skills({ navigation, route }){
    return(
        <View style={styles.container}>
            <SearchBar />
            <Banner title="Skills" />
                <ScrollView>
                    <View>
                            {/* <Text>Welcome {route.params.username}!</Text> */}
                        <Text style={styles.welcomeText}>Hey USERNAME check out your skill levels here!</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                            {cookingSkills.map((item, idx) => (
                                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                            ))}
                            <Text style={styles.completedText}> {`${cookingSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                            {cookingSkills.map((item, idx) => (
                                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                            ))}
                            <Text style={styles.completedText}> {`${IngredientsSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                            {cookingSkills.map((item, idx) => (
                                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                            ))}
                            <Text style={styles.completedText}> {`${KnifeSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Time & Temperature Rating</Text>
                            {cookingSkills.map((item, idx) => (
                                <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
                            ))}
                            <Text style={styles.completedText}> {`${TTSkills[0].completed}%`} </Text>
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
        marginBottom: '1rem',
    },
    completedText: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginTop: '-1rem', 
      },
    welcomeText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
    }, 
  });