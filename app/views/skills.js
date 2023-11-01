import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SearchBar } from 'react-native-screens';
import Footer from '../Components/Footer';
import ProgressBar from '../Components/ProgressBar';
import { useState,useContext } from 'react';
import { Context } from '../App'

EStyleSheet.build();

export default function Skills({ navigation, route }){
    const [skills, setSkills] = useState([0,0,0,0]);
    const {username,setUsername,email,setEmail} = useContext(Context)
    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getPopular = async () => {
        const response = await fetch(API_BASE+"/user/get/"+email)
        .then(res => res.json())
        .then(data => setSkills(data[0].skill_levels))
        .catch(error => console.error(error));
    }

    useState(() => {
        if (email !== "Guest") {
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
            <Banner title="Skills" username={username} email={email}/>
                <ScrollView>
                    
                    <View>

                        <View style={styles.textContainerRed}>
                            <Text style={styles.textBox}>Cooking Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[0])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[0])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[0])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerGray}>
                            <Text style={styles.textBox}>Ingredients Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[1])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[1])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[1])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerRed}>
                            <Text style={styles.textBox}>Knife Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[2])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[2])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[2])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerGray}>
                            <Text style={styles.textBox}>Time & Temperature Rating</Text>
                            <Text style={styles.textBox2}>Level: {levelFunc(skills[3])[0]+1}</Text>
                            <ProgressBar bgcolor="#6a1b9a" completed={levelFunc(skills[3])[1]} />
                            <Text style={styles.completedText}> {`${levelFunc(skills[3])[1]}%`} </Text>
                        </View>
                    </View>
                </ScrollView>
            <Footer username={username} email={email} />
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex:1,
      },
    textContainerRed: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        borderRadius: '0%', // You can adjust the border radius as needed
        padding: '0.5rem', // You can adjust the padding as needed
        marginTop: '1rem', // You can adjust the margin as needed
        width: '100%',
      },
      textContainerGray: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: '0%', // You can adjust the border radius as needed
        padding: '0.5rem', // You can adjust the padding as needed
        marginTop: '1rem', // You can adjust the margin as needed
        width: '100%',
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
      }
  });