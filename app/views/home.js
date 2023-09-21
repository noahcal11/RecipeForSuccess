import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';

export default function Home({ navigation,route }) {
    return(
        <View>
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