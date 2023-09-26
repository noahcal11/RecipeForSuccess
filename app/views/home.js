import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import Banner from '../Components/Banner';

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

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Skills")
                }}
                >
                <Text>Skills page</Text>
            </TouchableOpacity>
        </View>
    );
}