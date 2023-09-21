import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavigationBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';
import Banner from '../Components/Banner';

EStyleSheet.build();

export default function Home(){
    return(
        <View>
            <Banner title="Home" />
        </View>
    );
}