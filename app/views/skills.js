import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar';
import { useState } from 'react';

EStyleSheet.build();

export default function Skills({ navigation, route }){
    const [skills, setSkills] = useState([0,0,0,0]);
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getPopular = async () => {
        const response = await fetch(API_BASE+"/user/get/"+route.params.email)
        .then(res => res.json())
        .then(data => setSkills(data[0].skill_levels))
        .catch(error => console.error(error));
    }

    useState(() => {
        if (route.params.email !== "Guest") {
            getPopular();
        }
    }, []);

    function levelFunc(n) {
        if (n === 0) {
            return [-1,0]
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
                        <Text style={styles.welcomeText}>Hey {route.params.username}, check out your skill levels here!</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[0])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[0])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[0])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[1])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[1])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[1])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[2])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[2])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[2])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.textBox}>Time & Temperature Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[3])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[3])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[3])[1]}%`} </Text>
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