// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl

import { Text, Image, View, Pressable, TextInput, ScrollView } from 'react-native';

const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
  
    const containerStyles = {
      borderRadius: 25,
      borderWidth: 3,
      borderColor: 'black',
      height: 30,
      width: '85%',
      backgroundColor: "#F6F6F6",
      marginHorizontal: 25,
      marginVertical: 15
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      textAlign: 'right',
      borderRadius: 25,
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