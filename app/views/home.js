import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Banner from '../Components/Banner';

EStyleSheet.build();

export default function Home({ navigation, route }){
    return(
        <View>
            <Banner title="Home" />
            <Text>Welcome {route.params.username}!</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}