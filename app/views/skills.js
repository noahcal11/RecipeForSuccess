import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

export default function Skills({ navigation, route }){
    return(
        <View>
            <Banner title="Skills" />

            <View style={styles.welcome}>
                {/* <Text>Welcome {route.params.username}!</Text> */}
                <Text>Hey USERNAME check out your skill levels here!</Text>
            </View>

            

        </View>
    );
}

const styles = EStyleSheet.create({
    welcome: {
      alignItems: 'center',
      flexDirection: 'row',
      fontsize:'1rem',
    },
    // menuIcon: {
    //   paddingLeft: 10,
    // },
    // menuText: {
    //   fontSize: 30,
    //   color: 'black',
    // },
  });