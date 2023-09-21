import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';

export default function Home({ navigation }) {
    return(
        <div>
            <Text>This is a Home Page</Text>
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