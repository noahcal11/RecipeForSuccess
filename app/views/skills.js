import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar';

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

const testData = [640,5,31,2]

export default function Skills({ navigation, route }){
    
    function levelFunc(n) {
        if (n === 0) {
            return [0,0]
        }
        let level = Math.floor(Math.log2(n));
        let progress = Math.round((n - Math.pow(2, level))/Math.pow(2, level)*100);
        return [level, progress];
    }

    return(
        <View style={styles.container}>
            <SearchBar />
            <Banner title="Skills" />
                <ScrollView>
                    <View>
                            {/* <Text>Welcome {route.params.username}!</Text> */}
                        <Text style={styles.welcomeText}>Hey {route.params.username} check out your skill levels here!</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(testData[0])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(testData[0])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(testData[0])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                            <Text style={styles.textBox2}>Level: #</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={testData[1]} />
                            <Text style={styles.completedText}> {`${IngredientsSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                            <Text style={styles.textBox2}>Level: #</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={testData[2]} />
                            <Text style={styles.completedText}> {`${KnifeSkills[0].completed}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Time & Temperature Rating</Text>
                            <Text style={styles.textBox2}>Level: #</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={testData[3]} />
                            <Text style={styles.completedText}> {`${TTSkills[0].completed}%`} </Text>
                        </View>
                    </View>
                </ScrollView>
            <Footer username={route.params.username} email={route.params.email} />
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
    textBox2: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize:'1rem',
        fontWeight: 'bold',
        marginBottom: '0rem',
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