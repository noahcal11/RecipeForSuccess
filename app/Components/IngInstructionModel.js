import React, {useState, useContext, useEffect} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import global from '../Genstyle';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { Context } from '../Context';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView


EStyleSheet.build();

const IngInstructionsModel = ({word}) => {
  const [def, setDef] = useState("");
  const {isIngInstructionsModelVisible, setIngInstructionsModelVisible} = useContext(Context);
  const navigation = useNavigation();
  const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN;

  const getInfo = async () => {
    const keyData = await fetch(API_BASE+"/keyword/get", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({key: word})
    }).then(res => res.json())
    setDef(keyData.definition);
  }

  useEffect(() => {
    getInfo();
  }, [])

  return (
    <GestureHandlerRootView>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isIngInstructionsModelVisible}
        onRequestClose={() => {
          setIngInstructionsModelVisible(!isIngInstructionsModelVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={global.titleText}>{word}</Text>

            <ScrollView>
            <View style={styles.instructionsContainer}>
              <Text style={global.bodyText}>{def}</Text>
            </View>
            </ScrollView>

            <Pressable
              style={global.buttonMinor}
              onPress={() => {setIngInstructionsModelVisible(!isIngInstructionsModelVisible); navigation.navigate('Test');}}>
              <Text style={global.buttonMinorText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = EStyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: '5%', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '22.5rem',
    height: '35rem',
  },
  instructionsContainer: {
    //height: '2.1rem', // Set the desired height for the instructions container
    justifyContent: 'center', // Center the content vertically
  }
});

export default IngInstructionsModel