import { Text, Image, View, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState } from "react";
import Toggle from "react-native-toggle-element";

const [toggleValue, setToggleValue] = useState(false);

const ToggleComponent = ({toggleValue}) => {
    return (
        <ToggleButton
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
            
            trackBar={{
                activeBackgroundColor: "#9ee3fb",
                inActiveBackgroundColor: "#3c4145",
                borderActiveColor: "#86c3d7",
                borderInActiveColor: "#1c1c1c",
                borderWidth: 5,
                width: 100,
        }} />
    )
}


export default ToggleComponent;