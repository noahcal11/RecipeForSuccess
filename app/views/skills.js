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
                            <Text style={styles.skillTitle}>Cooking Rating</Text>
                            <Text style={styles.levelText}>Level: {levelFunc(skills[0])[0]+1}</Text>
                            <ProgressBar bgcolor="#05CACA" completed={levelFunc(skills[0])[1]} />
                            <Text style={styles.levelText}> {`${levelFunc(skills[0])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerGray}>
                            <Text style={styles.skillTitle}>Ingredients Rating</Text>
                            <Text style={styles.levelText}>Level: {levelFunc(skills[1])[0]+1}</Text>
                            <ProgressBar bgcolor="#05CACA" completed={levelFunc(skills[1])[1]} />
                            <Text style={styles.levelText}> {`${levelFunc(skills[1])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerRed}>
                            <Text style={styles.skillTitle}>Knife Rating</Text>
                            <Text style={styles.levelText}>Level: {levelFunc(skills[2])[0]+1}</Text>
                            <ProgressBar bgcolor="#05CACA" completed={levelFunc(skills[2])[1]} />
                            <Text style={styles.levelText}> {`${levelFunc(skills[2])[1]}%`} </Text>
                        </View>

                        <View style={styles.textContainerGray}>
                            <Text style={styles.skillTitle}>Time & Temperature Rating</Text>
                            <Text style={styles.levelText}>Level: {levelFunc(skills[3])[0]+1}</Text>
                            <ProgressBar bgcolor="#05CACA" completed={levelFunc(skills[3])[1]} />
                            <Text style={styles.levelText}> {`${levelFunc(skills[3])[1]}%`} </Text>
                        </View>
                    </View>
                </ScrollView>
            <Footer username={username} email={email} />
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
      },
    textContainerRed: {
        flex: 1,
        backgroundColor: 'salmon',
        justifyContent: 'center',
        //borderRadius: '0%', // You can adjust the border radius as needed
        padding: '1rem', // You can adjust the padding as needed
        width: '100%',
        height: '11.4rem',
      },
      textContainerGray: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'darkgray',
        padding: '1rem', // You can adjust the padding as needed
        width: '100%',
        height: '11.4rem',
      },
      skillTitle: {
        textAlign: 'left',
        fontSize:'1.5rem',
        fontWeight: 'bold',
        marginBottom: '1%',
      },
    levelText: {
        textAlign: 'center',
        fontSize:'1rem',
        fontWeight: 'bold',
    }
  });