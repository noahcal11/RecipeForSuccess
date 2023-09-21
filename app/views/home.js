import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';

export default function Home({ navigation,route }) {
    return(
        <div>
            <Text>Welcome {route.params.name}!</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </TouchableOpacity>
        </div>
    )
}