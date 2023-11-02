// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import { Text, Image, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      height: 30,
      width: '80%',
      backgroundColor: "#e0e0de",
      margin: 25,
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      textAlign: 'right'
    }
  
    return (
      <View style={containerStyles}>
        <View style={fillerStyles}>
          {/* <Text style={labelStyles}>{`${completed}%`}</Text> */}
        </View>
      </View>
    );
  };
  
  export default ProgressBar;