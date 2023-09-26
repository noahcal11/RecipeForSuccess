import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

export default function Skills({ navigation, route }){
    return(
        <View>
            <Banner title="Skills" />


            <View style={styles.centeredContainer}>
                <View style={styles.textBox}>
                    {/* <Text>Welcome {route.params.username}!</Text> */}
                    <Text>Hey USERNAME check out your skill levels here!</Text>
                </View>

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
        </View>
    );
}

const styles = EStyleSheet.create({
    centeredContainer: {
        flex: 1,
        alignItems: 'center', // Center items horizontally
        justifyContent: 'center', // Center items vertically
      },
    skillContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
        borderRadius: 20, // You can adjust the border radius as needed
        padding: 10, // You can adjust the padding as needed
        marginVertical: 5, // You can adjust the margin as needed
        width: '75%',
      },
    textBox: {
        textAlign: 'center',
        flexDirection: 'row',
        fontsize:'1rem',
        fontWeight: 'bold',
    },
  });